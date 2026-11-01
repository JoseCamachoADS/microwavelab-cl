// El doble rayo del logo, como vector: se ve nítido a cualquier tamaño.
// Usa el color del texto (currentColor): se pinta con text-rojo, text-azul, etc.
const TRAZADO =
  "M1 906 L362 716 L363 903 L373 907 L1022 557 L1026 476 L930 477 L581 646 L579 468 L217 660 L210 468 L1 589Z M982 6 L973 0 L599 192 L591 0 L4 303 L1 436 L377 262 L378 441 L766 248 L769 444 L979 444Z";

export default function Rayo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1027 909"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={TRAZADO} />
    </svg>
  );
}
