"use client";

import { useEffect, useRef, useState } from "react";

type Textos = {
  aria: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  menos: string;
  normal: string;
  mas: string;
  contraste: string;
  enlaces: string;
  fuente: string;
  quieto: string;
  restablecer: string;
  cerrar: string;
  nota: string;
};

type Prefs = { texto: 0 | 1 | 2 | 3; contraste: boolean; enlaces: boolean; fuente: boolean; quieto: boolean };

const CLAVE = "a11y";
const PREDETERMINADO: Prefs = { texto: 0, contraste: false, enlaces: false, fuente: false, quieto: false };

/** Pone o quita los atributos de <html> que activan los estilos de accesibilidad (ver globals.css). */
function aplicar(p: Prefs) {
  const h = document.documentElement;
  if (p.texto > 0) h.setAttribute("data-a11y-texto", String(p.texto));
  else h.removeAttribute("data-a11y-texto");
  for (const [k, v] of [["contraste", p.contraste], ["enlaces", p.enlaces], ["fuente", p.fuente], ["quieto", p.quieto]] as const) {
    if (v) h.setAttribute(`data-a11y-${k}`, "1");
    else h.removeAttribute(`data-a11y-${k}`);
  }
}

/** Lee el estado actual desde <html>: lo dejó el guion inicial (preferencia guardada o preferencias del sistema). */
function leer(): Prefs {
  const h = document.documentElement;
  const t = Number(h.getAttribute("data-a11y-texto") ?? 0);
  return {
    texto: (t >= 1 && t <= 3 ? t : 0) as Prefs["texto"],
    contraste: h.hasAttribute("data-a11y-contraste"),
    enlaces: h.hasAttribute("data-a11y-enlaces"),
    fuente: h.hasAttribute("data-a11y-fuente"),
    quieto: h.hasAttribute("data-a11y-quieto"),
  };
}

function IconoAcceso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M8.5 21l3.5-6.5 3.5 6.5" />
    </svg>
  );
}

export default function BarraAccesibilidad({ textos }: { textos: Textos }) {
  const [abierta, setAbierta] = useState(false);
  const [p, setP] = useState<Prefs>(PREDETERMINADO);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setP(leer());
  }, []);

  useEffect(() => {
    if (!abierta) return;
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierta(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("keydown", alTecla);
    return () => document.removeEventListener("keydown", alTecla);
  }, [abierta]);

  function cambiar(nuevo: Prefs) {
    setP(nuevo);
    aplicar(nuevo);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(nuevo));
    } catch {
      /* sin almacenamiento: el cambio vale solo en esta visita */
    }
  }

  const interruptor = (clave: "contraste" | "enlaces" | "fuente" | "quieto", etiqueta: string) => (
    <button
      type="button"
      aria-pressed={p[clave]}
      onClick={() => cambiar({ ...p, [clave]: !p[clave] })}
      className={
        "flex min-h-11 w-full items-center justify-between gap-3 border-2 px-3 py-2 text-left font-titulo text-base font-semibold " +
        (p[clave] ? "border-noche bg-noche text-white" : "border-grisazul/40 bg-white text-noche")
      }
    >
      <span>{etiqueta}</span>
      <span aria-hidden="true" className="text-sm">{p[clave] ? "ON" : "OFF"}</span>
    </button>
  );

  const paso = "flex min-h-11 flex-1 items-center justify-center border-2 border-grisazul/40 bg-white px-3 font-titulo font-semibold text-noche disabled:opacity-40";

  return (
    <>
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        aria-controls="barra-accesibilidad"
        aria-label={textos.aria}
        className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-noche text-white shadow-xl shadow-noche/40 transition hover:bg-azul"
      >
        <IconoAcceso className="h-7 w-7" />
      </button>

      {abierta && (
        <div
          id="barra-accesibilidad"
          role="dialog"
          aria-label={textos.titulo}
          className="fixed bottom-20 left-4 z-50 w-[calc(100vw-2rem)] max-w-xs border-2 border-noche bg-white p-4 text-noche shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-titulo text-lg font-bold">{textos.titulo}</h2>
            <button
              type="button"
              onClick={() => {
                setAbierta(false);
                boton.current?.focus();
              }}
              className="flex h-11 min-w-11 items-center justify-center px-2 font-titulo font-semibold underline"
            >
              {textos.cerrar}
            </button>
          </div>

          <p className="mt-3 font-titulo text-base font-semibold">{textos.texto}</p>
          <div className="mt-1 flex gap-2" role="group" aria-label={textos.texto}>
            <button type="button" className={paso} onClick={() => cambiar({ ...p, texto: Math.max(0, p.texto - 1) as Prefs["texto"] })} aria-label={textos.menos}>
              A−
            </button>
            <button type="button" className={paso} onClick={() => cambiar({ ...p, texto: 0 })} aria-label={textos.normal} aria-pressed={p.texto === 0}>
              A
            </button>
            <button type="button" className={paso} onClick={() => cambiar({ ...p, texto: Math.min(3, p.texto + 1) as Prefs["texto"] })} aria-label={textos.mas}>
              A+
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {interruptor("contraste", textos.contraste)}
            {interruptor("enlaces", textos.enlaces)}
            {interruptor("fuente", textos.fuente)}
            {interruptor("quieto", textos.quieto)}
          </div>

          <button
            type="button"
            onClick={() => cambiar(PREDETERMINADO)}
            className="mt-3 flex min-h-11 w-full items-center justify-center bg-azul-100 px-3 font-titulo font-semibold text-azul"
          >
            {textos.restablecer}
          </button>
          <p className="mt-3 text-sm text-grisazul">{textos.nota}</p>
        </div>
      )}
    </>
  );
}
