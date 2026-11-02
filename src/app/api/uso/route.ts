import { NextResponse } from "next/server";
import { revisarAdmin } from "@/lib/admin";
import { leerUso, limiteTraduccionMensual, SERVICIOS } from "@/lib/uso-api";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

/**
 * Consumo de las APIs externas (hoy, este mes, últimos 14 días y registro de llamadas).
 * Protegido con la clave USO_API_TOKEN (ver src/lib/admin.ts).
 */
export async function GET(req: Request) {
  const acceso = revisarAdmin(req);
  if (acceso === "no_configurado") return NextResponse.json({ error: acceso }, { status: 503, headers: CABECERAS });
  if (acceso === "no_autorizado") return NextResponse.json({ error: acceso }, { status: 401, headers: CABECERAS });
  const resumen = await leerUso();
  return NextResponse.json(
    { ...resumen, servicios: SERVICIOS, limiteTraduccion: limiteTraduccionMensual() },
    { headers: CABECERAS }
  );
}
