"use client";

import { useState } from "react";
import Rayo from "./Rayo";

// Medidas aproximadas para que el texto repetido siempre llene pantallas anchas sin dejar huecos.
const PX_POR_LETRA = 16;
const PX_SEPARADOR = 64;
const PX_ANCHO_MAX = 2600;
const PX_POR_SEGUNDO = 90;

/**
 * Pizarra electrónica: franja oscura con letras de puntos luminosos que se desplazan.
 * Se puede pausar, y con "reducir movimiento" el mensaje queda fijo y completo.
 * El texto es el mismo para lectores de pantalla (la animación es solo visual).
 */
export default function AvisoPizarra({
  texto,
  etiqueta,
  pausar,
  reanudar,
}: {
  texto: string;
  etiqueta: string;
  pausar: string;
  reanudar: string;
}) {
  const [pausada, setPausada] = useState(false);
  const anchoUnidad = texto.length * PX_POR_LETRA + PX_SEPARADOR;
  const repeticiones = Math.max(1, Math.ceil(PX_ANCHO_MAX / anchoUnidad));
  const duracion = Math.round((anchoUnidad * repeticiones) / PX_POR_SEGUNDO);
  const estilo = { "--duracion": `${duracion}s` } as React.CSSProperties;

  return (
    <section className="pizarra" aria-label={etiqueta} data-pausada={pausada}>
      <div className="contenedor flex items-center gap-3">
        <p className="sr-only">{texto}</p>
        <div className="pizarra-pantalla" aria-hidden="true">
          <div className="pizarra-pista" style={estilo}>
            {[0, 1].map((g) => (
              <div key={g} className={"pizarra-grupo" + (g > 0 ? " pizarra-copia" : "")}>
                {Array.from({ length: repeticiones }, (_, i) => (
                  <span key={i} className={"pizarra-texto" + (i > 0 ? " pizarra-repetido" : "")}>
                    {texto}
                    <Rayo className="pizarra-rayo" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPausada((p) => !p)}
          aria-pressed={pausada}
          aria-label={pausada ? reanudar : pausar}
          title={pausada ? reanudar : pausar}
          className="pizarra-boton flex h-11 w-11 flex-shrink-0 items-center justify-center text-white/80 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true" focusable="false">
            {pausada ? <path d="M7 5l12 7-12 7V5z" /> : <path d="M6 5h4v14H6zM14 5h4v14h-4z" />}
          </svg>
        </button>
      </div>
    </section>
  );
}
