// Acceso del administrador a las páginas internas (/uso, /aviso) y sus rutas de API.
// Se usa la clave USO_API_TOKEN (texto largo y aleatorio, mínimo 16 caracteres) enviada como "Authorization: Bearer ...".
// Cuando exista el panel con usuarios y roles, esto se reemplaza por el rol ADMIN.

import { createHash, timingSafeEqual } from "node:crypto";

const huella = (t: string) => createHash("sha256").update(t).digest();

export function revisarAdmin(req: Request): "ok" | "no_configurado" | "no_autorizado" {
  const clave = process.env.USO_API_TOKEN ?? "";
  if (clave.length < 16) return "no_configurado";
  const enviada = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return timingSafeEqual(huella(enviada), huella(clave)) ? "ok" : "no_autorizado";
}
