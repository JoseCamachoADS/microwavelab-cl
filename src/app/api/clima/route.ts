import { NextResponse } from "next/server";
import { interpretarSimbolo } from "@/lib/clima";

export const dynamic = "force-dynamic";

// La Cisterna, Santiago (MET Norway pide como máximo 4 decimales).
const LATITUD = -33.5333;
const LONGITUD = -70.6633;
// MET Norway exige identificar la aplicación en cada consulta.
const AGENTE = "MicroWaveLabCL-sitio/1.0 https://electronicamicrowavelab.cl";

type Respuesta = {
  properties?: {
    timeseries?: {
      data?: {
        instant?: { details?: { air_temperature?: number } };
        next_1_hours?: { summary?: { symbol_code?: string } };
        next_6_hours?: { summary?: { symbol_code?: string } };
      };
    }[];
  };
};

/**
 * Clima actual de Santiago para la barra superior. El servidor consulta a MET Norway como máximo una vez
 * cada 15 minutos (el navegador de la persona no se conecta a ese servicio).
 */
export async function GET() {
  try {
    const r = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LATITUD}&lon=${LONGITUD}`,
      { headers: { "User-Agent": AGENTE }, next: { revalidate: 900 }, signal: AbortSignal.timeout(5000) }
    );
    if (!r.ok) throw new Error(`MET Norway respondió ${r.status}`);
    const datos = ((await r.json()) as Respuesta).properties?.timeseries?.[0]?.data;
    const temp = datos?.instant?.details?.air_temperature;
    const simbolo = datos?.next_1_hours?.summary?.symbol_code ?? datos?.next_6_hours?.summary?.symbol_code;
    if (typeof temp !== "number" || !simbolo) throw new Error("Respuesta sin temperatura o símbolo");
    return NextResponse.json(
      { ok: true, temp: Math.round(temp), ...interpretarSimbolo(simbolo) },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=600" } }
    );
  } catch (error) {
    console.error("[clima] No se pudo obtener el clima:", error);
    return NextResponse.json({ ok: false }, { status: 502, headers: { "Cache-Control": "public, s-maxage=60" } });
  }
}
