// Acceso mínimo a Upstash Redis por su API REST (el mismo Redis del contador de visitas).
// Variables: KV_REST_API_URL y KV_REST_API_TOKEN (o UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN).
// Sin ellas, todo devuelve null y el sitio sigue funcionando.

const URL_BASE = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisDisponible = Boolean(URL_BASE && TOKEN);

export type ComandoRedis = (string | number)[];

/** Ejecuta varios comandos en una sola llamada. Devuelve un resultado por comando, o null si Redis no responde. */
export async function redisLote(comandos: ComandoRedis[], esperaMs = 2500): Promise<unknown[] | null> {
  if (!URL_BASE || !TOKEN || comandos.length === 0) return null;
  try {
    const r = await fetch(`${URL_BASE}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(comandos),
      cache: "no-store",
      signal: AbortSignal.timeout(esperaMs),
    });
    if (!r.ok) return null;
    const filas = (await r.json()) as { result?: unknown; error?: string }[];
    return filas.map((f) => (f.error ? null : (f.result ?? null)));
  } catch {
    return null;
  }
}
