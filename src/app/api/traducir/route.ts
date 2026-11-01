import { NextResponse } from "next/server";
import { traducirAEspanol } from "@/lib/traducir";

export const dynamic = "force-dynamic";

const MAX_CARACTERES = 1000;
const MAX_SOLICITUDES = 8; // por dirección IP, por ventana
const VENTANA_MS = 10 * 60 * 1000;
const registro = new Map<string, { n: number; desde: number }>();

/** Traduce al español el texto de la falla escrito en inglés o alemán. Solo acepta llamadas desde este sitio. */
export async function POST(req: Request) {
  // Solo desde nuestro propio sitio (evita que otros usen la traducción a nuestro costo).
  const origen = req.headers.get("origin");
  const host = req.headers.get("host");
  try {
    if (!origen || !host || new URL(origen).host !== host) {
      return NextResponse.json({ traduccion: null }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ traduccion: null }, { status: 403 });
  }

  // Límite simple por IP (mejor esfuerzo; en servidores sin estado se reinicia de vez en cuando).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
  const ahora = Date.now();
  const previo = registro.get(ip);
  if (!previo || ahora - previo.desde > VENTANA_MS) {
    registro.set(ip, { n: 1, desde: ahora });
  } else if (previo.n >= MAX_SOLICITUDES) {
    return NextResponse.json({ traduccion: null }, { status: 429 });
  } else {
    previo.n += 1;
  }
  if (registro.size > 2000) registro.clear();

  let cuerpo: { texto?: unknown; idioma?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ traduccion: null }, { status: 400 });
  }
  const texto = typeof cuerpo.texto === "string" ? cuerpo.texto.trim().slice(0, MAX_CARACTERES) : "";
  const origenIdioma = cuerpo.idioma === "en" ? "en" : cuerpo.idioma === "ger" ? "de" : null;
  if (!texto || !origenIdioma) return NextResponse.json({ traduccion: null }, { status: 400 });

  const traduccion = await traducirAEspanol(texto, origenIdioma);
  return NextResponse.json({ traduccion }, { headers: { "Cache-Control": "no-store" } });
}
