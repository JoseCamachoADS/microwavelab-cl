// Íconos de clima de línea, dibujados para este sitio (no son los de ningún servicio).
import type { CategoriaClima } from "@/lib/clima";

const NUBE = "M6.5 18a4 4 0 0 1-.4-7.98 6 6 0 0 1 11.6 1.48A3.25 3.25 0 0 1 17.5 18h-11z";
const NUBE_ALTA = "M6.5 14a3.5 3.5 0 0 1-.3-7 5.5 5.5 0 0 1 10.6 1.3A3 3 0 0 1 17 14H6.5z";

export default function IconoClima({
  categoria,
  noche,
  className,
}: {
  categoria: CategoriaClima;
  noche: boolean;
  className?: string;
}) {
  let dibujo: React.ReactNode;
  switch (categoria) {
    case "despejado":
      dibujo = noche ? (
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      );
      break;
    case "parcial":
      dibujo = (
        <>
          {noche ? (
            <path d="M9.5 3a4 4 0 1 0 4.5 5.5A3.3 3.3 0 0 1 9.5 3z" />
          ) : (
            <>
              <circle cx="8" cy="8" r="2.5" />
              <path d="M8 2v1.5M2 8h1.5M3.8 3.8l1 1M12.2 3.8l-1 1" />
            </>
          )}
          <path d="M9 20a3.5 3.5 0 0 1-.3-7 5 5 0 0 1 9.6 1.3A3 3 0 0 1 18 20H9z" />
        </>
      );
      break;
    case "nublado":
      dibujo = <path d={NUBE} />;
      break;
    case "niebla":
      dibujo = <path d="M4 8h16M6 12h12M4 16h16M8 20h8" />;
      break;
    case "lluvia":
      dibujo = (
        <>
          <path d={NUBE_ALTA} />
          <path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3" />
        </>
      );
      break;
    case "tormenta":
      dibujo = (
        <>
          <path d={NUBE_ALTA} />
          <path d="M12.5 14l-2 3.5h3l-2 3.5" />
        </>
      );
      break;
    default: // nieve y aguanieve
      dibujo = (
        <>
          <path d={NUBE_ALTA} />
          <path d="M8 18h.01M12 18h.01M16 18h.01M10 21h.01M14 21h.01" />
        </>
      );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {dibujo}
    </svg>
  );
}
