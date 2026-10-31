import { empresa } from "@/lib/empresa";
import { enlaceWhatsApp } from "@/lib/utilidades";

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
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
