// Botones flotantes del sitio (WhatsApp y urgencias). Los enciende y apaga el administrador desde /botones,
// sin tocar el código ni volver a desplegar. Se guarda en Upstash Redis; sin Redis, o mientras no se haya
// guardado nada, valen los valores iniciales de más abajo. El sitio lo vuelve a leer cada 60 segundos.

import { fechaChile } from "@/lib/uso-api";

/** activo: botón rojo de urgencias · pausa: aviso amarillo (no se atienden urgencias) · apagado: nada. */
export type ModoUrgencias = "activo" | "pausa" | "apagado";

export type Botones = {
  whatsapp: boolean;
  urgencias: ModoUrgencias;
  /** Último día sin urgencias (AAAA-MM-DD). Al día siguiente, el sitio vuelve solo al botón de urgencias. */
  hasta: string;
  /** Abrir el aviso amarillo una vez por visita. */
  abrirSolo: boolean;
  actualizado?: string;
};

export const botonesIniciales: Botones = {
  whatsapp: true,
  urgencias: "pausa",
  hasta: "2027-01-15",
  abrirSolo: true,
};

const URL_BASE = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
export const CLAVE_BOTONES = "botones";

export const esFecha = (v: unknown): v is string =>
  typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`));

/** Valida un objeto cualquiera y lo deja como Botones (lo que falte toma el valor inicial). */
export function limpiarBotones(o: Partial<Botones> | null | undefined): Botones {
  const modo = o?.urgencias;
  return {
    whatsapp: typeof o?.whatsapp === "boolean" ? o.whatsapp : botonesIniciales.whatsapp,
    urgencias: modo === "activo" || modo === "pausa" || modo === "apagado" ? modo : botonesIniciales.urgencias,
    hasta: esFecha(o?.hasta) ? o.hasta : botonesIniciales.hasta,
    abrirSolo: typeof o?.abrirSolo === "boolean" ? o.abrirSolo : botonesIniciales.abrirSolo,
    actualizado: typeof o?.actualizado === "string" ? o.actualizado : undefined,
  };
}

/** Lee la configuración. `fresco` salta la memoria del sitio (lo usa el editor). */
export async function leerBotones(fresco = false): Promise<Botones> {
  if (!URL_BASE || !TOKEN) return botonesIniciales;
  try {
    const r = await fetch(`${URL_BASE}/get/${CLAVE_BOTONES}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      ...(fresco ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return botonesIniciales;
    const { result } = (await r.json()) as { result: string | null };
    if (!result) return botonesIniciales;
    return limpiarBotones(JSON.parse(result) as Partial<Botones>);
  } catch {
    return botonesIniciales;
  }
}

/** Modo de urgencias que rige hoy: una pausa vencida (después de `hasta`) equivale a "activo". */
export function modoUrgencias(b: Botones, hoy: string = fechaChile(new Date())): ModoUrgencias {
  if (b.urgencias === "pausa" && hoy > b.hasta) return "activo";
  return b.urgencias;
}

const LOCALES = { es: "es-CL", en: "en-GB", ger: "de-DE" } as const;

/** "15 de enero de 2027" / "15 January 2027" / "15. Januar 2027". */
export function fechaLarga(fecha: string, lang: "es" | "en" | "ger"): string {
  return new Intl.DateTimeFormat(LOCALES[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${fecha}T12:00:00Z`)
  );
}
