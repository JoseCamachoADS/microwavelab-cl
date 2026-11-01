"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Analítica del sitio público: Google Analytics 4 (alimenta Looker Studio) y Microsoft Clarity.
// - Solo se cargan si el visitante acepta, y solo si existen los IDs en las variables de entorno.
// - Nunca se cargan en /portal ni /panel: ahí hay datos personales de clientes.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const CLAVE = "consentimiento-analitica";
const RUTAS_PRIVADAS = ["/portal", "/panel"];

type Decision = "si" | "no" | null;

// Clics importantes, detectados por el destino del enlace (no hace falta tocar cada botón).
function nombreEvento(href: string): string | null {
  if (href.startsWith("tel:")) return "clic_llamada";
  if (/wa\.me|whatsapp\.com/.test(href)) return "clic_whatsapp";
  if (/waze\.com/.test(href)) return "clic_waze";
  if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl/.test(href)) return "clic_google_maps";
  if (/linkedin\.com/.test(href)) return "clic_linkedin";
  if (href.startsWith("mailto:")) return "clic_correo";
  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analitica() {
  const ruta = usePathname();
  const [decision, setDecision] = useState<Decision>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado === "si" || guardado === "no") setDecision(guardado);
    } catch {
      /* sin almacenamiento: se vuelve a preguntar */
    }
    setListo(true);
  }, []);

  const privada = RUTAS_PRIVADAS.some((r) => ruta === r || ruta.startsWith(`${r}/`));
  const activa = decision === "si" && !privada && Boolean(GA_ID || CLARITY_ID);

  // Eventos de clic hacia WhatsApp, teléfono, mapas, etc.
  useEffect(() => {
    if (!activa || !GA_ID) return;
    const alClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const evento = nombreEvento(a.getAttribute("href") ?? "");
      if (evento) window.gtag?.("event", evento, { pagina: window.location.pathname });
    };
    document.addEventListener("click", alClic);
    return () => document.removeEventListener("click", alClic);
  }, [activa]);

  function decidir(valor: "si" | "no") {
    setDecision(valor);
    try {
      localStorage.setItem(CLAVE, valor);
    } catch {
      /* se ignora */
    }
  }

  const hayAnalitica = Boolean(GA_ID || CLARITY_ID);
  const mostrarAviso = listo && hayAnalitica && decision === null && !privada;

  return (
    <>
      {activa && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {activa && CLARITY_ID && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      {mostrarAviso && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[60] border-t-4 border-rojo bg-noche text-white shadow-2xl"
        >
          <div className="contenedor flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-base text-white/90">
              Usamos cookies de medición (Google Analytics y Microsoft Clarity) para entender cómo se usa el
              sitio y mejorarlo. No las usamos para publicidad. Puede aceptar o rechazar.{" "}
              <Link href="/privacidad" className="font-semibold underline underline-offset-4">
                Más información
              </Link>
            </p>
            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => decidir("si")} className="boton">
                Aceptar
              </button>
              <button type="button" onClick={() => decidir("no")} className="boton-claro">
                Solo necesarias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
