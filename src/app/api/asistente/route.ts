import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { revisarAdmin } from "@/lib/admin";
import {
  CLAVE_ASISTENTE,
  MAX_INSTRUCCIONES,
  MAX_SALUDO,
  construirInstrucciones,
  contarMensajeHoy,
  crearSesion,
  hayGemini,
  leerAsistente,
  limpiarTexto,
  limpiarTope,
  mensajesHoy,
  sesionValida,
  type ConfigAsistente,
} from "@/lib/asistente";
import { consultarGemini, diagnosticarGemini, type MensajeChat } from "@/lib/gemini";
import { redisLote } from "@/lib/redis";
import { traducirTexto } from "@/lib/traducir";
import { verificarTurnstile } from "@/lib/turnstile";

import { fechaLarga, leerBotones, modoUrgencias } from "@/lib/botones";

/** Fecha en palabras si las urgencias están en pausa hoy; si no, undefined. */
async function pausaVigente(idioma: "es" | "en" | "ger"): Promise<string | undefined> {
  const b = await leerBotones();
  return modoUrgencias(b) === "pausa" ? fechaLarga(b.hasta, idioma) : undefined;
}

export const dynamic = "force-dynamic";

const SIN_CACHE = { "Cache-Control": "no-store" };
const ADMIN = { ...SIN_CACHE, "X-Robots-Tag": "noindex" };
const MAX_MENSAJES = 10; // los últimos de la conversación
const MAX_TEXTO = 600;
const MAX_SOLICITUDES = 20; // por IP, por ventana
const VENTANA_MS = 10 * 60 * 1000;
const registro = new Map<string, { n: number; desde: number }>();

const falla = (motivo: string, status: number, sesion?: string) =>
  NextResponse.json({ ok: false, motivo, ...(sesion ? { sesion } : {}) }, { status, headers: SIN_CACHE });

/**
 * Chat del asistente. Recibe { mensajes, idioma, token?, sesion? }.
 * Orden de las comprobaciones: origen → límite por IP → asistente encendido → captcha (una vez por conversación,
 * luego una sesión firmada de 30 min) → tope diario → Gemini.
 */
export async function POST(req: Request) {
  const origen = req.headers.get("origin");
  const host = req.headers.get("host");
  try {
    if (!origen || !host || new URL(origen).host !== host) return falla("origen", 403);
  } catch {
    return falla("origen", 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
  const ahora = Date.now();
  const previo = registro.get(ip);
  if (!previo || ahora - previo.desde > VENTANA_MS) registro.set(ip, { n: 1, desde: ahora });
  else if (previo.n >= MAX_SOLICITUDES) return falla("limite", 429);
  else previo.n += 1;
  if (registro.size > 2000) registro.clear();

  let cuerpo: { mensajes?: unknown; idioma?: unknown; token?: unknown; sesion?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return falla("invalido", 400);
  }
  const idioma = cuerpo.idioma;
  if (idioma !== "es" && idioma !== "en" && idioma !== "ger") return falla("invalido", 400);
  if (!Array.isArray(cuerpo.mensajes)) return falla("invalido", 400);
  const mensajes: MensajeChat[] = cuerpo.mensajes
    .slice(-MAX_MENSAJES)
    .map((m: { rol?: unknown; texto?: unknown }) => ({
      rol: m?.rol === "asistente" ? ("asistente" as const) : ("usuario" as const),
      texto: limpiarTexto(m?.texto, MAX_TEXTO),
    }))
    .filter((m) => m.texto);
  // Gemini exige que la conversación empiece y termine con un mensaje del cliente.
  while (mensajes.length && mensajes[0].rol !== "usuario") mensajes.shift();
  if (!mensajes.length || mensajes[mensajes.length - 1].rol !== "usuario") return falla("invalido", 400);

  const config = await leerAsistente(true);
  if (!hayGemini || !config.activo) return falla("apagado", 503);

  // Captcha: una vez por conversación. Después basta la sesión firmada.
  let sesion: string | undefined;
  if (!sesionValida(cuerpo.sesion)) {
    if (!(await verificarTurnstile(cuerpo.token, ip))) return falla("captcha", 403);
    sesion = crearSesion();
  }

  // Tope diario: protege el plan gratuito y el bolsillo.
  const hoy = await contarMensajeHoy();
  if (hoy !== null && hoy > config.topeDiario) return falla("tope", 429, sesion);

  const texto = await consultarGemini(construirInstrucciones(config, idioma, await pausaVigente(idioma)), mensajes);
  if (!texto) return falla("error", 502, sesion);
  return NextResponse.json({ ok: true, texto, ...(sesion ? { sesion } : {}) }, { headers: SIN_CACHE });
}

function acceso(req: Request) {
  const r = revisarAdmin(req);
  if (r === "no_configurado") return NextResponse.json({ error: r }, { status: 503, headers: ADMIN });
  if (r === "no_autorizado") return NextResponse.json({ error: r }, { status: 401, headers: ADMIN });
  return null;
}

/** Configuración actual, para el editor de /asistente. */
export async function GET(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;
  if (new URL(req.url).searchParams.get("probar") === "1") {
    return NextResponse.json(await diagnosticarGemini(), { headers: ADMIN });
  }
  const [config, hoy] = await Promise.all([leerAsistente(true), mensajesHoy()]);
  return NextResponse.json({ ...config, hayGemini, mensajesHoy: hoy }, { headers: ADMIN });
}

/** Guarda la configuración. El saludo en inglés y alemán se traduce solo si se deja vacío. */
export async function PUT(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;
  let c: { activo?: unknown; saludo?: { es?: unknown; en?: unknown; ger?: unknown }; instrucciones?: unknown; topeDiario?: unknown };
  try {
    c = await req.json();
  } catch {
    return NextResponse.json({ error: "cuerpo_invalido" }, { status: 400, headers: ADMIN });
  }
  const es = limpiarTexto(c.saludo?.es, MAX_SALUDO);
  let en = limpiarTexto(c.saludo?.en, MAX_SALUDO);
  let ger = limpiarTexto(c.saludo?.ger, MAX_SALUDO);
  let sinTraducir = false;
  if (es && !en) {
    en = limpiarTexto(await traducirTexto(es, "es", "en"), MAX_SALUDO);
    if (!en) sinTraducir = true;
  }
  if (es && !ger) {
    ger = limpiarTexto(await traducirTexto(es, "es", "de"), MAX_SALUDO);
    if (!ger) sinTraducir = true;
  }
  const config: ConfigAsistente = {
    activo: c.activo === true,
    saludo: { es, en, ger },
    instrucciones: limpiarTexto(c.instrucciones, MAX_INSTRUCCIONES, true),
    topeDiario: limpiarTope(c.topeDiario),
    actualizado: new Date().toISOString(),
  };
  const r = await redisLote([["SET", CLAVE_ASISTENTE, JSON.stringify(config)]]);
  if (!r) return NextResponse.json({ error: "sin_redis" }, { status: 503, headers: ADMIN });
  revalidatePath("/", "layout");
  return NextResponse.json({ ...config, hayGemini, mensajesHoy: await mensajesHoy(), sinTraducir }, { headers: ADMIN });
}
