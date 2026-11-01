"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconoCerrar, IconoMenu } from "./Iconos";

type Enlace = { href: string; texto: string };

/** Menú desplegable para celular. Se cierra con Escape o al elegir una opción. */
export default function MenuMovil({
  enlaces,
  portal,
  textos,
  principal,
  children,
}: {
  enlaces: Enlace[];
  portal: Enlace;
  textos: { abrir: string; cerrar: string };
  principal: string;
  /** Contenido extra al final del menú (selector de idioma). */
  children?: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("keydown", alTecla);
    return () => document.removeEventListener("keydown", alTecla);
  }, [abierto]);

  return (
    <div className="md:hidden">
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        className="flex h-12 w-12 items-center justify-center text-noche"
      >
        <span className="sr-only">{abierto ? textos.cerrar : textos.abrir}</span>
        {abierto ? <IconoCerrar className="h-7 w-7" /> : <IconoMenu className="h-7 w-7" />}
      </button>
      {abierto && (
        <div
          id="menu-movil"
          className="absolute inset-x-0 top-full border-t border-azul-100 bg-white shadow-xl"
        >
          <nav aria-label={principal} className="contenedor py-2">
            <ul>
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    onClick={() => setAbierto(false)}
                    className="block border-b border-azul-100 py-4 font-titulo text-lg font-semibold text-noche"
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <Link href={portal.href} onClick={() => setAbierto(false)} className="boton w-full">
                  {portal.texto}
                </Link>
              </li>
            </ul>
          </nav>
          {children && <div className="contenedor pb-5">{children}</div>}
        </div>
      )}
    </div>
  );
}
