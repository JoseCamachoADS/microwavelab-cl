"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fmt } from "@/i18n/config";

type Foto = { archivo: string; texto: string; categoria: string };
type Textos = {
  todas: string;
  filtro: string;
  ampliar: string;
  cerrar: string;
  anterior: string;
  siguiente: string;
  contador: string;
};

/** Cuadrícula de fotos con filtro por tipo de equipo y visor ampliado (ventana modal nativa: Esc cierra, el foco queda dentro). */
export default function GaleriaFotos({
  fotos,
  categorias,
  textos,
}: {
  fotos: Foto[];
  categorias: { id: string; nombre: string }[];
  textos: Textos;
}) {
  const [filtro, setFiltro] = useState("todas");
  const [abierta, setAbierta] = useState<number | null>(null);
  const visor = useRef<HTMLDialogElement>(null);
  const visibles = filtro === "todas" ? fotos : fotos.filter((f) => f.categoria === filtro);
  const usadas = categorias.filter((c) => fotos.some((f) => f.categoria === c.id));

  useEffect(() => {
    const d = visor.current;
    if (!d) return;
    if (abierta !== null && !d.open) d.showModal();
    if (abierta === null && d.open) d.close();
  }, [abierta]);

  const actual = abierta !== null ? visibles[abierta] : null;
  const mover = (paso: number) =>
    setAbierta((i) => (i === null ? null : (i + paso + visibles.length) % visibles.length));

  const chip = (activo: boolean) =>
    "min-h-11 px-4 py-2 font-titulo text-base font-semibold transition-colors " +
    (activo ? "bg-azul text-white" : "bg-azul-100 text-azul hover:bg-[#d3d5ee]");

  return (
    <div>
      {usadas.length > 1 && (
        <div role="group" aria-label={textos.filtro} className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={filtro === "todas"} onClick={() => setFiltro("todas")} className={chip(filtro === "todas")}>
            {textos.todas}
          </button>
          {usadas.map((c) => (
            <button key={c.id} type="button" aria-pressed={filtro === c.id} onClick={() => setFiltro(c.id)} className={chip(filtro === c.id)}>
              {c.nombre}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visibles.map((f, i) => (
          <li key={f.archivo}>
            <button
              type="button"
              onClick={() => setAbierta(i)}
              aria-label={fmt(textos.ampliar, { texto: f.texto })}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-hielo">
                <Image
                  src={f.archivo}
                  alt={f.texto}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-2 block border-l-4 border-rojo pl-3 text-base leading-snug text-tinta">{f.texto}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={visor}
        onClose={() => setAbierta(null)}
        onClick={(e) => {
          if (e.target === visor.current) setAbierta(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") mover(1);
          if (e.key === "ArrowLeft") mover(-1);
        }}
        aria-label={actual?.texto}
        className="m-auto w-[min(96vw,1100px)] max-w-none bg-noche p-0 text-white backdrop:bg-black/80"
      >
        {actual && (
          <div>
            <div className="relative h-[68dvh] bg-black">
              <Image src={actual.archivo} alt={actual.texto} fill sizes="96vw" className="object-contain" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="min-w-0 flex-1 text-base">
                {actual.texto}
                <span className="ml-3 text-white/70">{fmt(textos.contador, { n: (abierta ?? 0) + 1, total: visibles.length })}</span>
              </p>
              <div className="flex gap-2">
                {visibles.length > 1 && (
                  <>
                    <button type="button" onClick={() => mover(-1)} className="boton-claro">
                      {textos.anterior}
                    </button>
                    <button type="button" onClick={() => mover(1)} className="boton-claro">
                      {textos.siguiente}
                    </button>
                  </>
                )}
                <button type="button" onClick={() => setAbierta(null)} className="boton" autoFocus>
                  {textos.cerrar}
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
