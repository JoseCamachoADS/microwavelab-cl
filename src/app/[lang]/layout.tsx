import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Sans } from "next/font/google";
import "../globals.css";
import Analitica from "@/components/Analitica";
import BarraAccesibilidad from "@/components/BarraAccesibilidad";
import AvisoPizarra from "@/components/AvisoPizarra";
import AsistenteChat from "@/components/AsistenteChat";
import ClicsWhatsApp from "@/components/ClicsWhatsApp";
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
import { fechaLarga, leerBotones, modoUrgencias } from "@/lib/botones";
import { enlaceTelefono } from "@/lib/utilidades";
import UrgenciasPausa from "@/components/UrgenciasPausa";
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

// Aplica las preferencias de accesibilidad antes de pintar la página: las guardadas por la persona o, si no hay,
// las del sistema (más contraste, menos movimiento). Los estilos están en globals.css.
const INICIO_ACCESIBILIDAD = `(function(){try{var h=document.documentElement,p=null;try{p=JSON.parse(localStorage.getItem("a11y")||"null")}catch(e){}var m=function(q){return window.matchMedia&&window.matchMedia(q).matches};if(!p){p={texto:0,contraste:m("(prefers-contrast: more)"),enlaces:false,fuente:false,quieto:m("(prefers-reduced-motion: reduce)")}}if(p.texto>0&&p.texto<4)h.setAttribute("data-a11y-texto",String(p.texto));["contraste","enlaces","fuente","quieto"].forEach(function(k){if(p[k])h.setAttribute("data-a11y-"+k,"1")})}catch(e){}})();`;

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
  const botones = await leerBotones();
  const urgencias = modoUrgencias(botones);
  const fechaPausa = fechaLarga(botones.hasta, lang);
  const json = JSON.stringify(
    datosEstructurados(d.comun.descripcionEmpresa, `${empresa.sitioUrl}${ruta(lang, "/")}`)
  ).replace(/</g, "\\u003c");

  return (
    <html lang={d.idioma.htmlLang} suppressHydrationWarning className={`${titulo.variable} ${cuerpo.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: INICIO_ACCESIBILIDAD }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
        {/* Primero en el orden de tabulación; se muestra fijo abajo */}
        <Analitica lang={lang} textos={d.cookies} />
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
        <PieDePagina lang={lang} pausaHasta={urgencias === "pausa" ? fechaPausa : undefined} />
        {asistente?.activo && (
          <AsistenteChat
            lang={lang}
            textos={d.asistente}
            saludo={saludoPersonalizado(asistente, lang) || d.asistente.saludo}
            enlaceWhatsApp={enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeConsulta)}
          />
        )}
        <ClicsWhatsApp />
        {urgencias === "activo" && <BotonUrgencia lang={lang} />}
        {urgencias === "pausa" && (
          <UrgenciasPausa
            textos={{ ...d.urgenciaPausa, texto: fmt(d.urgenciaPausa.texto, { fecha: fechaPausa }) }}
            abrirSolo={botones.abrirSolo}
            enlaceWhatsApp={enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeConsulta)}
            enlaceTelefono={enlaceTelefono(empresa.whatsapp)}
          />
        )}
        {botones.whatsapp && <BotonWhatsApp lang={lang} />}
        <BarraAccesibilidad textos={d.accesibilidad} />
      </body>
    </html>
  );
}
