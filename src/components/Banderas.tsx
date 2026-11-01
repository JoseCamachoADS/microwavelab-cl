import type { Idioma } from "@/i18n/config";

// Banderas nacionales dibujadas como vectores simples (Chile, Reino Unido, Alemania).
// Español → Chile (la empresa está en Chile), inglés → Reino Unido, alemán → Alemania.
export default function Bandera({ lang, className }: { lang: Idioma; className?: string }) {
  if (lang === "es") {
    return (
      <svg viewBox="0 0 90 60" className={className} aria-hidden="true" focusable="false">
        <rect width="90" height="30" fill="#fff" />
        <rect y="30" width="90" height="30" fill="#D52B1E" />
        <rect width="30" height="30" fill="#0039A6" />
        <polygon fill="#fff" points="15,6 17.1,12.1 23.6,12.2 18.4,16.1 20.3,22.3 15,18.6 9.7,22.3 11.6,16.1 6.4,12.2 12.9,12.1" />
      </svg>
    );
  }
  if (lang === "en") {
    return (
      <svg viewBox="0 0 60 30" className={className} aria-hidden="true" focusable="false">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2.4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 5 3" className={className} aria-hidden="true" focusable="false">
      <rect width="5" height="1" fill="#000" />
      <rect y="1" width="5" height="1" fill="#DD0000" />
      <rect y="2" width="5" height="1" fill="#FFCE00" />
    </svg>
  );
}
