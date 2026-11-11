import { NextResponse } from "next/server";
import { revisarAdmin } from "@/lib/admin";
import { CLAVE_HONORARIOS, limpiarTasas, tasasIniciales } from "@/lib/honorarios";
import { redisLote } from "@/lib/redis";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

function acceso(req: Request) {
  const r = revisarAdmin(req);
  if (r === "no_configurado") return NextResponse.json({ error: r }, { status: 503, headers: CABECERAS });
  if (r === "no_autorizado") return NextResponse.json({ error: r }, { status: 401, headers: CABECERAS });
  return null;
}

/** Tabla de tasas por año (la guardada, o la inicial). `guardada` indica si viene de Redis. */
export async function GET(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;
  const r = await redisLote([["GET", CLAVE_HONORARIOS]]);
  let tasas = tasasIniciales;
  let guardada = false;
  try {
    const crudo = r?.[0];
    if (typeof crudo === "string") {
      const lista = limpiarTasas(JSON.parse(crudo));
      if (lista.length > 0) {
        tasas = lista;
        guardada = true;
      }
    }
  } catch {
    /* tabla dañada: valen las iniciales */
  }
  return NextResponse.json({ tasas, guardada, redis: r !== null }, { headers: CABECERAS });
}

/** Guarda la tabla de tasas: { tasas: [{ anio, tasa }] }. */
export async function PUT(req: Request) {
  const negado = acceso(req);
  if (negado) return negado;
  let cuerpo: { tasas?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ error: "cuerpo_invalido" }, { status: 400, headers: CABECERAS });
  }
  const tasas = limpiarTasas(cuerpo.tasas);
  if (tasas.length === 0) return NextResponse.json({ error: "sin_tasas" }, { status: 400, headers: CABECERAS });
  const r = await redisLote([["SET", CLAVE_HONORARIOS, JSON.stringify(tasas)]]);
  if (!r) return NextResponse.json({ error: "sin_redis" }, { status: 503, headers: CABECERAS });
  return NextResponse.json({ tasas, guardada: true, redis: true }, { headers: CABECERAS });
}
