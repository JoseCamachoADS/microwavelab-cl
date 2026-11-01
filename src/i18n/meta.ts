import type { Metadata } from "next";
import { IDIOMAS, ruta, type Idioma } from "./config";
import { obtenerDiccionario } from "./index";

/** Metadatos de una página: título, descripción, dirección canónica y versiones en otros idiomas (hreflang). */
export function metaPagina(
  lang: Idioma,
  camino: string,
  titulo: string,
  descripcion?: string,
  opciones: { indexar?: boolean } = {}
): Metadata {
  const d = obtenerDiccionario(lang);
  const idiomas: Record<string, string> = {};
  for (const l of IDIOMAS) idiomas[obtenerDiccionario(l).idioma.htmlLang] = ruta(l, camino);
  idiomas["x-default"] = ruta("es", camino);
  return {
    title: titulo,
    ...(descripcion ? { description: descripcion } : {}),
    alternates: { canonical: ruta(lang, camino), languages: idiomas },
    openGraph: { locale: d.idioma.og, url: ruta(lang, camino) },
    ...(opciones.indexar === false ? { robots: { index: false } } : {}),
  };
}
