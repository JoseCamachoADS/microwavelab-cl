import type { MetadataRoute } from "next";
import { empresa } from "@/lib/empresa";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/servicios", "/proceso", "/contacto", "/privacidad"];
  return rutas.map((ruta) => ({
    url: `${empresa.sitioUrl}${ruta}`,
    lastModified: new Date(),
  }));
}
