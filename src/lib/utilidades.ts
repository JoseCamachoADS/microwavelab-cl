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
