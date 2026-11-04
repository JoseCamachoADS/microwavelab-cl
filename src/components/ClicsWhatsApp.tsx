"use client";

import { useEffect } from "react";

// Cuenta los clics en cualquier enlace de WhatsApp del sitio, y si se hicieron desde un móvil o un computador.
// Solo envía dos palabras (botón y dispositivo): ni IP, ni cookies, ni textos. No depende del aviso de cookies.
const ES_WHATSAPP = /^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|wa\.link)\//i;

function dispositivo(): "movil" | "escritorio" {
  const uad = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
  if (uad?.mobile === true) return "movil";
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua)) return "movil";
  // iPad con "sitio de escritorio" se presenta como Mac, pero tiene pantalla táctil.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "movil";
  return "escritorio";
}

export default function ClicsWhatsApp() {
  useEffect(() => {
    const enviar = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || !ES_WHATSAPP.test(a.getAttribute("href") ?? "")) return;
      const origen = a.closest("[data-clic]")?.getAttribute("data-clic") ?? "otro";
      const cuerpo = JSON.stringify({ origen, dispositivo: dispositivo() });
      try {
        const ok = navigator.sendBeacon?.("/api/clics", new Blob([cuerpo], { type: "application/json" }));
        if (!ok) throw new Error("beacon");
      } catch {
        void fetch("/api/clics", { method: "POST", headers: { "Content-Type": "application/json" }, body: cuerpo, keepalive: true }).catch(() => {});
      }
    };
    document.addEventListener("click", enviar, true);
    document.addEventListener("auxclick", enviar, true); // clic con la rueda del mouse
    return () => {
      document.removeEventListener("click", enviar, true);
      document.removeEventListener("auxclick", enviar, true);
    };
  }, []);
  return null;
}
