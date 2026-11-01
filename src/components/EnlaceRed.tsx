import type { ReactNode } from "react";

type Props = {
  href: string;
  nombre: string;
  /** Ruta del logo oficial en /public (null = todavía no entregado). */
  logo: string | null;
  /** Ícono genérico mientras no exista el logo oficial. */
  iconoRespaldo: ReactNode;
  etiqueta: string;
  className?: string;
};

/** Botón hacia una red o app externa (Waze, LinkedIn). Muestra su logo oficial si existe. */
export default function EnlaceRed({
  href,
  nombre,
  logo,
  iconoRespaldo,
  etiqueta,
  className = "boton-claro",
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${etiqueta} (${nombre}, se abre en otra pestaña)`}
    >
      {logo ? (
        // Logo oficial entregado por el dueño; no se modifica ni se recolorea.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" className="h-6 w-6" width={24} height={24} />
      ) : (
        iconoRespaldo
      )}
      <span>{etiqueta}</span>
    </a>
  );
}
