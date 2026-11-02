// Íconos genéricos de línea, dibujados para este sitio. No son logos de ninguna marca.
import type { ReactElement } from "react";

type Props = { className?: string };

function Base({
  className,
  children,
}: Props & { children: React.ReactNode }): ReactElement {
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
      {children}
    </svg>
  );
}

export function IconoChip({ className }: Props) {
  return (
    <Base className={className}>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </Base>
  );
}

export function IconoModulos({ className }: Props) {
  return (
    <Base className={className}>
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
      <path d="M7 7h.01M7 17h.01M12 7h6M12 17h6" />
    </Base>
  );
}

export function IconoEnchufe({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0V8zM12 17v5" />
    </Base>
  );
}

export function IconoMonitor({ className }: Props) {
  return (
    <Base className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M8 20h8M12 16v4" />
    </Base>
  );
}

export function IconoLaptop({ className }: Props) {
  return (
    <Base className={className}>
      <rect x="5" y="5" width="14" height="10" rx="1" />
      <path d="M2 19h20" />
    </Base>
  );
}

export function IconoLlave({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z" />
    </Base>
  );
}

export function IconoLupa({ className }: Props) {
  return (
    <Base className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </Base>
  );
}

export function IconoPin({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  );
}

export function IconoTelefono({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </Base>
  );
}

export function IconoReloj({ className }: Props) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  );
}

export function IconoEscudo({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </Base>
  );
}

export function IconoCheck({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M5 12l4 4 10-10" />
    </Base>
  );
}

export function IconoChat({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5z" />
    </Base>
  );
}

/** Globo de diálogo con destello: asistente virtual. */
export function IconoAsistente({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20.5l1.5-4.4A7.5 7.5 0 1 1 20 12.5z" />
      <path d="M12.5 8.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </Base>
  );
}

/** Flecha de navegación genérica (no es el logo de ninguna app). */
export function IconoNavegar({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M12 3l7 18-7-4-7 4 7-18z" />
    </Base>
  );
}

/** Nodos conectados, genérico (no es el logo de ninguna red). */
export function IconoRed({ className }: Props) {
  return (
    <Base className={className}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
    </Base>
  );
}

export function IconoMas({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function IconoMenu({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  );
}

export function IconoCerrar({ className }: Props) {
  return (
    <Base className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

const ICONOS_SERVICIO: Record<string, (p: Props) => ReactElement> = {
  tarjetas: IconoChip,
  industrial: IconoModulos,
  fuentes: IconoEnchufe,
  monitores: IconoMonitor,
  computadoras: IconoLaptop,
  otros: IconoLlave,
};

/** Ícono asociado a cada servicio (por su id en empresa.ts). */
export function IconoServicio({ id, className }: { id: string; className?: string }) {
  const Icono = ICONOS_SERVICIO[id] ?? IconoLlave;
  return <Icono className={className} />;
}
