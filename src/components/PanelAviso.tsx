"use client";

import { useCallback, useEffect, useState } from "react";
import AvisoPizarra from "./AvisoPizarra";

type Aviso = { activo: boolean; es: string; en: string; ger: string; actualizado?: string };

// La misma clave de sesión que /uso: si ya entró allí, aquí no la pide de nuevo.
const CLAVE_SESION = "uso-api-clave";
const MAX = 240;

export default function PanelAviso() {
  const [clave, setClave] = useState("");
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const entrar = useCallback(async (valor: string) => {
    setCargando(true);
    setError("");
    try {
      const r = await fetch("/api/aviso", { headers: { Authorization: `Bearer ${valor}` }, cache: "no-store" });
      if (r.status === 401) throw new Error("La clave no es correcta.");
      if (r.status === 503) throw new Error("Falta configurar USO_API_TOKEN en Vercel (mínimo 16 caracteres).");
      if (!r.ok) throw new Error("No se pudo consultar. Intente de nuevo.");
      setAviso((await r.json()) as Aviso);
      try {
        sessionStorage.setItem(CLAVE_SESION, valor);
      } catch {
        /* sin almacenamiento: pedirá la clave de nuevo */
      }
    } catch (e) {
      setAviso(null);
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
    if (!aviso) return;
    setGuardando(true);
    setError("");
    setMensaje("");
    try {
      const r = await fetch("/api/aviso", {
        method: "PUT",
        headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
        body: JSON.stringify({ activo: aviso.activo, es: aviso.es, en: aviso.en, ger: aviso.ger }),
      });
      if (r.status === 400) throw new Error("Escriba el mensaje en español para poder encender el aviso.");
      if (r.status === 503) throw new Error("No se pudo guardar: falta conectar Redis (Upstash) en Vercel.");
      if (!r.ok) throw new Error("No se pudo guardar. Intente de nuevo.");
      const guardado = (await r.json()) as Aviso & { sinTraducir?: boolean };
      setAviso(guardado);
      setMensaje(
        (guardado.activo ? "Guardado: el aviso está encendido." : "Guardado: el aviso está apagado.") +
          (guardado.sinTraducir
            ? " No se pudo traducir automáticamente al inglés o alemán; en esos idiomas se verá en español."
            : "")
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  const campo = "mt-1 block w-full border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";
  const etiqueta = "block font-titulo text-base font-semibold text-noche";

  if (!aviso) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void entrar(clave.trim());
        }}
        className="panel max-w-md space-y-4 bg-hielo p-6"
      >
        <label htmlFor="clave-aviso" className={etiqueta}>
          Clave de acceso
        </label>
        <input
          id="clave-aviso"
          type="password"
          autoComplete="off"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className={campo}
          required
        />
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
          <input
            type="checkbox"
            checked={aviso.activo}
            onChange={(e) => setAviso({ ...aviso, activo: e.target.checked })}
            className="h-7 w-7 flex-shrink-0 accent-[#C8232A]"
          />
          <span className="font-titulo text-xl font-bold text-noche">
            {aviso.activo ? "Aviso encendido: se muestra en el sitio" : "Aviso apagado: no se muestra"}
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="aviso-es" className={etiqueta}>
          Mensaje en español
        </label>
        <textarea
          id="aviso-es"
          rows={4}
          maxLength={MAX}
          value={aviso.es}
          onChange={(e) => setAviso({ ...aviso, es: e.target.value })}
          className={campo}
        />
        <p className="mt-1 text-sm text-grisazul">
          {aviso.es.length} de {MAX} caracteres.
        </p>
      </div>

      <details className="border border-grisazul/30 p-4">
        <summary className="cursor-pointer font-titulo text-base font-semibold text-noche">
          Inglés y alemán (opcional)
        </summary>
        <p className="mt-3 text-grisazul">
          Si los deja vacíos, se traducen solos desde el español al guardar. Si cambia el español, borre estos
          campos para que se traduzcan de nuevo.
        </p>
        <label htmlFor="aviso-en" className={etiqueta + " mt-4"}>
          Inglés
        </label>
        <textarea
          id="aviso-en"
          rows={3}
          maxLength={MAX}
          value={aviso.en}
          onChange={(e) => setAviso({ ...aviso, en: e.target.value })}
          className={campo}
        />
        <label htmlFor="aviso-ger" className={etiqueta + " mt-4"}>
          Alemán
        </label>
        <textarea
          id="aviso-ger"
          rows={3}
          maxLength={MAX}
          value={aviso.ger}
          onChange={(e) => setAviso({ ...aviso, ger: e.target.value })}
          className={campo}
        />
      </details>

      <div>
        <h2 className="font-titulo text-xl font-bold text-noche">Así se verá</h2>
        <div className="mt-3 overflow-hidden">
          {aviso.es.trim() ? (
            <AvisoPizarra
              key={aviso.es}
              texto={aviso.es}
              etiqueta="Vista previa del aviso"
              pausar="Pausar el aviso"
              reanudar="Reanudar el aviso"
            />
          ) : (
            <p className="text-grisazul">Escriba un mensaje para ver la vista previa.</p>
          )}
        </div>
      </div>

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
        {aviso.actualizado && (
          <p className="text-sm text-grisazul">
            Último cambio:{" "}
            {new Date(aviso.actualizado).toLocaleString("es-CL", { timeZone: "America/Santiago", dateStyle: "short", timeStyle: "short" })}
          </p>
        )}
      </div>
    </div>
  );
}
