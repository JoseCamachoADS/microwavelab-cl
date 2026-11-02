import type { Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { empresa } from "@/lib/empresa";
import { enlaceWhatsApp } from "@/lib/utilidades";
import { IconoRayo } from "./Iconos";

/** Botón flotante de urgencias (rayo): abre WhatsApp con el mensaje de urgencia ya escrito. Va sobre el botón de WhatsApp. */
export default function BotonUrgencia({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  const enlace = enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeUrgencia);
  if (!enlace) return null;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={d.urgencia.aria}
      className="fixed bottom-20 right-4 z-50 flex h-14 items-center gap-2 rounded-full border-2 border-white bg-rojo-accion px-5 font-titulo text-base font-semibold text-white shadow-xl shadow-noche/40 transition hover:bg-noche focus-visible:outline-offset-2"
    >
      <IconoRayo className="h-6 w-6" />
      <span className="hidden sm:inline">{d.urgencia.etiqueta}</span>
    </a>
  );
}
