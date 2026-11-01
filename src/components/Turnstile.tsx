"use client";

import { useEffect, useRef } from "react";
import type { Idioma } from "@/i18n/config";

// Captcha de Cloudflare Turnstile. Casi siempre se resuelve solo, sin puzzles.
// Es una herramienta de seguridad (no de medición): se carga solo en la página del formulario.
const CLAVE_SITIO = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Si no hay clave configurada, el formulario funciona sin captcha. */
export const turnstileDisponible = Boolean(CLAVE_SITIO);

type ApiTurnstile = {
  render: (el: HTMLElement, opciones: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: ApiTurnstile;
  }
}

function cargarScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((listo, fallo) => {
    let s = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
    if (!s) {
      s = document.createElement("script");
      s.src = SCRIPT;
      s.async = true;
      s.defer = true;
      s.dataset.turnstile = "1";
      document.head.appendChild(s);
    }
    s.addEventListener("load", () => listo());
    s.addEventListener("error", () => fallo(new Error("No se pudo cargar Turnstile")));
  });
}

export default function Turnstile({
  lang,
  onToken,
  onFallo,
  reinicio,
}: {
  lang: Idioma;
  /** Recibe el token cuando la verificación termina, o null si venció o falló. */
  onToken: (token: string | null) => void;
  onFallo: () => void;
  /** Cada vez que este número cambia, el widget se reinicia (el token es de un solo uso). */
  reinicio: number;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const idWidget = useRef<string | null>(null);
  const funciones = useRef<{ onToken: (t: string | null) => void; onFallo: () => void }>({ onToken, onFallo });

  useEffect(() => {
    funciones.current = { onToken, onFallo };
  });

  useEffect(() => {
    let cancelado = false;
    cargarScript()
      .then(() => {
        if (cancelado || !contenedor.current || !window.turnstile || !CLAVE_SITIO) return;
        idWidget.current = window.turnstile.render(contenedor.current, {
          sitekey: CLAVE_SITIO,
          language: lang === "ger" ? "de" : lang,
          theme: "light",
          // En pantallas angostas (menos de 420 px) el widget normal se desborda.
          size: window.innerWidth < 420 ? "compact" : "normal",
          callback: (token: string) => funciones.current.onToken(token),
          "expired-callback": () => funciones.current.onToken(null),
          "timeout-callback": () => funciones.current.onToken(null),
          "error-callback": () => {
            funciones.current.onToken(null);
            funciones.current.onFallo();
            return true;
          },
        });
      })
      .catch(() => {
        if (!cancelado) funciones.current.onFallo();
      });
    return () => {
      cancelado = true;
      if (idWidget.current && window.turnstile) window.turnstile.remove(idWidget.current);
      idWidget.current = null;
    };
  }, [lang]);

  useEffect(() => {
    if (reinicio > 0 && idWidget.current && window.turnstile) window.turnstile.reset(idWidget.current);
  }, [reinicio]);

  return <div ref={contenedor} />;
}
