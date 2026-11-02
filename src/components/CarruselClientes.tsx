"use client";

import { useState } from "react";

type Cliente = { nombre: string; logo: string | null };

/**
 * Carrusel de las empresas que confían en el laboratorio: avanza solo, se detiene al pasar el cursor o al
 * enfocarlo con el teclado, y tiene un botón para pausarlo. Con "reducir movimiento" activado no se anima:
 * queda quieto y se desplaza con el dedo o el mouse.
 */
export default function CarruselClientes({
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
  // Cada copia mide items × 14 rem; se repite lo necesario para cubrir pantallas muy anchas sin huecos.
  const copias = Math.max(3, Math.ceil(12 / items.length) + 1);
  const estilo = {
    "--duracion": `${items.length * 4}s`,
    "--desplaza": `-${100 / copias}%`,
  } as React.CSSProperties;

  return (
    <div>
      <div className="carrusel" data-pausada={pausada} role="region" aria-label={etiqueta} tabIndex={0}>
        <div className="carrusel-pista" style={estilo}>
          {Array.from({ length: copias }, (_, i) => (
            <ul key={i} className={"carrusel-lista" + (i > 0 ? " carrusel-copia" : "")} aria-hidden={i > 0 ? true : undefined}>
              {items.map((c) => (
                <li key={c.nombre} className="carrusel-item panel">
                  {c.logo ? (
                    // Logo entregado por la empresa; se muestra sin modificar.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={i === 0 ? c.nombre : ""} className="max-h-12 w-auto max-w-full object-contain" />
                  ) : (
                    <span className="font-titulo text-base font-semibold leading-tight text-noche">{c.nombre}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPausada((p) => !p)}
        aria-pressed={pausada}
        className="carrusel-boton mt-3 inline-flex items-center gap-2 font-semibold text-azul hover:text-rojo-accion"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true" focusable="false">
          {pausada ? <path d="M7 5l12 7-12 7V5z" /> : <path d="M6 5h4v14H6zM14 5h4v14h-4z" />}
        </svg>
        {pausada ? reanudar : pausar}
      </button>
    </div>
  );
}
