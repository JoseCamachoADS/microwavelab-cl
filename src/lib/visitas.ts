// Contador de visitas. Guarda un único número en Upstash Redis (plan gratuito, vía Vercel).
// Variables de entorno (Vercel las crea sola al conectar Upstash desde Storage / Marketplace):
//   KV_REST_API_URL y KV_REST_API_TOKEN   (o UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN)
// Sin ellas, el contador no se muestra. No se guarda ningún dato personal, solo el total.

const URL_BASE = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const CLAVE = "visitas-total";

async function comando(accion: "get" | "incr"): Promise<number | null> {
  if (!URL_BASE || !TOKEN) return null;
  try {
    const r = await fetch(`${URL_BASE}/${accion}/${CLAVE}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: "no-store",
    });
    if (!r.ok) return null;
    const { result } = (await r.json()) as { result: string | number | null };
    return Number(result ?? 0);
  } catch {
    return null;
  }
}

export const leerVisitas = () => comando("get");
export const sumarVisita = () => comando("incr");
