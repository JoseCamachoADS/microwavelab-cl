"use client";

import { useEffect, useRef } from "react";
import { IconoChat, IconoRayo, IconoTelefono } from "./Iconos";
import Rayo from "./Rayo";

type Textos = {
  aria: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  consultas: string;
  whatsapp: string;
  llamar: string;
  cerrar: string;
};

const CLAVE_VISTO = "urgencias-pausa-visto";

const franja = {
  backgroundImage: "repeating-linear-gradient(-45deg, #15173F 0 12px, #FFD60A 12px 24px)",
};

/**
 * Aviso amarillo de "urgencias en pausa": un botón flotante (en el lugar del botón de urgencias) que abre
 * un cuadro de diálogo. Si el administrador lo dejó así, se abre solo una vez por visita.
 */
export default function UrgenciasPausa({
  textos,
  abrirSolo,
  enlaceWhatsApp,
  enlaceTelefono,
}: {
  textos: Textos;
  abrirSolo: boolean;
  enlaceWhatsApp: string | null;
  enlaceTelefono: string | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  const abrir = () => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  };
  const cerrar = () => ref.current?.close();

  useEffect(() => {
    if (!abrirSolo) return;
    let visto = false;
    try {
      visto = sessionStorage.getItem(CLAVE_VISTO) === "1";
    } catch {
      /* sin almacenamiento: se abre una vez por carga */
    }
    if (visto) return;
    const t = window.setTimeout(() => {
      abrir();
      try {
        sessionStorage.setItem(CLAVE_VISTO, "1");
      } catch {
        /* nada */
      }
    }, 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abrirSolo]);

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        aria-label={textos.aria}
        aria-haspopup="dialog"
        className="fixed bottom-20 right-4 z-50 flex h-14 items-center gap-2 rounded-full border-2 border-noche bg-electrico px-5 font-titulo text-base font-semibold text-noche shadow-xl shadow-noche/40 transition hover:bg-white focus-visible:outline-offset-2"
      >
        <IconoRayo className="h-6 w-6" />
        <span className="hidden sm:inline">{textos.etiqueta}</span>
      </button>

      <dialog
        ref={ref}
        aria-labelledby="urgencias-pausa-titulo"
        onClick={(e) => {
          // Clic en el fondo oscuro (fuera del cuadro): cierra.
          if (e.target === e.currentTarget) cerrar();
        }}
        className="panel m-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden bg-electrico p-0 text-noche backdrop:bg-noche/70 [--c:28px]"
      >
        <div className="h-3 w-full" style={franja} aria-hidden="true" />
        <div className="relative p-6 sm:p-8">
          <Rayo className="pointer-events-none absolute -right-10 -top-6 h-52 w-52 text-noche/10" />
          <div className="relative">
            <IconoRayo className="h-9 w-9" />
            <h2 id="urgencias-pausa-titulo" className="mt-3 font-titulo text-2xl font-bold leading-tight sm:text-3xl">
              {textos.titulo}
            </h2>
            <p className="mt-3 text-lg font-semibold">{textos.texto}</p>
            <p className="mt-3 text-base">{textos.consultas}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {enlaceWhatsApp && (
                <a
                  href={enlaceWhatsApp}
                  data-clic="pausa-urgencias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-noche px-5 py-3 font-titulo text-base font-semibold text-white transition hover:bg-azul"
                >
                  <IconoChat className="h-5 w-5" />
                  {textos.whatsapp}
                </a>
              )}
              {enlaceTelefono && (
                <a
                  href={enlaceTelefono}
                  className="inline-flex items-center justify-center gap-2 border-2 border-noche px-5 py-3 font-titulo text-base font-semibold text-noche transition hover:bg-noche hover:text-white"
                >
                  <IconoTelefono className="h-5 w-5" />
                  {textos.llamar}
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={cerrar}
              className="mt-5 font-titulo text-base font-semibold underline underline-offset-4 hover:no-underline"
            >
              {textos.cerrar}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
