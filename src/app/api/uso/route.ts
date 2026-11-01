import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { leerUso, limiteTraduccionMensual, SERVICIOS } from "@/lib/uso-api";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

const huella = (t: string) => createHash("sha256").update(t).digest();

/**
 * Consumo de las APIs externas (hoy, este mes, últimos 14 días y registro de llamadas).
 * Protegido con la clave USO_API_TOKEN (mínimo 16 caracteres): se envía como "Authorization: Bearer ...".
 * Cuando exista el panel del técnico, esto pasará a ser solo para el administrador.
 */
export async function GET(req: Request) {
  const clave = process.env.USO_API_TOKEN ?? "";
  if (clave.length < 16) {
    return NextResponse.json({ error: "no_configurado" }, { status: 503, headers: CABECERAS });
  }
  const enviada = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!timingSafeEqual(huella(enviada), huella(clave))) {
    return NextResponse.json({ error: "no_autorizado" }, { status: 401, headers: CABECERAS });
  }
  const resumen = await leerUso();
  return NextResponse.json(
    { ...resumen, servicios: SERVICIOS, limiteTraduccion: limiteTraduccionMensual() },
    { headers: CABECERAS }
  );
}
