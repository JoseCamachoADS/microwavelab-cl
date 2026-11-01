// Reseñas de Google mediante Places API (New).
// Se ejecuta SOLO en el servidor: la clave de API nunca llega al navegador.
//
// Variables de entorno (en .env.local y en Vercel → Settings → Environment Variables):
//   GOOGLE_PLACES_API_KEY  clave de API restringida a "Places API (New)"
//   GOOGLE_PLACE_ID        Place ID de la ficha (empieza con "ChIJ")

export type Resena = {
  autor: string;
  autorUrl?: string;
  fotoUrl?: string;
  puntaje: number;
  texto: string;
  cuando: string;
};

export type DatosResenas = {
  puntaje: number;
  total: number;
  resenas: Resena[];
  /** Enlace para que el cliente deje su propia reseña. */
  urlEscribirResena: string;
};

// Forma (parcial) de la respuesta de Places API (New).
type RespuestaPlaces = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

/** Una vez al día es suficiente y mantiene el consumo de la API mínimo. */
const SEGUNDOS_CACHE = 60 * 60 * 24;

export async function obtenerResenas(
  idioma: "es" | "en" | "de" = "es"
): Promise<DatosResenas | null> {
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!clave || !placeId) {
    console.warn(
      "[reseñas] Desactivadas: faltan GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID. " +
        "Revise .env.local (y reinicie npm run dev) o las variables de Vercel (y vuelva a desplegar)."
    );
    return null;
  }

  try {
    const respuesta = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${idioma}`,
      {
        headers: {
          "X-Goog-Api-Key": clave,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: SEGUNDOS_CACHE },
      }
    );
    if (!respuesta.ok) {
      // El cuerpo del error de Google explica la causa (API no activada,
      // clave restringida, facturación desactivada, Place ID inválido...).
      // Nunca incluye la clave; es seguro mostrarlo en los registros.
      const detalle = (await respuesta.text()).slice(0, 500);
      console.error(`[reseñas] Google respondió ${respuesta.status}: ${detalle}`);
      return null;
    }

    const datos = (await respuesta.json()) as RespuestaPlaces;
    if (typeof datos.rating !== "number") {
      console.warn("[reseñas] Google respondió sin calificación para este Place ID.");
      return null;
    }

    const resenas: Resena[] = (datos.reviews ?? [])
      .map((r) => ({
        autor: r.authorAttribution?.displayName ?? "",
        autorUrl: r.authorAttribution?.uri,
        fotoUrl: r.authorAttribution?.photoUri,
        puntaje: r.rating ?? 0,
        // Se muestra el texto original de la reseña, sin traducir ni editar.
        texto: r.originalText?.text ?? r.text?.text ?? "",
        cuando: r.relativePublishTimeDescription ?? "",
      }))
      // Solo reseñas con comentario; las que solo traen estrellas no aportan texto.
      .filter((r) => r.texto.trim().length > 0);

    return {
      puntaje: datos.rating,
      total: datos.userRatingCount ?? 0,
      resenas,
      urlEscribirResena: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
    };
  } catch (error) {
    // Si Google no responde, el sitio sigue funcionando con el enlace simple.
    console.error("[reseñas] No se pudo consultar a Google:", error);
    return null;
  }
}
