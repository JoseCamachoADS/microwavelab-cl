"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Mientras el total sea menor a este número, el contador no se muestra (0 = siempre visible)
// (un "7 visitas" restaría más de lo que suma). Se puede bajar a 0 para verlo desde el inicio.
const UMBRAL_MOSTRAR = 0;
const CLAVE_SESION = "visita-contada";
const MIN_DIGITOS = 5;
const RUTAS_PRIVADAS = ["/portal", "/panel"];

export default function ContadorVisitas() {
  const ruta = usePathname();
  const [total, setTotal] = useState<number | null>(null);
  const privada = RUTAS_PRIVADAS.some((r) => ruta === r || ruta.startsWith(`${r}/`));

  useEffect(() => {
    if (privada) return;
    let yaContada = false;
    try {
      yaContada = sessionStorage.getItem(CLAVE_SESION) === "1";
    } catch {
      /* sin almacenamiento: se cuenta de todos modos una vez por carga */
    }
    fetch("/api/visitas", { method: yaContada ? "GET" : "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { total: number | null } | null) => {
        if (d && typeof d.total === "number") {
          setTotal(d.total);
          try {
            sessionStorage.setItem(CLAVE_SESION, "1");
          } catch {
            /* se ignora */
          }
        }
      })
      .catch(() => {});
  }, [privada]);

  if (privada || total === null || total < UMBRAL_MOSTRAR) return null;

  const texto = String(total).padStart(MIN_DIGITOS, "0");
  const legible = total.toLocaleString("es-CL");

  return (
    <div className="flex items-center gap-3" role="img" aria-label={`${legible} visitas al sitio`}>
      <span className="text-sm text-white/70">Visitas al sitio</span>
      <span className="flex gap-1" aria-hidden="true">
        {texto.split("").map((d, i) => (
          <span
            key={i}
            className="flex h-9 w-7 items-center justify-center border-b-2 border-rojo bg-white/10 font-titulo text-lg font-bold tabular-nums text-white [clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,0_100%)]"
          >
            {d}
          </span>
        ))}
      </span>
    </div>
  );
}
