"use client";

import { useEffect, useRef, useState } from "react";
import type { Idioma } from "@/i18n/config";
import { IconoAsistente } from "./Iconos";
import Turnstile, { turnstileDisponible } from "./Turnstile";

type Textos = {
  boton: string;
  abrir: string;
  titulo: string;
  cerrar: string;
  placeholder: string;
  enviar: string;
  escribiendo: string;
  aviso: string;
  sugerencias: string[];
  captcha: string;
  captchaFallo: string;
  error: string;
  tope: string;
  limite: string;
  whatsapp: string;
};
type Mensaje = { rol: "usuario" | "asistente"; texto: string };

/**
 * Asistente virtual: botón discreto que se abre solo cuando la persona lo pide.
 * El captcha se resuelve una vez por conversación; las respuestas las genera el servidor (Gemini).
 */
export default function AsistenteChat({
  lang,
  textos: t,
  saludo,
  enlaceWhatsApp,
}: {
  lang: Idioma;
  textos: Textos;
  saludo: string;
  enlaceWhatsApp: string | null;
}) {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<"" | "error" | "tope" | "limite" | "captcha">("");
  const [token, setToken] = useState<string | null>(null);
  const [sesion, setSesion] = useState<string | null>(null);
  const [captchaFallo, setCaptchaFallo] = useState(false);
  const [reinicio, setReinicio] = useState(0);
  const campo = useRef<HTMLTextAreaElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const fin = useRef<HTMLDivElement>(null);
  const primeraVez = useRef(true);

  const necesitaCaptcha = turnstileDisponible && !sesion;
  const puedeEnviar = !enviando && entrada.trim().length > 0 && (!necesitaCaptcha || Boolean(token));

  useEffect(() => {
    if (abierto) campo.current?.focus();
    else if (!primeraVez.current) boton.current?.focus();
    primeraVez.current = false;
  }, [abierto]);

  useEffect(() => {
    fin.current?.scrollIntoView({ block: "end" });
  }, [mensajes, enviando, aviso]);

  async function enviar(texto: string) {
    const limpio = texto.trim();
    if (!limpio || enviando || (necesitaCaptcha && !token)) return;
    const conversacion: Mensaje[] = [...mensajes, { rol: "usuario", texto: limpio }];
    setMensajes(conversacion);
    setEntrada("");
    setAviso("");
    setEnviando(true);
    try {
      const r = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: conversacion, idioma: lang, ...(sesion ? { sesion } : { token }) }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; texto?: string; sesion?: string; motivo?: string };
      // El servidor entrega la sesión apenas el captcha pasa, incluso si después la respuesta falla.
      if (d.sesion) setSesion(d.sesion);
      if (r.ok && d.ok && d.texto) {
        setMensajes([...conversacion, { rol: "asistente", texto: d.texto }]);
      } else {
        if (d.motivo === "captcha") {
          setSesion(null);
          setToken(null);
          setReinicio((n) => n + 1);
        }
        setAviso(d.motivo === "tope" || d.motivo === "apagado" ? "tope" : d.motivo === "limite" ? "limite" : d.motivo === "captcha" ? "captcha" : "error");
      }
    } catch {
      setAviso("error");
    } finally {
      // El token de Turnstile es de un solo uso: ya se canjeó por la sesión (o falló).
      setToken(null);
      setEnviando(false);
    }
  }

  const mostrarAviso = aviso ? { error: t.error, tope: t.tope, limite: t.limite, captcha: t.captchaFallo }[aviso] : "";

  return (
    <>
      {!abierto && (
        <button
          ref={boton}
          type="button"
          onClick={() => setAbierto(true)}
          aria-label={t.abrir}
          aria-expanded={false}
          aria-controls="asistente-panel"
          className="fixed bottom-4 left-4 z-50 flex h-14 items-center gap-2 rounded-full bg-azul px-5 font-titulo text-base font-semibold text-white shadow-xl shadow-noche/30 transition hover:bg-noche"
        >
          <IconoAsistente className="h-6 w-6" />
          <span className="hidden sm:inline">{t.boton}</span>
        </button>
      )}

      {abierto && (
        <section
          id="asistente-panel"
          role="dialog"
          aria-labelledby="asistente-titulo"
          onKeyDown={(e) => {
            if (e.key === "Escape") setAbierto(false);
          }}
          className="fixed bottom-4 left-4 right-4 z-50 flex h-[min(34rem,calc(100dvh-2rem))] flex-col overflow-hidden border border-noche/30 bg-white shadow-2xl shadow-noche/40 sm:right-auto sm:w-96"
        >
          <header className="flex items-center justify-between gap-3 bg-noche px-4 py-3 text-white">
            <h2 id="asistente-titulo" className="flex items-center gap-2 font-titulo text-lg font-semibold">
              <IconoAsistente className="h-5 w-5 text-peri" />
              {t.titulo}
            </h2>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label={t.cerrar}
              className="flex h-10 w-10 items-center justify-center text-2xl leading-none hover:bg-white/10"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-hielo/50 px-4 py-4 text-base" role="log" aria-live="polite">
            <p className="max-w-[90%] bg-hielo px-3 py-2 text-tinta">{saludo}</p>
            {mensajes.length === 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {t.sugerencias.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => void enviar(s)}
                      disabled={necesitaCaptcha && !token}
                      className="border border-azul px-3 py-1.5 text-left text-sm text-azul hover:bg-azul hover:text-white disabled:opacity-50"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {mensajes.map((m, i) => (
              <p
                key={i}
                className={
                  m.rol === "usuario"
                    ? "ml-auto max-w-[90%] whitespace-pre-line bg-azul px-3 py-2 text-white"
                    : "max-w-[90%] whitespace-pre-line bg-hielo px-3 py-2 text-tinta"
                }
              >
                {m.texto}
              </p>
            ))}
            {enviando && (
              <p className="max-w-[90%] bg-hielo px-3 py-2 text-grisazul motion-safe:animate-pulse">{t.escribiendo}</p>
            )}
            {mostrarAviso && (
              <div role="alert" className="border-l-4 border-rojo bg-white px-3 py-2 text-noche">
                <p>{mostrarAviso}</p>
                {(aviso === "tope" || aviso === "error") && enlaceWhatsApp && (
                  <a href={enlaceWhatsApp} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-azul underline">
                    {t.whatsapp}
                  </a>
                )}
              </div>
            )}
            <div ref={fin} />
          </div>

          <div className="border-t border-grisazul/20 bg-white p-3">
            {necesitaCaptcha && (
              <div className="mb-2">
                <Turnstile lang={lang} onToken={setToken} onFallo={() => setCaptchaFallo(true)} reinicio={reinicio} />
                {!token && !captchaFallo && <p className="text-xs text-grisazul">{t.captcha}</p>}
                {captchaFallo && <p className="text-xs text-rojo">{t.captchaFallo}</p>}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (puedeEnviar) void enviar(entrada);
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="asistente-texto" className="sr-only">
                {t.placeholder}
              </label>
              <textarea
                id="asistente-texto"
                ref={campo}
                rows={2}
                maxLength={600}
                value={entrada}
                placeholder={t.placeholder}
                onChange={(e) => setEntrada(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (puedeEnviar) void enviar(entrada);
                  }
                }}
                className="min-h-[3rem] flex-1 resize-none border border-grisazul/40 px-3 py-2 text-base text-tinta focus:border-azul"
              />
              <button type="submit" disabled={!puedeEnviar} className="boton !min-h-[3rem] !px-4 disabled:opacity-50">
                {t.enviar}
              </button>
            </form>
            <p className="mt-2 text-xs text-grisazul">{t.aviso}</p>
          </div>
        </section>
      )}
    </>
  );
}
