import type { Metadata, Viewport } from "next";
import "./globals.css";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import Encabezado from "@/components/Encabezado";
import PieDePagina from "@/components/PieDePagina";
import { empresa } from "@/lib/empresa";
import { datoPublico } from "@/lib/utilidades";

export const metadata: Metadata = {
  metadataBase: new URL(empresa.sitioUrl),
  title: {
    default: `${empresa.nombre} | Reparación de tarjetas y equipos electrónicos`,
    template: `%s | ${empresa.nombre}`,
  },
  description: `Laboratorio electrónico en La Cisterna, Santiago. Más de ${empresa.aniosTrayectoria} años reparando tarjetas electrónicas, módulos I/O, fuentes de alimentación, inversores y monitores táctiles. ${empresa.garantiaMeses} meses de garantía.`,
  applicationName: empresa.nombre,
  alternates: { canonical: "/" },
  openGraph: {
    title: empresa.nombreCompleto,
    description: empresa.eslogan,
    locale: "es_CL",
    type: "website",
    url: empresa.sitioUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#124a79",
  width: "device-width",
  initialScale: 1,
};

// Datos estructurados para que Google entienda el negocio local.
function datosEstructurados() {
  const correo = datoPublico(empresa.correo);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: empresa.nombreCompleto,
    description: empresa.descripcion,
    url: empresa.sitioUrl,
    telephone: empresa.telefono,
    ...(correo ? { email: correo } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: empresa.direccionCalle,
      addressLocality: empresa.comuna,
      addressRegion: empresa.region,
      addressCountry: "CL",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: [empresa.linkedin],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const json = JSON.stringify(datosEstructurados()).replace(/</g, "\\u003c");

  return (
    <html lang="es-CL">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
        <Encabezado />
        <main>{children}</main>
        <PieDePagina />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
