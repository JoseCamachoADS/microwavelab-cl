import { esDispositivo, esOrigen, registrarClic } from "@/lib/clics";

export const dynamic = "force-dynamic";

const MAX_CLICS = 40; // por IP, por ventana: evita inflar el contador
const VENTANA_MS = 10 * 60 * 1000;
const registro = new Map<string, { n: number; desde: number }>();
const FIN = { status: 204, headers: { "Cache-Control": "no-store" } };

/**
 * Suma un clic en un botón de WhatsApp. Recibe { origen, dispositivo } y solo guarda números (ver src/lib/clics.ts).
 * Responde siempre 204 para no dar pistas; ignora robots, otros sitios y exceso de llamadas.
 */
export async function POST(req: Request) {
  const origen = req.headers.get("origin");
  const host = req.headers.get("host");
  try {
    if (!origen || !host || new URL(origen).host !== host) return new Response(null, FIN);
  } catch {
    return new Response(null, FIN);
  }
  if (/bot|crawl|spider|headless|lighthouse|preview/i.test(req.headers.get("user-agent") ?? "")) {
    return new Response(null, FIN);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
  const ahora = Date.now();
  const previo = registro.get(ip);
  if (!previo || ahora - previo.desde > VENTANA_MS) registro.set(ip, { n: 1, desde: ahora });
  else if (previo.n >= MAX_CLICS) return new Response(null, FIN);
  else previo.n += 1;
  if (registro.size > 2000) registro.clear();

  let cuerpo: { origen?: unknown; dispositivo?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return new Response(null, FIN);
  }
  if (esDispositivo(cuerpo.dispositivo)) {
    await registrarClic(esOrigen(cuerpo.origen) ? cuerpo.origen : "otro", cuerpo.dispositivo);
  }
  return new Response(null, FIN);
}
