import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { revisarAdmin } from "@/lib/admin";
import { CLAVE_AVISO, leerAviso, limpiarAviso, type Aviso } from "@/lib/aviso";
import { redisLote } from "@/lib/redis";
import { traducirTexto } from "@/lib/traducir";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

function acceso(req: Request) {
  const r = revisarAdmin(req);
  if (r === "no_configurado") return NextResponse.json({ error: r }, { status: 503, headers: CABECERAS });
  if (r === "no_autorizado") return NextResponse.json({ error: r }, { status: 401, headers: CABECERAS });
  return null;
}

/** Aviso actual, para el editor de /aviso. */
export async function GET(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;
  return NextResponse.json(await leerAviso(true), { headers: CABECERAS });
}

/**
 * Guarda el aviso. Recibe { activo, es, en, ger }. Si el inglés o el alemán vienen vacíos, se traducen
 * desde el español. El sitio se actualiza de inmediato.
 */
export async function PUT(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;

  let cuerpo: { activo?: unknown; es?: unknown; en?: unknown; ger?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ error: "cuerpo_invalido" }, { status: 400, headers: CABECERAS });
  }
  const activo = cuerpo.activo === true;
  const es = limpiarAviso(cuerpo.es);
  let en = limpiarAviso(cuerpo.en);
  let ger = limpiarAviso(cuerpo.ger);
  if (activo && !es) {
    return NextResponse.json({ error: "falta_texto" }, { status: 400, headers: CABECERAS });
  }

  // Traducción automática de lo que se dejó vacío (cuenta en /uso como Google Translate).
  let sinTraducir = false;
  if (es && !en) {
    en = limpiarAviso(await traducirTexto(es, "es", "en"));
    if (!en) sinTraducir = true;
  }
  if (es && !ger) {
    ger = limpiarAviso(await traducirTexto(es, "es", "de"));
    if (!ger) sinTraducir = true;
  }

  const aviso: Aviso = { activo, es, en, ger, actualizado: new Date().toISOString() };
  const r = await redisLote([["SET", CLAVE_AVISO, JSON.stringify(aviso)]]);
  if (!r) {
    return NextResponse.json({ error: "sin_redis" }, { status: 503, headers: CABECERAS });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ...aviso, sinTraducir }, { headers: CABECERAS });
}
