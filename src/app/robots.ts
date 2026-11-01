import type { MetadataRoute } from "next";
import { empresa } from "@/lib/empresa";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El portal de clientes y el panel del técnico no deben aparecer en Google.
      disallow: ["/portal", "/panel", "/uso", "/en/portal", "/en/panel", "/ger/portal", "/ger/panel"],
    },
    sitemap: `${empresa.sitioUrl}/sitemap.xml`,
  };
}
