"use client";

import { useEffect, useState } from "react";
import type { Idioma } from "@/i18n/config";
import type { CategoriaClima } from "@/lib/clima";
import IconoClima from "./IconoClima";

type Textos = { etiqueta: string; santiago: string } & Record<CategoriaClima, string>;
type Clima = { temp: number; categoria: CategoriaClima; noche: boolean };

const ZONA = "America/Santiago";
const IDIOMA_FECHA: Record<Idioma, string> = { es: "es-CL", en: "en-GB", ger: "de-DE" };

/**
 * Fecha y hora de Santiago (se actualizan solas) y clima actual con un ícono que cambia según el tiempo.
 * Clima: MET Norway, consultado por nuestro servidor cada 15 minutos.
 */
export default function RelojClima({ lang, textos }: { lang: Idioma; textos: Textos }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [clima, setClima] = useState<Clima | null>(null);

  useEffect(() => {
    const locale = IDIOMA_FECHA[lang];
    const formatoFecha = new Intl.DateTimeFormat(locale, { timeZone: ZONA, weekday: "short", day: "numeric", month: "short" });
    const formatoHora = new Intl.DateTimeFormat(locale, { timeZone: ZONA, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const tic = () => {
      const ahora = new Date();
      setFecha(formatoFecha.format(ahora).replace(/\./g, ""));
      setHora(formatoHora.format(ahora));
    };
    tic();
    const reloj = setInterval(tic, 5000);
    return () => clearInterval(reloj);
  }, [lang]);

  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      try {
        const r = await fetch("/api/clima");
        if (!r.ok) return;
        const d = (await r.json()) as { ok: boolean } & Partial<Clima>;
        if (!cancelado && d.ok && typeof d.temp === "number" && d.categoria) {
          setClima({ temp: d.temp, categoria: d.categoria, noche: d.noche === true });
        }
      } catch {
        /* sin clima: se muestra solo la fecha y la hora */
      }
    }
    void cargar();
    const intervalo = setInterval(cargar, 10 * 60 * 1000);
    return () => {
      cancelado = true;
      clearInterval(intervalo);
    };
  }, []);

  const descripcion = clima ? textos[clima.categoria] : "";
  return (
    <p
      className="flex min-h-5 items-center gap-2 whitespace-nowrap"
      aria-label={hora ? `${textos.santiago}: ${fecha}, ${hora}${clima ? `, ${clima.temp} °C, ${descripcion}` : ""}` : undefined}
    >
      <span className="hidden sm:inline text-white/60">{textos.santiago}</span>
      {hora ? (
        <>
          <span aria-hidden="true" className="capitalize">{fecha}</span>
          <span aria-hidden="true" className="font-semibold tabular-nums text-white">{hora}</span>
        </>
      ) : (
        <span aria-hidden="true" className="invisible">dom 00 nov 00:00</span>
      )}
      {clima && (
        <span className="flex items-center gap-1.5" title={`${textos.etiqueta}: ${descripcion}`}>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-peri motion-safe:animate-pulse" />
          <IconoClima categoria={clima.categoria} noche={clima.noche} className="h-5 w-5 text-peri" />
          <span aria-hidden="true" className="font-semibold tabular-nums text-white">{clima.temp} °C</span>
        </span>
      )}
    </p>
  );
}
