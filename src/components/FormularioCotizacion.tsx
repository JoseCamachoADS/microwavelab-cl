"use client";

import { useState } from "react";
import type { Diccionario } from "@/i18n/es";
import { IconoChat } from "./Iconos";

/** Formulario de cotización: arma el mensaje y abre WhatsApp. No guarda ni envía datos a ningún servidor. */
export default function FormularioCotizacion({
  textos,
  equipos,
  mensajeEnlace,
}: {
  textos: Diccionario["tecnico"]["formulario"];
  equipos: string[];
  /** Dirección de WhatsApp sin mensaje; se le agrega el texto armado. */
  mensajeEnlace: string;
}) {
  const [enviando, setEnviando] = useState(false);
  const t = textos;
  const campo =
    "mt-1 block w-full border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";
  const etiqueta = "block font-titulo text-base font-semibold text-noche";

  function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim().slice(0, 600);
    const lineas = [
      t.encabezado,
      "",
      `${t.nombre}: ${v("nombre")}`,
      v("empresa") && `${t.empresa}: ${v("empresa")}`,
      v("telefono") && `${t.telefono}: ${v("telefono")}`,
      v("correo") && `${t.correo}: ${v("correo")}`,
      v("area") && `${t.area}: ${v("area")}`,
      v("equipo") && `${t.equipo}: ${v("equipo")}`,
      v("marca") && `${t.marca}: ${v("marca")}`,
      `${t.falla}: ${v("falla")}`,
      v("urgencia") && `${t.urgencia}: ${v("urgencia")}`,
    ].filter(Boolean);
    setEnviando(true);
    try {
      window.gtag?.("event", "formulario_cotizacion_whatsapp");
    } catch {
      /* la medición es opcional */
    }
    window.open(`${mensajeEnlace}${encodeURIComponent(lineas.join("\n"))}`, "_blank", "noopener");
    setEnviando(false);
  }

  return (
    <form onSubmit={alEnviar} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-nombre" className={etiqueta}>
            {t.nombre}
          </label>
          <input id="f-nombre" name="nombre" required autoComplete="name" className={campo} />
        </div>
        <div>
          <label htmlFor="f-empresa" className={etiqueta}>
            {t.empresa} <span className="font-normal text-grisazul">{t.opcional}</span>
          </label>
          <input id="f-empresa" name="empresa" autoComplete="organization" className={campo} />
        </div>
        <div>
          <label htmlFor="f-telefono" className={etiqueta}>
            {t.telefono} <span className="font-normal text-grisazul">{t.opcional}</span>
          </label>
          <input id="f-telefono" name="telefono" type="tel" autoComplete="tel" className={campo} />
        </div>
        <div>
          <label htmlFor="f-correo" className={etiqueta}>
            {t.correo} <span className="font-normal text-grisazul">{t.opcional}</span>
          </label>
          <input id="f-correo" name="correo" type="email" autoComplete="email" className={campo} />
        </div>
        <div>
          <label htmlFor="f-area" className={etiqueta}>
            {t.area}
          </label>
          <select id="f-area" name="area" defaultValue={t.areas[0]} className={campo}>
            {t.areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-equipo" className={etiqueta}>
            {t.equipo} <span className="font-normal text-grisazul">{t.opcional}</span>
          </label>
          <select id="f-equipo" name="equipo" defaultValue="" className={campo}>
            <option value="">{t.seleccione}</option>
            {equipos.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="f-marca" className={etiqueta}>
          {t.marca} <span className="font-normal text-grisazul">{t.opcional}</span>
        </label>
        <input id="f-marca" name="marca" aria-describedby="f-marca-ayuda" className={campo} />
        <p id="f-marca-ayuda" className="mt-1 text-sm text-grisazul">
          {t.marcaAyuda}
        </p>
      </div>
      <div>
        <label htmlFor="f-falla" className={etiqueta}>
          {t.falla}
        </label>
        <textarea id="f-falla" name="falla" required rows={5} className={campo} />
      </div>
      <div>
        <label htmlFor="f-urgencia" className={etiqueta}>
          {t.urgencia}
        </label>
        <select id="f-urgencia" name="urgencia" defaultValue={t.urgencias[0]} className={campo}>
          {t.urgencias.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={enviando} className="boton w-full sm:w-auto">
        <IconoChat className="h-5 w-5" />
        {t.enviar}
      </button>
      <p className="text-sm text-grisazul">{t.nota}</p>
    </form>
  );
}
