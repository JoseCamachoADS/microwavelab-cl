import { NextResponse } from "next/server";
import { traducirAEspanol } from "@/lib/traducir";
import { verificarTurnstile } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

const MAX_CARACTERES = 1000;
const MAX_SOLICITUDES = 8; // por dirección IP, por ventana
const VENTANA_MS = 10 * 60 * 1000;
const registro = new Map<string, { n: number; desde: number }>();
const SIN_CACHE = { "Cache-Control": "no-store" };

/**
 * Paso previo a abrir WhatsApp desde el formulario.
 *   Recibe { token, idioma: "es" | "en" | "ger", texto }.
 *   1. Comprueba el captcha (Cloudflare Turnstile). Si falla: 403 y no se hace nada más.
 *   2. Si el idioma es inglés o alemán, traduce el texto al español.
 * Solo acepta llamadas desde este sitio. Más adelante, el envío por correo se hará aquí mismo.
 */
export async function POST(req: Request) {
  // Solo desde nuestro propio sitio (evita que otros usen la traducción a nuestro costo).
  const origen = req.headers.get("origin");
  const host = req.headers.get("host");
  try {
    if (!origen || !host || new URL(origen).host !== host) {
      return NextResponse.json({ ok: false, traduccion: null }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ ok: false, traduccion: null }, { status: 403 });
  }

  // Límite simple por IP (mejor esfuerzo; en servidores sin estado se reinicia de vez en cuando).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
  const ahora = Date.now();
  const previo = registro.get(ip);
  if (!previo || ahora - previo.desde > VENTANA_MS) {
    registro.set(ip, { n: 1, desde: ahora });
  } else if (previo.n >= MAX_SOLICITUDES) {
    return NextResponse.json({ ok: false, traduccion: null }, { status: 429 });
  } else {
    previo.n += 1;
  }
  if (registro.size > 2000) registro.clear();

  let cuerpo: { token?: unknown; texto?: unknown; idioma?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ ok: false, traduccion: null }, { status: 400 });
  }
  const idioma = cuerpo.idioma;
  if (idioma !== "es" && idioma !== "en" && idioma !== "ger") {
    return NextResponse.json({ ok: false, traduccion: null }, { status: 400 });
  }

  // 1. Captcha: sin esto no se traduce nada (la traducción tiene costo).
  if (!(await verificarTurnstile(cuerpo.token, ip))) {
    return NextResponse.json({ ok: false, motivo: "captcha", traduccion: null }, { status: 403, headers: SIN_CACHE });
  }

  // 2. Traducción (solo inglés y alemán).
  if (idioma === "es") return NextResponse.json({ ok: true, traduccion: null }, { headers: SIN_CACHE });
  const texto = typeof cuerpo.texto === "string" ? cuerpo.texto.trim().slice(0, MAX_CARACTERES) : "";
  if (!texto) return NextResponse.json({ ok: false, traduccion: null }, { status: 400 });

  const traduccion = await traducirAEspanol(texto, idioma === "ger" ? "de" : "en");
  return NextResponse.json({ ok: true, traduccion }, { headers: SIN_CACHE });
}
