// Aviso de la pizarra electrónica (franja con texto que se desplaza, arriba de todo el sitio).
// Lo escribe y lo enciende o apaga el administrador desde /aviso, sin tocar el código ni volver a desplegar.
// Se guarda en Upstash Redis (el mismo del contador de visitas). Sin Redis, o mientras no se haya guardado
// nada, se muestra el mensaje inicial de más abajo.
// El sitio lo vuelve a leer cada 60 segundos, y al guardar desde /aviso se actualiza de inmediato.

import type { Idioma } from "@/i18n/config";

export type Aviso = {
  activo: boolean;
  es: string;
  en: string;
  ger: string;
  actualizado?: string;
};

export const MAX_AVISO = 240;

export const avisoInicial: Aviso = {
  activo: true,
  es: "Durante el mes de diciembre estaré atendiendo en Buenos Aires, Argentina. Favor contactarse para agendar y reservar su cupo de atención o servicio.",
  en: "During December I will be working in Buenos Aires, Argentina. Please get in touch to schedule and reserve your service slot.",
  ger: "Im Dezember arbeite ich in Buenos Aires, Argentinien. Bitte nehmen Sie Kontakt auf, um Ihren Termin für den Service zu vereinbaren und zu reservieren.",
};

const URL_BASE = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
export const CLAVE_AVISO = "aviso";

/** Limpia un texto del aviso: sin saltos de línea ni caracteres de control, con largo máximo. */
export function limpiarAviso(valor: unknown): string {
  if (typeof valor !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return valor.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, MAX_AVISO);
}

function desdeJson(texto: string | null | undefined): Aviso | null {
  if (!texto) return null;
  try {
    const o = JSON.parse(texto) as Partial<Aviso>;
    return {
      activo: o.activo === true,
      es: limpiarAviso(o.es),
      en: limpiarAviso(o.en),
      ger: limpiarAviso(o.ger),
      actualizado: typeof o.actualizado === "string" ? o.actualizado : undefined,
    };
  } catch {
    return null;
  }
}

/** Lee el aviso. `fresco` salta la memoria del sitio (lo usa el editor). */
export async function leerAviso(fresco = false): Promise<Aviso> {
  if (!URL_BASE || !TOKEN) return avisoInicial;
  try {
    const r = await fetch(`${URL_BASE}/get/${CLAVE_AVISO}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      ...(fresco ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return avisoInicial;
    const { result } = (await r.json()) as { result: string | null };
    // Si nunca se guardó nada (result null), vale el mensaje inicial.
    return desdeJson(result) ?? avisoInicial;
  } catch {
    return avisoInicial;
  }
}

/** Texto del aviso en el idioma de la página (si falta la traducción, el español). Null si está apagado. */
export function textoAviso(a: Aviso, lang: Idioma): string | null {
  if (!a.activo) return null;
  const t = lang === "en" ? a.en : lang === "ger" ? a.ger : a.es;
  return t || a.es || null;
}
