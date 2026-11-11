"use client";

import { useCallback, useEffect, useState } from "react";

type Modo = "activo" | "pausa" | "apagado";
type Botones = { whatsapp: boolean; urgencias: Modo; hasta: string; abrirSolo: boolean; actualizado?: string };

// La misma clave de sesión que /uso: si ya entró allí, aquí no la pide de nuevo.
const CLAVE_SESION = "uso-api-clave";

const MODOS: { valor: Modo; titulo: string; detalle: string }[] = [
  { valor: "activo", titulo: "Botón de urgencias (rayo rojo)", detalle: "Se atienden urgencias: el rayo rojo abre WhatsApp con el mensaje de urgencia." },
  { valor: "pausa", titulo: "Urgencias en pausa (aviso amarillo)", detalle: "Rayo amarillo con un aviso: no se atienden urgencias hasta la fecha indicada; las consultas siguen por WhatsApp y teléfono." },
  { valor: "apagado", titulo: "Sin botón de urgencias", detalle: "No se muestra ningún botón de urgencias ni aviso." },
];

export default function PanelBotones() {
  const [clave, setClave] = useState("");
  const [b, setB] = useState<Botones | null>(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const entrar = useCallback(async (valor: string) => {
    setCargando(true);
    setError("");
    try {
      const r = await fetch("/api/botones", { headers: { Authorization: `Bearer ${valor}` }, cache: "no-store" });
      if (r.status === 401) throw new Error("La clave no es correcta.");
      if (r.status === 503) throw new Error("Falta configurar USO_API_TOKEN en Vercel (mínimo 16 caracteres).");
      if (!r.ok) throw new Error("No se pudo consultar. Intente de nuevo.");
      setB((await r.json()) as Botones);
      try {
        sessionStorage.setItem(CLAVE_SESION, valor);
      } catch {
        /* nada */
      }
    } catch (e) {
      setB(null);
      setError(e instanceof Error ? e.message : "No se pudo consultar.");
      try {
        sessionStorage.removeItem(CLAVE_SESION);
      } catch {
        /* nada */
      }
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    try {
      const guardada = sessionStorage.getItem(CLAVE_SESION);
      if (guardada) {
        setClave(guardada);
        void entrar(guardada);
      }
    } catch {
      /* nada */
    }
  }, [entrar]);

  async function guardar() {
    if (!b) return;
    setGuardando(true);
    setError("");
    setMensaje("");
    try {
      const r = await fetch("/api/botones", {
        method: "PUT",
        headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
        body: JSON.stringify(b),
      });
      if (r.status === 400) throw new Error("Indique la fecha hasta la que no se atienden urgencias.");
      if (r.status === 503) throw new Error("No se pudo guardar: falta conectar Redis (Upstash) en Vercel.");
      if (!r.ok) throw new Error("No se pudo guardar. Intente de nuevo.");
      setB((await r.json()) as Botones);
      setMensaje("Guardado. El sitio se actualiza de inmediato.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  const campo = "mt-1 block border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";
  const etiqueta = "block font-titulo text-base font-semibold text-noche";

  if (!b) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void entrar(clave.trim());
        }}
        className="panel max-w-md space-y-4 bg-hielo p-6"
      >
        <label htmlFor="clave-botones" className={etiqueta}>
          Clave de acceso
        </label>
        <input id="clave-botones" type="password" autoComplete="off" value={clave} onChange={(e) => setClave(e.target.value)} className={campo + " w-full"} required />
        <p className="text-sm text-grisazul">Es el valor de USO_API_TOKEN que dejó en Vercel (la misma de /uso).</p>
        {error && (
          <p role="alert" className="border-l-4 border-rojo bg-white px-4 py-3 font-semibold text-noche">
            {error}
          </p>
        )}
        <button type="submit" disabled={cargando} className="boton w-full sm:w-auto">
          {cargando ? "Consultando..." : "Entrar"}
        </button>
      </form>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="panel bg-hielo p-6 [--c:20px]">
        <label className="flex cursor-pointer items-center gap-4">
          <input type="checkbox" checked={b.whatsapp} onChange={(e) => setB({ ...b, whatsapp: e.target.checked })} className="h-7 w-7 flex-shrink-0 accent-[#C8232A]" />
          <span>
            <span className="block font-titulo text-xl font-bold text-noche">
              {b.whatsapp ? "Botón flotante de WhatsApp: encendido" : "Botón flotante de WhatsApp: apagado"}
            </span>
            <span className="block text-grisazul">El botón verde fijo abajo a la derecha. Los demás enlaces de WhatsApp del sitio no cambian.</span>
          </span>
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="font-titulo text-xl font-bold text-noche">Urgencias</legend>
        {MODOS.map((m) => (
          <label key={m.valor} className={`flex cursor-pointer items-start gap-4 border-2 p-4 ${b.urgencias === m.valor ? "border-azul bg-hielo" : "border-grisazul/30"}`}>
            <input type="radio" name="urgencias" checked={b.urgencias === m.valor} onChange={() => setB({ ...b, urgencias: m.valor })} className="mt-1 h-5 w-5 flex-shrink-0 accent-[#414290]" />
            <span>
              <span className="block font-titulo text-lg font-semibold text-noche">{m.titulo}</span>
              <span className="block text-grisazul">{m.detalle}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {b.urgencias === "pausa" && (
        <div className="space-y-5 border-l-8 border-electrico bg-hielo p-5">
          <div>
            <label htmlFor="hasta" className={etiqueta}>
              Sin urgencias hasta el (inclusive)
            </label>
            <input id="hasta" type="date" value={b.hasta} onChange={(e) => setB({ ...b, hasta: e.target.value })} className={campo} />
            <p className="mt-1 text-sm text-grisazul">Al día siguiente el sitio vuelve solo al botón rojo de urgencias (hora de Chile; puede tardar hasta un minuto).</p>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={b.abrirSolo} onChange={(e) => setB({ ...b, abrirSolo: e.target.checked })} className="h-5 w-5 accent-[#414290]" />
            <span className="text-noche">Abrir el aviso solo, una vez por visita (si no, se abre al tocar el rayo amarillo)</span>
          </label>
          <p className="text-sm text-grisazul">El texto del aviso está en español, inglés y alemán y toma la fecha automáticamente.</p>
        </div>
      )}

      {error && (
        <p role="alert" className="border-l-4 border-rojo bg-hielo px-4 py-3 font-semibold text-noche">
          {error}
        </p>
      )}
      {mensaje && (
        <p role="status" className="border-l-4 border-azul bg-hielo px-4 py-3 font-semibold text-noche">
          {mensaje}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => void guardar()} disabled={guardando} className="boton">
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
        {b.actualizado && (
          <p className="text-sm text-grisazul">
            Último cambio: {new Date(b.actualizado).toLocaleString("es-CL", { timeZone: "America/Santiago", dateStyle: "short", timeStyle: "short" })}
          </p>
        )}
      </div>
    </div>
  );
}
