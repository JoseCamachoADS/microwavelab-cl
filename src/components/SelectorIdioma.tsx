"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ruta, separarIdioma, type Idioma } from "@/i18n/config";
import Bandera from "./Banderas";
import { IconoCheck } from "./Iconos";

type Opcion = {
  lang: Idioma;
  corto: string;
  /** Nombre del idioma escrito en ese mismo idioma (Español, English, Deutsch). */
  nombre: string;
  htmlLang: string;
  /** Texto para lectores de pantalla, por ejemplo "Switch to Deutsch". */
  etiqueta: string;
};

/** Selector de idioma desplegable, con bandera y nombre. Lleva a la misma página en el otro idioma. */
export default function SelectorIdioma({
  actual,
  opciones,
  nombre,
  claro = false,
  arriba = false,
  izquierda = false,
}: {
  actual: Idioma;
  opciones: Opcion[];
  nombre: string;
  /** Botón con texto claro, para fondos oscuros. */
  claro?: boolean;
  /** Abre la lista hacia arriba (útil en el pie de página). */
  arriba?: boolean;
  /** Alinea la lista al borde izquierdo del botón (por defecto, al derecho). */
  izquierda?: boolean;
}) {
  const direccion = usePathname() ?? "/";
  const { camino } = separarIdioma(direccion);
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const actualOpcion = opciones.find((o) => o.lang === actual) ?? opciones[0];

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent | TouchEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("mousedown", fuera);
    document.addEventListener("touchstart", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fuera);
      document.removeEventListener("touchstart", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  return (
    <div ref={contenedor} className="relative">
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-haspopup="true"
        aria-label={`${nombre}: ${actualOpcion.nombre}`}
        className={
          "flex h-11 items-center gap-2 border px-3 font-titulo text-sm font-semibold transition-colors " +
          (claro
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-azul-100 text-noche hover:border-azul")
        }
      >
        <Bandera lang={actual} className="h-4 w-6 flex-shrink-0 border border-black/10" />
        <span>{actualOpcion.corto}</span>
        <svg
          viewBox="0 0 20 20"
          className={"h-4 w-4 transition-transform " + (abierto ? "rotate-180" : "")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {abierto && (
        <ul
          className={
            (izquierda ? "left-0 " : "right-0 ") +
            "absolute z-50 w-48 border border-azul-100 bg-white py-1 text-noche shadow-xl " +
            (arriba ? "bottom-full mb-2" : "top-full mt-2")
          }
        >
          {opciones.map((o) => {
            const activo = o.lang === actual;
            return (
              <li key={o.lang}>
                <Link
                  href={ruta(o.lang, camino)}
                  hrefLang={o.htmlLang}
                  lang={o.htmlLang}
                  aria-label={o.etiqueta}
                  aria-current={activo ? "true" : undefined}
                  onClick={() => setAbierto(false)}
                  className={
                    "flex min-h-[2.75rem] items-center gap-3 px-4 py-2 font-titulo text-base font-semibold hover:bg-hielo " +
                    (activo ? "bg-hielo" : "")
                  }
                >
                  <Bandera lang={o.lang} className="h-4 w-6 flex-shrink-0 border border-black/10" />
                  <span className="flex-1">{o.nombre}</span>
                  {activo && <IconoCheck className="h-4 w-4 text-rojo-accion" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
