// Traducción al español de los textos que escriben los clientes en inglés o alemán.
// Usa Google Cloud Translation (versión básica). Solo se ejecuta en el servidor: la clave nunca llega al navegador.
//
// Variable de entorno (en .env.local y en Vercel → Settings → Environment Variables):
//   GOOGLE_TRANSLATE_API_KEY  clave de API restringida a "Cloud Translation API"
// Si falta la clave o Google no responde, devuelve null y el mensaje se envía solo con el texto original.
// Esta misma función se usará cuando los formularios también se envíen por correo.

import { limiteTraduccionMensual, registrarUso, unidadesDelMes } from "./uso-api";

export type IdiomaOrigen = "en" | "de";

const ENTIDADES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function decodificar(texto: string): string {
  return texto.replace(/&(amp|lt|gt|quot|#39);/g, (m) => ENTIDADES[m] ?? m);
}

/** Traduce un texto entre dos idiomas (códigos de Google: "es", "en", "de"). Null si no se pudo. */
export async function traducirTexto(texto: string, origen: string, destino: string): Promise<string | null> {
  const clave = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!clave) {
    console.warn("[traducción] Desactivada: falta GOOGLE_TRANSLATE_API_KEY.");
    return null;
  }
  if (!texto.trim()) return null;

  // Tope mensual: si ya se tradujo demasiado, se corta antes de que Google empiece a cobrar.
  const limite = limiteTraduccionMensual();
  const usados = await unidadesDelMes("google_translate");
  if (usados !== null && usados + texto.length > limite) {
    console.warn(`[traducción] Tope mensual alcanzado (${usados}/${limite} caracteres). No se traduce.`);
    await registrarUso({ servicio: "google_translate", ok: false, estado: "tope_mensual", ms: 0, detalle: `${usados}/${limite}` });
    return null;
  }

  const inicio = Date.now();
  try {
    const respuesta = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(clave)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: [texto], source: origen, target: destino, format: "text" }),
        cache: "no-store",
      }
    );
    if (!respuesta.ok) {
      const detalle = (await respuesta.text()).slice(0, 300);
      console.error(`[traducción] Google respondió ${respuesta.status}: ${detalle}`);
      await registrarUso({ servicio: "google_translate", ok: false, estado: respuesta.status, ms: Date.now() - inicio, detalle });
      return null;
    }
    const datos = (await respuesta.json()) as {
      data?: { translations?: { translatedText?: string }[] };
    };
    const traducido = datos.data?.translations?.[0]?.translatedText;
    await registrarUso({
      servicio: "google_translate",
      ok: Boolean(traducido),
      estado: respuesta.status,
      ms: Date.now() - inicio,
      unidades: texto.length,
      detalle: traducido ? undefined : "respuesta sin traducción",
    });
    return traducido ? decodificar(traducido) : null;
  } catch (error) {
    console.error("[traducción] No se pudo consultar a Google:", error);
    await registrarUso({ servicio: "google_translate", ok: false, estado: "red", ms: Date.now() - inicio, detalle: "sin respuesta de Google" });
    return null;
  }
}

/** Traduce al español lo que escribe un cliente en inglés o alemán. */
export const traducirAEspanol = (texto: string, origen: IdiomaOrigen) => traducirTexto(texto, origen, "es");
