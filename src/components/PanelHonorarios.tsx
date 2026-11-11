"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { desdeBruto, desdeLiquido, tasaDelAnio, tasasIniciales, type TasaAnual } from "@/lib/honorarios";

const CLAVE_SESION = "uso-api-clave";
const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const pct = (t: number) => `${String(t).replace(".", ",")} %`;
const hoyChile = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date());

type Fila = { anio: string; tasa: string };
const aFilas = (t: TasaAnual[]): Fila[] => t.map((f) => ({ anio: String(f.anio), tasa: String(f.tasa).replace(".", ",") }));

export default function PanelHonorarios() {
  const [clave, setClave] = useState("");
  const [dentro, setDentro] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [filas, setFilas] = useState<Fila[]>(aFilas(tasasIniciales));
  const [guardada, setGuardada] = useState(true);

  // Calculadora
  const [modo, setModo] = useState<"bruto" | "liquido">("bruto");
  const [monto, setMonto] = useState("");
  const [emision, setEmision] = useState(hoyChile());
  const [retiene, setRetiene] = useState(true);
  const [manual, setManual] = useState("");
  const [copiado, setCopiado] = useState(false);

  const entrar = useCallback(async (valor: string) => {
    setCargando(true);
    setError("");
    try {
      const r = await fetch("/api/honorarios", { headers: { Authorization: `Bearer ${valor}` }, cache: "no-store" });
      if (r.status === 401) throw new Error("La clave no es correcta.");
      if (r.status === 503) throw new Error("Falta configurar USO_API_TOKEN en Vercel (mínimo 16 caracteres).");
      if (!r.ok) throw new Error("No se pudo consultar. Intente de nuevo.");
      const j = (await r.json()) as { tasas: TasaAnual[]; guardada: boolean };
      setFilas(aFilas(j.tasas));
      setGuardada(j.guardada);
      setDentro(true);
      try {
        sessionStorage.setItem(CLAVE_SESION, valor);
      } catch {
        /* nada */
      }
    } catch (e) {
      setDentro(false);
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
      const g = sessionStorage.getItem(CLAVE_SESION);
      if (g) {
        setClave(g);
        void entrar(g);
      }
    } catch {
      /* nada */
    }
  }, [entrar]);

  const num = (t: string) => Number(t.replace(",", "."));
  const tasas = useMemo<TasaAnual[]>(
    () =>
      filas
        .map((f) => ({ anio: Number(f.anio), tasa: num(f.tasa) }))
        .filter((f) => Number.isInteger(f.anio) && f.anio >= 2000 && Number.isFinite(f.tasa) && f.tasa >= 0 && f.tasa < 100)
        .sort((a, b) => a.anio - b.anio),
    [filas]
  );

  const anioEmision = Number(emision.slice(0, 4));
  const tasaTabla = Number.isInteger(anioEmision) ? tasaDelAnio(tasas, anioEmision) : null;
  const tasaManual = manual.trim() ? num(manual) : null;
  const tasa = tasaManual !== null && Number.isFinite(tasaManual) && tasaManual >= 0 && tasaManual < 100 ? tasaManual : tasaTabla;

  const valor = Math.round(Number(monto.replace(/[^\d]/g, "")));
  const resultado =
    tasa !== null && valor > 0 ? (modo === "bruto" ? desdeBruto(valor, tasa, retiene) : desdeLiquido(valor, tasa, retiene)) : null;

  async function guardar() {
    setGuardando(true);
    setError("");
    setMensaje("");
    try {
      const r = await fetch("/api/honorarios", {
        method: "PUT",
        headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
        body: JSON.stringify({ tasas }),
      });
      if (r.status === 400) throw new Error("Agregue al menos un año con su tasa.");
      if (r.status === 503) throw new Error("No se pudo guardar: falta conectar Redis (Upstash) en Vercel.");
      if (!r.ok) throw new Error("No se pudo guardar. Intente de nuevo.");
      const j = (await r.json()) as { tasas: TasaAnual[] };
      setFilas(aFilas(j.tasas));
      setGuardada(true);
      setMensaje("Tasas guardadas.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  async function copiar() {
    if (!resultado) return;
    const t = `Boleta de honorarios (${emision}): bruto ${clp.format(resultado.bruto)}; retención ${pct(resultado.tasa)} = ${clp.format(resultado.retencion)}; líquido ${clp.format(resultado.liquido)}.`;
    try {
      await navigator.clipboard.writeText(t);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin portapapeles */
    }
  }

  const campo = "mt-1 block w-full border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";
  const etiqueta = "block font-titulo text-base font-semibold text-noche";

  if (!dentro) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void entrar(clave.trim());
        }}
        className="panel max-w-md space-y-4 bg-hielo p-6"
      >
        <label htmlFor="clave-hon" className={etiqueta}>
          Clave de acceso
        </label>
        <input id="clave-hon" type="password" autoComplete="off" value={clave} onChange={(e) => setClave(e.target.value)} className={campo} required />
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
    <div className="grid max-w-5xl gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <p className="border-l-4 border-azul bg-hielo px-4 py-3 text-noche">
          Las boletas de honorarios <strong>no llevan IVA</strong>. Lo que se calcula aquí es la <strong>retención de impuesto</strong> que el receptor
          descuenta y paga al SII. La tasa depende del <strong>año de emisión</strong> de la boleta.
        </p>

        <div className="flex gap-2" role="group" aria-label="Qué monto conoce">
          {(["bruto", "liquido"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={modo === m}
              onClick={() => setModo(m)}
              className={`flex-1 border-2 px-4 py-3 font-titulo font-semibold ${modo === m ? "border-noche bg-noche text-white" : "border-grisazul/40 text-noche"}`}
            >
              {m === "bruto" ? "Conozco el monto bruto" : "Quiero recibir un líquido"}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="monto" className={etiqueta}>
            {modo === "bruto" ? "Monto bruto de la boleta (CLP)" : "Monto líquido a recibir (CLP)"}
          </label>
          <input
            id="monto"
            inputMode="numeric"
            value={monto ? new Intl.NumberFormat("es-CL").format(Number(monto.replace(/[^\d]/g, ""))) : ""}
            onChange={(e) => setMonto(e.target.value)}
            className={campo}
            placeholder="1.000.000"
          />
        </div>

        <div>
          <label htmlFor="emision" className={etiqueta}>
            Fecha de emisión de la boleta
          </label>
          <input id="emision" type="date" value={emision} onChange={(e) => setEmision(e.target.value)} className={campo} />
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={retiene} onChange={(e) => setRetiene(e.target.checked)} className="h-5 w-5 accent-[#414290]" />
          <span className="text-noche">El receptor retiene (boleta a terceros con retención)</span>
        </label>

        <div>
          <label htmlFor="manual" className={etiqueta}>
            Tasa manual (opcional)
          </label>
          <input id="manual" inputMode="decimal" value={manual} onChange={(e) => setManual(e.target.value)} className={campo} placeholder={tasaTabla !== null ? `Automática: ${pct(tasaTabla)}` : "Sin tasa para ese año"} />
        </div>

        <div className="panel bg-noche p-6 text-white [--c:20px]" aria-live="polite">
          {resultado ? (
            <>
              <dl className="space-y-2">
                <div className="flex justify-between gap-4"><dt>Monto bruto</dt><dd className="font-titulo text-lg font-semibold">{clp.format(resultado.bruto)}</dd></div>
                <div className="flex justify-between gap-4"><dt>Retención ({pct(resultado.tasa)})</dt><dd className="font-titulo text-lg font-semibold">− {clp.format(resultado.retencion)}</dd></div>
                <div className="flex justify-between gap-4 border-t border-white/30 pt-2"><dt className="font-semibold">Líquido a recibir</dt><dd className="font-titulo text-2xl font-bold text-electrico">{clp.format(resultado.liquido)}</dd></div>
              </dl>
              <button type="button" onClick={() => void copiar()} className="mt-4 font-semibold text-peri underline underline-offset-4 hover:no-underline">
                {copiado ? "Copiado" : "Copiar resultado"}
              </button>
            </>
          ) : (
            <p className="text-white/80">Ingrese un monto para ver el cálculo.</p>
          )}
        </div>
        <p className="text-sm text-grisazul">Montos en pesos enteros. El SII puede diferir en $1 por redondeo; verifique al emitir la boleta.</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-titulo text-xl font-bold text-noche">Tasas de retención por año</h2>
        <p className="text-grisazul">
          Se aplica la del último año de la tabla que no supere el año de emisión. {guardada ? "" : "Aún no se han guardado: se usan las del calendario vigente del SII."}
        </p>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-grisazul"><th className="pb-1 font-semibold">Desde el año</th><th className="pb-1 font-semibold">Tasa (%)</th><th /></tr>
          </thead>
          <tbody>
            {filas.map((f, i) => (
              <tr key={i}>
                <td className="pr-3 pb-2"><input aria-label="Año" inputMode="numeric" value={f.anio} onChange={(e) => setFilas(filas.map((x, j) => (j === i ? { ...x, anio: e.target.value } : x)))} className={campo + " mt-0"} /></td>
                <td className="pr-3 pb-2"><input aria-label="Tasa en porcentaje" inputMode="decimal" value={f.tasa} onChange={(e) => setFilas(filas.map((x, j) => (j === i ? { ...x, tasa: e.target.value } : x)))} className={campo + " mt-0"} /></td>
                <td className="pb-2"><button type="button" onClick={() => setFilas(filas.filter((_, j) => j !== i))} className="font-semibold text-rojo-accion underline" aria-label={`Quitar el año ${f.anio}`}>Quitar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-4">
          <button type="button" onClick={() => setFilas([...filas, { anio: String((tasas.at(-1)?.anio ?? new Date().getFullYear()) + 1), tasa: "" }])} className="boton-suave">Agregar año</button>
          <button type="button" onClick={() => void guardar()} disabled={guardando} className="boton">{guardando ? "Guardando..." : "Guardar tasas"}</button>
        </div>
        {error && <p role="alert" className="border-l-4 border-rojo bg-hielo px-4 py-3 font-semibold text-noche">{error}</p>}
        {mensaje && <p role="status" className="border-l-4 border-azul bg-hielo px-4 py-3 font-semibold text-noche">{mensaje}</p>}
      </div>
    </div>
  );
}
