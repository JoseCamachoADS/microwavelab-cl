import type { Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { empresa } from "@/lib/empresa";
import { enlaceWhatsApp } from "@/lib/utilidades";
import { IconoChat } from "./Iconos";

/** Botón flotante de contacto por WhatsApp, visible en todo el sitio. */
export default function BotonWhatsApp({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  const enlace = enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeConsulta);
  if (!enlace) return null;

  return (
    <a
      href={enlace}
      data-clic="flotante"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={d.whatsapp.aria}
      className="fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-[#157A4B] px-5 font-titulo text-base font-semibold text-white shadow-xl shadow-noche/30 transition hover:bg-[#0F6039]"
    >
      <IconoChat className="h-6 w-6" />
      <span className="hidden sm:inline">{d.whatsapp.etiqueta}</span>
    </a>
  );
}
