/** Devuelve el valor solo si ya fue completado; oculta los "PENDIENTE". */
export function datoPublico(valor: string): string | null {
  const v = valor.trim();
  if (!v || v === "PENDIENTE") return null;
  return v;
}

/** Enlace de WhatsApp con mensaje inicial, o null si no hay número. */
export function enlaceWhatsApp(numero: string, mensaje: string): string | null {
  const n = datoPublico(numero);
  if (!n) return null;
  return `https://wa.me/${n.replace(/\D/g, "")}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace para llamar por teléfono, o null si no hay número. */
export function enlaceTelefono(numero: string): string | null {
  const n = datoPublico(numero);
  if (!n) return null;
  return `tel:+${n.replace(/\D/g, "")}`;
}

/**
 * Limpia un RUT: sin puntos ni espacios, con guion y dígito verificador en
 * mayúscula (ej: "12.345.678-5" → "12345678-5"). Devuelve null si el formato
 * no corresponde a un RUT.
 */
export function normalizarRut(valor: string): string | null {
  const limpio = valor.replace(/[.\s-]/g, "").toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return null;
  return `${limpio.slice(0, -1)}-${limpio.slice(-1)}`;
}

/** Comprueba el dígito verificador del RUT (módulo 11). */
export function rutValido(valor: string): boolean {
  const normalizado = normalizarRut(valor);
  if (!normalizado) return false;
  const [cuerpo, dv] = normalizado.split("-");
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === esperado;
}
