import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Sans } from "next/font/google";
import "../globals.css";
import Analitica from "@/components/Analitica";
import AvisoPizarra from "@/components/AvisoPizarra";
import AsistenteChat from "@/components/AsistenteChat";
import BotonUrgencia from "@/components/BotonUrgencia";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import Encabezado from "@/components/Encabezado";
import PieDePagina from "@/components/PieDePagina";
import { IDIOMAS, ruta } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { idiomaDe, variables } from "@/i18n/servidor";
import { fmt } from "@/i18n/config";
import { hayGemini, leerAsistente, saludoPersonalizado } from "@/lib/asistente";
import { leerAviso, textoAviso } from "@/lib/aviso";
import { empresa, servicios } from "@/lib/empresa";
import { datoPublico, enlaceWhatsApp } from "@/lib/utilidades";

const titulo = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-titulo",
  display: "swap",
});
const cuerpo = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cuerpo",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  return {
    metadataBase: new URL(empresa.sitioUrl),
    title: {
      default: `${d.meta.titulo} | ${empresa.nombre}`,
      template: `%s | ${empresa.nombre}`,
    },
    description: fmt(d.meta.descripcion, variables(d)),
    applicationName: empresa.nombre,
    openGraph: {
      title: empresa.nombreCompleto,
      description: d.comun.eslogan,
      locale: d.idioma.og,
      type: "website",
      url: ruta(lang, "/"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#15173F",
  width: "device-width",
  initialScale: 1,
};

// Datos estructurados para que Google entienda el negocio local.
function datosEstructurados(descripcion: string, url: string) {
  const correo = datoPublico(empresa.correo);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: empresa.nombreCompleto,
    description: descripcion,
    url,
    logo: `${empresa.sitioUrl}/logo/logo-color-640.png`,
    image: `${empresa.sitioUrl}/logo/logo-color-960.png`,
    hasMap: empresa.urlGoogle,
    telephone: empresa.telefono,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Región Metropolitana de Santiago" },
      { "@type": "Country", name: "Chile" },
    ],
    knowsAbout: servicios.map((s) => s.titulo),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de reparación electrónica industrial",
      itemListElement: servicios.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.titulo, description: s.descripcion },
      })),
    },
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "10:00",
        closes: "13:00",
      },
    ],
    sameAs: [empresa.linkedin],
  };
}

export default async function RootLayout({ children, params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  const aviso = textoAviso(await leerAviso(), lang);
  const asistente = hayGemini ? await leerAsistente() : null;
  const json = JSON.stringify(
    datosEstructurados(d.comun.descripcionEmpresa, `${empresa.sitioUrl}${ruta(lang, "/")}`)
  ).replace(/</g, "\\u003c");

  return (
    <html lang={d.idioma.htmlLang} className={`${titulo.variable} ${cuerpo.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
        {aviso && (
          <AvisoPizarra
            texto={aviso}
            etiqueta={d.aviso.etiqueta}
            pausar={d.aviso.pausar}
            reanudar={d.aviso.reanudar}
          />
        )}
        <Encabezado lang={lang} />
        <main>{children}</main>
        <PieDePagina lang={lang} />
        {asistente?.activo && (
          <AsistenteChat
            lang={lang}
            textos={d.asistente}
            saludo={saludoPersonalizado(asistente, lang) || d.asistente.saludo}
            enlaceWhatsApp={enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeConsulta)}
          />
        )}
        <BotonUrgencia lang={lang} />
        <BotonWhatsApp lang={lang} />
        <Analitica lang={lang} textos={d.cookies} />
      </body>
    </html>
  );
}
