"use client";

import { useState } from "react";

type Textos = { cargar: string; aviso: string; abrir: string; titulo: string };

/**
 * Publicaciones de LinkedIn incrustadas con el recuadro oficial. LinkedIn solo se carga cuando la persona
 * pulsa el botón (así no recibe datos de quien solo visita la página).
 */
export default function PublicacionesLinkedIn({
  items,
  textos,
}: {
  items: { urn: string; alto: number }[];
  textos: Textos;
}) {
  const [cargadas, setCargadas] = useState<Record<string, boolean>>({});

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((p, i) => (
        <li key={p.urn} className="panel bg-hielo p-4 [--c:20px]">
          {cargadas[p.urn] ? (
            <iframe
              src={`https://www.linkedin.com/embed/feed/update/${p.urn}`}
              title={`${textos.titulo} ${i + 1}`}
              height={p.alto}
              loading="lazy"
              allowFullScreen
              className="block w-full bg-white"
            />
          ) : (
            <div className="flex flex-col items-start gap-4 p-2" style={{ minHeight: "12rem" }}>
              <p className="text-base text-grisazul">{textos.aviso}</p>
              <button type="button" onClick={() => setCargadas((c) => ({ ...c, [p.urn]: true }))} className="boton-azul">
                {textos.cargar}
              </button>
            </div>
          )}
          <p className="mt-3">
            <a href={`https://www.linkedin.com/feed/update/${p.urn}`} target="_blank" rel="noopener noreferrer" className="enlace">
              {textos.abrir}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}
