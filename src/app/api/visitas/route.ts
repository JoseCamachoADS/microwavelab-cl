import { NextResponse } from "next/server";
import { leerVisitas, sumarVisita } from "@/lib/visitas";

export const dynamic = "force-dynamic";

const SIN_CACHE = { "Cache-Control": "no-store" };
const ROBOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor|curl|wget/i;

/** Devuelve el total actual. */
export async function GET() {
  const total = await leerVisitas();
  return NextResponse.json({ total }, { headers: SIN_CACHE });
}

/** Suma una visita (el navegador la pide una vez por sesión). Los robots no cuentan. */
export async function POST(req: Request) {
  const agente = req.headers.get("user-agent") ?? "";
  const total = ROBOTS.test(agente) || !agente ? await leerVisitas() : await sumarVisita();
  return NextResponse.json({ total }, { headers: SIN_CACHE });
}
