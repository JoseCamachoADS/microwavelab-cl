// Idiomas del sitio. El español vive en la raíz (/), el inglés en /en y el alemán en /ger.
export const IDIOMAS = ["es", "en", "ger"] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const IDIOMA_BASE: Idioma = "es";

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}

/** Dirección de una ruta en un idioma. ruta("en", "/servicios") → "/en/servicios"; el español no lleva prefijo. */
export function ruta(lang: Idioma, camino: string = "/"): string {
  const c = camino.startsWith("/") ? camino : `/${camino}`;
  if (lang === IDIOMA_BASE) return c;
  if (c === "/") return `/${lang}`;
  if (c.startsWith("/#") || c.startsWith("/?")) return `/${lang}${c.slice(1)}`;
  return `/${lang}${c}`;
}

/** Separa idioma y camino de una dirección visible: "/en/servicios" → { lang: "en", camino: "/servicios" }. */
export function separarIdioma(direccion: string): { lang: Idioma; camino: string } {
  const partes = direccion.split("/");
  const primera = partes[1] ?? "";
  if (esIdioma(primera) && primera !== IDIOMA_BASE) {
    const resto = "/" + partes.slice(2).join("/");
    return { lang: primera, camino: resto === "/" ? "/" : resto.replace(/\/$/, "") || "/" };
  }
  return { lang: IDIOMA_BASE, camino: direccion || "/" };
}

/** Reemplaza {variables} en un texto del diccionario. */
export function fmt(texto: string, vars: Record<string, string | number> = {}): string {
  return texto.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}
