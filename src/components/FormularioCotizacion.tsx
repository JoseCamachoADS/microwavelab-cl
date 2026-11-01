"use client";

import { useState } from "react";
import { fmt, type Idioma } from "@/i18n/config";
import type { Diccionario } from "@/i18n/es";
import { IconoChat } from "./Iconos";

type Textos = Diccionario["tecnico"]["formulario"];

/** Línea en blanco dentro del mensaje (una línea vacía real se perdería al filtrar los campos opcionales). */
const BLANCO = " ";

/**
 * Formulario de cotización. Arma un mensaje SIEMPRE en español para WhatsApp (quien lo recibe habla español):
 * los campos de elección salen en español y, si el cliente escribió en inglés o alemán, el texto de la falla
 * se traduce y se agrega el original debajo. No guarda nada: el mensaje va directo a WhatsApp.
 */
export default function FormularioCotizacion({
  lang,
  textos,
  textosEs,
  equipos,
  equiposEs,
  idiomaEs,
  mensajeEnlace,
}: {
  lang: Idioma;
  textos: Textos;
  /** Los mismos textos en español: etiquetas del mensaje que recibe el laboratorio. */
  textosEs: Textos;
  equipos: string[];
  equiposEs: string[];
  /** Nombre del idioma del cliente, en español ("inglés", "alemán"). */
  idiomaEs: string;
  /** Dirección de WhatsApp lista para agregarle el texto. */
  mensajeEnlace: string;
}) {
  const [fase, setFase] = useState<"editar" | "traduciendo" | "revisar">("editar");
  const [mensaje, setMensaje] = useState("");
  const t = textos;
  const e = textosEs;
  const campo =
    "mt-1 block w-full border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";
  const etiqueta = "block font-titulo text-base font-semibold text-noche";

  function medir() {
    try {
      window.gtag?.("event", "formulario_cotizacion_whatsapp", { idioma: lang });
    } catch {
      /* la medición es opcional */
    }
  }

  async function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim().slice(0, 600);
    const elegida = (k: string, lista: string[]) => {
      const i = Number(f.get(k));
      return Number.isInteger(i) && lista[i] ? lista[i] : "";
    };
    const falla = v("falla");
    const esEspanol = lang === "es";

    setFase("traduciendo");
    let traducida: string | null = null;
    if (!esEspanol) {
      try {
        const r = await fetch("/api/traducir", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: falla, idioma: lang }),
        });
        if (r.ok) traducida = ((await r.json()) as { traduccion: string | null }).traduccion;
      } catch {
        /* sin traducción: se envía solo el original */
      }
    }

    const area = elegida("area", e.areas);
    const equipo = elegida("equipo", equiposEs);
    const urgencia = elegida("urgencia", e.urgencias);
    const lineas = [
      e.encabezado,
      !esEspanol && `${e.idiomaCliente}: ${idiomaEs}`,
      BLANCO,
      `${e.nombre}: ${v("nombre")}`,
      v("empresa") && `${e.empresa}: ${v("empresa")}`,
      v("telefono") && `${e.telefono}: ${v("telefono")}`,
      v("correo") && `${e.correo}: ${v("correo")}`,
      area && `${e.area}: ${area}`,
      equipo && `${e.equipo}: ${equipo}`,
      v("marca") && `${e.marca}: ${v("marca")}`,
      traducida
        ? `${e.falla}: ${traducida}`
        : esEspanol
          ? `${e.falla}: ${falla}`
          : `${e.falla} (${fmt(e.sinTraducir, { idioma: idiomaEs })}): ${falla}`,
      urgencia && `${e.urgencia}: ${urgencia}`,
      traducida && BLANCO,
      traducida && `${fmt(e.textoOriginal, { idioma: idiomaEs })}:`,
      traducida && falla,
    ].filter((x): x is string => typeof x === "string" && x !== "");
    const texto = lineas.join("\n");
    medir();

    if (esEspanol) {
      // Español: se abre WhatsApp directamente.
      window.open(`${mensajeEnlace}${encodeURIComponent(texto)}`, "_blank", "noopener");
      setFase("editar");
    } else {
      // Otros idiomas: el cliente revisa el mensaje y lo abre con un toque (así el navegador no bloquea la ventana).
      setMensaje(texto);
      setFase("revisar");
    }
  }

  return (
    <div>
      <form onSubmit={alEnviar} className={"space-y-5 " + (fase === "revisar" ? "hidden" : "")}>
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
            <select id="f-area" name="area" defaultValue="0" className={campo}>
              {t.areas.map((a, i) => (
                <option key={a} value={i}>
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
              {equipos.map((q, i) => (
                <option key={q} value={i}>
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
          <textarea id="f-falla" name="falla" required rows={5} maxLength={600} className={campo} />
        </div>
        <div>
          <label htmlFor="f-urgencia" className={etiqueta}>
            {t.urgencia}
          </label>
          <select id="f-urgencia" name="urgencia" defaultValue="0" className={campo}>
            {t.urgencias.map((u, i) => (
              <option key={u} value={i}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={fase === "traduciendo"} className="boton w-full sm:w-auto">
          <IconoChat className="h-5 w-5" />
          {fase === "traduciendo" ? t.traduciendo : t.enviar}
        </button>
        <p className="text-sm text-grisazul" aria-live="polite">
          {t.nota}
        </p>
      </form>

      {fase === "revisar" && (
        <div className="space-y-5">
          <h3 className="font-titulo text-xl font-bold text-noche">{t.revisarTitulo}</h3>
          <p className="text-grisazul">{t.revisarTexto}</p>
          <pre className="panel whitespace-pre-wrap break-words bg-hielo p-5 font-sans text-base text-tinta [--c:16px]">
            {mensaje}
          </pre>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`${mensajeEnlace}${encodeURIComponent(mensaje)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="boton"
            >
              <IconoChat className="h-5 w-5" />
              {t.abrir}
            </a>
            <button type="button" onClick={() => setFase("editar")} className="boton-suave">
              {t.editar}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
