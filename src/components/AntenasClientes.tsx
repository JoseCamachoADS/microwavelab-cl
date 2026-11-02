"use client";

import { useState } from "react";

type Cliente = { nombre: string; logo: string | null };

// Tres ondas por antena, desfasadas. Los valores --e (tamaño) y --o (opacidad) son la posición fija
// que se ve cuando el equipo pide "reducir movimiento" y no hay animación.
const ONDAS = [
  { retardo: "0s", e: 0.3, o: 0.8 },
  { retardo: "1.2s", e: 0.58, o: 0.55 },
  { retardo: "2.4s", e: 0.86, o: 0.3 },
];

/** Antena parabólica dibujada para este sitio (no es el logo de ninguna marca), con sus ondas. */
function Antena({ lado }: { lado: "izq" | "der" }) {
  return (
    <div className={`antena antena-${lado}`} aria-hidden="true">
      {ONDAS.map((o) => (
        <span
          key={o.retardo}
          className="onda"
          style={{ "--retardo": o.retardo, "--e": o.e, "--o": o.o } as React.CSSProperties}
        />
      ))}
      <svg viewBox="0 0 120 150" focusable="false">
        {/* mástil y base */}
        <path className="antena-soporte" d="M36 112V146M18 146H54" />
        {/* plato: el casco por detrás y la boca (elipse) por delante */}
        <path className="antena-casco" d="M46 12C-2 36 -2 104 46 128Z" />
        <ellipse className="antena-interior" cx="46" cy="70" rx="15" ry="58" />
        {/* brazo y bocina que emite */}
        <path className="antena-brazo" d="M46 70H98" />
        <path className="antena-bocina" d="M96 61L110 67V73L96 79Z" />
      </svg>
    </div>
  );
}

/**
 * Dos antenas parabólicas (roja y azul, los colores de la marca) transmiten hacia las empresas
 * que confían en el laboratorio. Las ondas se pueden pausar, y con "reducir movimiento" quedan quietas.
 */
export default function AntenasClientes({
  items,
  etiqueta,
  pausar,
  reanudar,
}: {
  items: Cliente[];
  etiqueta: string;
  pausar: string;
  reanudar: string;
}) {
  const [pausada, setPausada] = useState(false);

  return (
    <div>
      <div className="antenas panel" data-pausada={pausada}>
        <div className="antenas-rejilla">
          <Antena lado="izq" />
          <ul className="antenas-lista" aria-label={etiqueta}>
            {items.map((c) => (
              <li key={c.nombre} className="antena-cliente">
                {c.logo ? (
                  // Logo entregado por la empresa; se muestra sin modificar.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.logo} alt={c.nombre} className="max-h-10 w-auto max-w-[9rem] object-contain" />
                ) : (
                  <span className="font-titulo text-base font-semibold leading-tight text-noche">{c.nombre}</span>
                )}
              </li>
            ))}
          </ul>
          <Antena lado="der" />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPausada((p) => !p)}
        aria-pressed={pausada}
        className="antenas-boton mt-3 inline-flex items-center gap-2 font-semibold text-azul hover:text-rojo-accion"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true" focusable="false">
          {pausada ? <path d="M7 5l12 7-12 7V5z" /> : <path d="M6 5h4v14H6zM14 5h4v14h-4z" />}
        </svg>
        {pausada ? reanudar : pausar}
      </button>
    </div>
  );
}
