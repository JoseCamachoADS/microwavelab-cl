import type { MetadataRoute } from "next";
import { IDIOMAS, ruta } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { empresa } from "@/lib/empresa";

// Cada página aparece una vez por idioma, indicando a Google sus versiones equivalentes (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const caminos = ["/", "/servicios", "/servicio-tecnico", "/proceso", "/contacto", "/privacidad"];
  const entradas: MetadataRoute.Sitemap = [];
  for (const camino of caminos) {
    const idiomas: Record<string, string> = {};
    for (const l of IDIOMAS) {
      idiomas[obtenerDiccionario(l).idioma.htmlLang] = `${empresa.sitioUrl}${ruta(l, camino)}`;
    }
    for (const l of IDIOMAS) {
      entradas.push({
        url: `${empresa.sitioUrl}${ruta(l, camino)}`,
        lastModified: new Date(),
        alternates: { languages: idiomas },
      });
    }
  }
  return entradas;
}
