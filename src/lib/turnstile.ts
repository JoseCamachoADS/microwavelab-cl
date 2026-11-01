// Verificación del captcha Cloudflare Turnstile en el servidor.
// El navegador entrega un "token" de un solo uso; aquí se le pregunta a Cloudflare si es válido.
//
// Variables de entorno:
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY  clave pública del widget (se ve en el código de la página; es normal)
//   TURNSTILE_SECRET_KEY            clave secreta (solo servidor; nunca en el navegador)
// Si falta alguna, el captcha queda desactivado y el formulario funciona sin él.

import { registrarUso } from "./uso-api";

export function turnstileActivo(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

export async function verificarTurnstile(token: unknown, ip?: string): Promise<boolean> {
  if (!turnstileActivo()) {
    console.warn("[captcha] Desactivado: faltan NEXT_PUBLIC_TURNSTILE_SITE_KEY o TURNSTILE_SECRET_KEY.");
    return true;
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    // Sin token: casi siempre un robot que llama a la API directo. No se escribe en Redis para no
    // gastar comandos si hay un ataque; queda solo en los registros de Vercel.
    console.warn("[captcha] Solicitud sin token.");
    return false;
  }

  const cuerpo = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY as string, response: token });
  if (ip && ip !== "desconocida") cuerpo.set("remoteip", ip);

  const inicio = Date.now();
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: cuerpo,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const datos = (await r.json()) as { success?: boolean; "error-codes"?: string[] };
    const ok = datos.success === true;
    await registrarUso({
      servicio: "turnstile",
      ok,
      estado: r.status,
      ms: Date.now() - inicio,
      detalle: ok ? undefined : (datos["error-codes"] ?? []).join(","),
    });
    return ok;
  } catch (error) {
    console.error("[captcha] No se pudo consultar a Cloudflare:", error);
    await registrarUso({ servicio: "turnstile", ok: false, estado: "red", ms: Date.now() - inicio, detalle: "sin respuesta de Cloudflare" });
    // Si Cloudflare no responde, se rechaza (más seguro). La persona puede escribir por WhatsApp directo.
    return false;
  }
}
