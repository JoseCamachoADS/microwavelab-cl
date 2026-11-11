import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { revisarAdmin } from "@/lib/admin";
import { CLAVE_BOTONES, esFecha, leerBotones, limpiarBotones } from "@/lib/botones";
import { redisLote } from "@/lib/redis";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

function acceso(req: Request) {
  const r = revisarAdmin(req);
  if (r === "no_configurado") return NextResponse.json({ error: r }, { status: 503, headers: CABECERAS });
  if (r === "no_autorizado") return NextResponse.json({ error: r }, { status: 401, headers: CABECERAS });
  return null;
}

/** Configuración actual, para el editor de /botones. */
export async function GET(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;
  return NextResponse.json(await leerBotones(true), { headers: CABECERAS });
}

/** Guarda { whatsapp, urgencias, hasta, abrirSolo }. El sitio se actualiza de inmediato. */
export async function PUT(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ error: "cuerpo_invalido" }, { status: 400, headers: CABECERAS });
  }
  if (cuerpo.urgencias === "pausa" && !esFecha(cuerpo.hasta)) {
    return NextResponse.json({ error: "falta_fecha" }, { status: 400, headers: CABECERAS });
  }
  const botones = limpiarBotones({ ...cuerpo, actualizado: new Date().toISOString() } as never);
  const r = await redisLote([["SET", CLAVE_BOTONES, JSON.stringify(botones)]]);
  if (!r) return NextResponse.json({ error: "sin_redis" }, { status: 503, headers: CABECERAS });
  revalidatePath("/", "layout");
  return NextResponse.json(botones, { headers: CABECERAS });
}
