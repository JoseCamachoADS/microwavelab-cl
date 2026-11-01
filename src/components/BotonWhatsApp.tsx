import { empresa } from "@/lib/empresa";
import { enlaceWhatsApp } from "@/lib/utilidades";
import { IconoChat } from "./Iconos";

/** Botón flotante de contacto por WhatsApp, visible en todo el sitio. */
export default function BotonWhatsApp() {
  const enlace = enlaceWhatsApp(
    empresa.whatsapp,
    "Hola, quisiera consultar por la reparación de un equipo."
  );
  if (!enlace) return null;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-[#157A4B] px-5 font-titulo text-base font-semibold text-white shadow-xl shadow-noche/30 transition hover:bg-[#0F6039]"
    >
      <IconoChat className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
