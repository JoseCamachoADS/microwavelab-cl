"use client";

import { useCallback, useEffect, useState } from "react";
import type { Contadores, LineaLog, ResumenUso, Servicio } from "@/lib/uso-api";

type Meta = { nombre: string; unidad: string | null; nota: string };
type Respuesta = ResumenUso & { servicios: Record<Servicio, Meta>; limiteTraduccion: number };

const CLAVE_SESION = "uso-api-clave";
const nf = new Intl.NumberFormat("es-CL");
const n = (c: Contadores, k: string) => c[k] ?? 0;

function hora(iso: string): string {
  return new Date(iso).toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function nombreMes(aaaamm: string): string {
  const [a, m] = aaaamm.split("-").map(Number);
  return new Date(a, m - 1, 1).toLocaleDateString("es-CL", { month: "long", year: "numeric" });
}

function nombreDia(aaaammdd: string): string {
  const [a, m, d] = aaaammdd.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-CL", { weekday: "short", day: "2-digit", month: "2-digit" });
}

export default function PanelUso() {
  const [clave, setClave] = useState("");
  const [datos, setDatos] = useState<Respuesta | null>(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState<"todos" | Servicio>("todos");
  const [soloErrores, setSoloErrores] = useState(false);

  const consultar = useCallback(async (valor: string) => {
    setCargando(true);
    setError("");
    try {
      const r = await fetch("/api/uso", { headers: { Authorization: `Bearer ${valor}` }, cache: "no-store" });
      if (r.status === 401) throw new Error("La clave no es correcta.");
      if (r.status === 503) throw new Error("Falta configurar USO_API_TOKEN en Vercel (mínimo 16 caracteres).");
      if (!r.ok) throw new Error("No se pudo consultar. Intente de nuevo.");
      setDatos((await r.json()) as Respuesta);
      try {
        sessionStorage.setItem(CLAVE_SESION, valor);
      } catch {
        /* sin almacenamiento: pedirá la clave de nuevo */
      }
    } catch (e) {
      setDatos(null);
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
        void consultar(guardada);
      }
    } catch {
      /* nada */
    }
  }, [consultar]);

  const campo = "block w-full border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";

  if (!datos) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void consultar(clave.trim());
        }}
        className="panel max-w-md space-y-4 bg-hielo p-6"
      >
        <label htmlFor="clave-uso" className="block font-titulo text-base font-semibold text-noche">
          Clave de acceso
        </label>
        <input
          id="clave-uso"
          type="password"
          autoComplete="off"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className={campo}
          required
        />
        <p className="text-sm text-grisazul">Es el valor de USO_API_TOKEN que dejó en Vercel.</p>
        {error && (
          <p role="alert" className="border-l-4 border-rojo bg-white px-4 py-3 font-semibold text-noche">
            {error}
          </p>
        )}
        <button type="submit" disabled={cargando} className="boton w-full sm:w-auto">
          {cargando ? "Consultando..." : "Ver uso"}
        </button>
      </form>
    );
  }

  const ids = Object.keys(datos.servicios) as Servicio[];
  const lineas: LineaLog[] = datos.log.filter((l) => (filtro === "todos" || l.s === filtro) && (!soloErrores || !l.ok));
  const h2 = "font-titulo text-2xl font-bold text-noche";

  return (
    <div className="space-y-12">
      {!datos.redis && (
        <p className="border-l-4 border-rojo bg-hielo px-4 py-3 text-noche">
          Redis no está conectado: los contadores no se guardan. Las llamadas igual quedan escritas en los registros de
          Vercel (busque “[uso-api]”).
        </p>
      )}

      <section>
        <h2 className={h2}>Este mes ({nombreMes(datos.mes)})</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {ids.map((id) => {
            const meta = datos.servicios[id];
            const total = n(datos.esteMes, `${id}:llamadas`);
            const unidades = n(datos.esteMes, `${id}:unidades`);
            const limite = id === "google_translate" ? datos.limiteTraduccion : 0;
            const pct = limite ? Math.min(100, Math.round((unidades / limite) * 100)) : 0;
            return (
              <article key={id} className="panel bg-hielo p-6 [--c:20px]">
                <h3 className="font-titulo text-lg font-bold text-noche">{meta.nombre}</h3>
                <p className="mt-3 font-titulo text-4xl font-bold text-azul">{nf.format(total)}</p>
                <p className="text-grisazul">llamadas este mes</p>
                <dl className="mt-4 grid grid-cols-2 gap-y-1 text-base">
                  <dt>Hoy</dt>
                  <dd className="text-right font-semibold">{nf.format(n(datos.hoy, `${id}:llamadas`))}</dd>
                  <dt>Correctas</dt>
                  <dd className="text-right font-semibold">{nf.format(n(datos.esteMes, `${id}:ok`))}</dd>
                  <dt>Con error</dt>
                  <dd className="text-right font-semibold">{nf.format(n(datos.esteMes, `${id}:error`))}</dd>
                  <dt>Mes pasado</dt>
                  <dd className="text-right font-semibold">{nf.format(n(datos.mesPasado, `${id}:llamadas`))}</dd>
                  {meta.unidad && (
                    <>
                      <dt>Consumo ({meta.unidad})</dt>
                      <dd className="text-right font-semibold">{nf.format(unidades)}</dd>
                    </>
                  )}
                </dl>
                {limite > 0 && (
                  <div className="mt-4">
                    <div
                      className="h-3 bg-white"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Uso del tope mensual de traducción"
                    >
                      <div className={"h-3 " + (pct >= 80 ? "bg-rojo-accion" : "bg-azul")} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-1 text-sm text-grisazul">
                      {pct}% del tope mensual ({nf.format(limite)}). Al llegar, el formulario sigue funcionando, pero sin
                      traducir.
                    </p>
                  </div>
                )}
                <p className="mt-4 text-sm text-grisazul">{meta.nota}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className={h2}>Últimos 14 días</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left text-base">
            <thead>
              <tr className="border-b-2 border-noche font-titulo text-noche">
                <th className="py-2 pr-3">Día</th>
                {ids.map((id) => (
                  <th key={id} className="px-3 py-2 text-right">
                    {datos.servicios[id].nombre.split(" (")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datos.dias.map((d) => (
                <tr key={d.dia} className="border-b border-grisazul/20">
                  <td className="py-2 pr-3 capitalize">{nombreDia(d.dia)}</td>
                  {ids.map((id) => (
                    <td key={id} className="px-3 py-2 text-right tabular-nums">
                      {nf.format(n(d.c, `${id}:llamadas`))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className={h2}>Registro de llamadas</h2>
        <p className="mt-2 text-grisazul">Las últimas 200. Hora de Chile. No incluye datos de personas.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="font-titulo font-semibold text-noche">Servicio</span>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value as "todos" | Servicio)}
              className="border border-grisazul/40 bg-white px-3 py-2 text-base"
            >
              <option value="todos">Todos</option>
              {ids.map((id) => (
                <option key={id} value={id}>
                  {datos.servicios[id].nombre}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={soloErrores} onChange={(e) => setSoloErrores(e.target.checked)} className="h-5 w-5" />
            <span>Solo con error</span>
          </label>
          <button type="button" onClick={() => void consultar(clave)} className="boton-suave">
            Actualizar
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-base">
            <thead>
              <tr className="border-b-2 border-noche font-titulo text-noche">
                <th className="py-2 pr-3">Hora</th>
                <th className="px-3 py-2">Servicio</th>
                <th className="px-3 py-2">Resultado</th>
                <th className="px-3 py-2 text-right">Duración</th>
                <th className="px-3 py-2 text-right">Cantidad</th>
                <th className="py-2 pl-3">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {lineas.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-grisazul">
                    Sin llamadas registradas con este filtro.
                  </td>
                </tr>
              )}
              {lineas.map((l, i) => (
                <tr key={l.t + i} className="border-b border-grisazul/20 align-top">
                  <td className="whitespace-nowrap py-2 pr-3 tabular-nums">{hora(l.t)}</td>
                  <td className="px-3 py-2">{datos.servicios[l.s]?.nombre.split(" (")[0] ?? l.s}</td>
                  <td className={"px-3 py-2 font-semibold " + (l.ok ? "text-azul" : "text-rojo-oscuro")}>
                    {l.ok ? "Correcta" : "Error"}
                    {l.st ? ` (${l.st})` : ""}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">{l.ms} ms</td>
                  <td className="px-3 py-2 text-right tabular-nums">{l.u ? nf.format(l.u) : ""}</td>
                  <td className="break-words py-2 pl-3 text-sm text-grisazul">{l.d ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
