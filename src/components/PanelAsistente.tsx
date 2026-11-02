"use client";

import { useCallback, useEffect, useState } from "react";

type Config = {
  activo: boolean;
  saludo: { es: string; en: string; ger: string };
  instrucciones: string;
  topeDiario: number;
  actualizado?: string;
  hayGemini?: boolean;
  mensajesHoy?: number | null;
};

// La misma clave de sesión que /uso y /aviso.
const CLAVE_SESION = "uso-api-clave";
const MAX_SALUDO = 200;
const MAX_INSTRUCCIONES = 1500;

type Prueba = {
  claveConfigurada: boolean;
  modelo: string;
  ok: boolean;
  estado?: number | string;
  respuesta?: string;
  error?: string;
  modelosDisponibles?: string[];
  alternativas?: { modelo: string; ok: boolean; estado?: number | string; detalle?: string }[];
};

export default function PanelAsistente() {
  const [clave, setClave] = useState("");
  const [c, setC] = useState<Config | null>(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [probando, setProbando] = useState(false);
  const [prueba, setPrueba] = useState<Prueba | null>(null);

  const entrar = useCallback(async (valor: string) => {
    setCargando(true);
    setError("");
    try {
      const r = await fetch("/api/asistente", { headers: { Authorization: `Bearer ${valor}` }, cache: "no-store" });
      if (r.status === 401) throw new Error("La clave no es correcta.");
      if (r.status === 503) throw new Error("Falta configurar USO_API_TOKEN en Vercel (mínimo 16 caracteres).");
      if (!r.ok) throw new Error("No se pudo consultar. Intente de nuevo.");
      setC((await r.json()) as Config);
      try {
        sessionStorage.setItem(CLAVE_SESION, valor);
      } catch {
        /* sin almacenamiento: pedirá la clave de nuevo */
      }
    } catch (e) {
      setC(null);
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
    if (!c) return;
    setGuardando(true);
    setError("");
    setMensaje("");
    try {
      const r = await fetch("/api/asistente", {
        method: "PUT",
        headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
        body: JSON.stringify({ activo: c.activo, saludo: c.saludo, instrucciones: c.instrucciones, topeDiario: c.topeDiario }),
      });
      if (r.status === 503) throw new Error("No se pudo guardar: falta conectar Redis (Upstash) en Vercel.");
      if (!r.ok) throw new Error("No se pudo guardar. Intente de nuevo.");
      const g = (await r.json()) as Config & { sinTraducir?: boolean };
      setC(g);
      setMensaje(
        (g.activo ? "Guardado: el asistente está encendido." : "Guardado: el asistente está apagado.") +
          (g.sinTraducir ? " No se pudo traducir el saludo; en inglés y alemán se verá el estándar." : "")
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  async function probar() {
    setProbando(true);
    setPrueba(null);
    try {
      const r = await fetch("/api/asistente?probar=1", { headers: { Authorization: `Bearer ${clave}` }, cache: "no-store" });
      if (!r.ok) throw new Error();
      setPrueba((await r.json()) as Prueba);
    } catch {
      setPrueba({ claveConfigurada: true, modelo: "?", ok: false, error: "No se pudo ejecutar la prueba. Intente de nuevo." });
    } finally {
      setProbando(false);
    }
  }

  const campo = "mt-1 block w-full border border-grisazul/40 bg-white px-4 py-3 text-base text-tinta focus:border-azul";
  const etiqueta = "block font-titulo text-base font-semibold text-noche";

  if (!c) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void entrar(clave.trim());
        }}
        className="panel max-w-md space-y-4 bg-hielo p-6"
      >
        <label htmlFor="clave-asistente" className={etiqueta}>
          Clave de acceso
        </label>
        <input
          id="clave-asistente"
          type="password"
          autoComplete="off"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className={campo}
          required
        />
        <p className="text-sm text-grisazul">Es el valor de USO_API_TOKEN que dejó en Vercel (la misma de /uso y /aviso).</p>
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
      {c.hayGemini === false && (
        <p role="alert" className="border-l-4 border-rojo bg-hielo px-4 py-3 text-noche">
          Falta la variable <strong>GEMINI_API_KEY</strong> en Vercel. Mientras no exista, el botón del asistente no aparece
          en el sitio, aunque esté encendido aquí.
        </p>
      )}

      <div className="panel bg-hielo p-6 [--c:20px]">
        <label className="flex cursor-pointer items-center gap-4">
          <input
            type="checkbox"
            checked={c.activo}
            onChange={(e) => setC({ ...c, activo: e.target.checked })}
            className="h-7 w-7 flex-shrink-0 accent-[#C8232A]"
          />
          <span className="font-titulo text-xl font-bold text-noche">
            {c.activo ? "Asistente encendido: aparece en el sitio" : "Asistente apagado: no aparece"}
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="asist-tope" className={etiqueta}>
          Tope de mensajes por día
        </label>
        <input
          id="asist-tope"
          type="number"
          inputMode="numeric"
          min={1}
          max={5000}
          value={c.topeDiario}
          onChange={(e) => setC({ ...c, topeDiario: Number(e.target.value) })}
          className={campo + " max-w-[10rem]"}
        />
        <p className="mt-1 text-sm text-grisazul">
          Al llegar al tope, el asistente deja de responder hasta el día siguiente y ofrece WhatsApp.
          {typeof c.mensajesHoy === "number" && <> Hoy van <strong>{c.mensajesHoy}</strong> mensajes.</>}
        </p>
      </div>

      <div>
        <label htmlFor="asist-saludo" className={etiqueta}>
          Saludo inicial en español (opcional)
        </label>
        <textarea
          id="asist-saludo"
          rows={3}
          maxLength={MAX_SALUDO}
          value={c.saludo.es}
          onChange={(e) => setC({ ...c, saludo: { ...c.saludo, es: e.target.value } })}
          className={campo}
        />
        <p className="mt-1 text-sm text-grisazul">
          Vacío = saludo estándar. {c.saludo.es.length} de {MAX_SALUDO} caracteres.
        </p>
      </div>

      <details className="border border-grisazul/30 p-4">
        <summary className="cursor-pointer font-titulo text-base font-semibold text-noche">Saludo en inglés y alemán (opcional)</summary>
        <p className="mt-3 text-grisazul">
          Si los deja vacíos y hay saludo en español, se traducen solos al guardar. Si cambia el español, borre estos campos.
        </p>
        <label htmlFor="asist-en" className={etiqueta + " mt-4"}>
          Inglés
        </label>
        <textarea
          id="asist-en"
          rows={2}
          maxLength={MAX_SALUDO}
          value={c.saludo.en}
          onChange={(e) => setC({ ...c, saludo: { ...c.saludo, en: e.target.value } })}
          className={campo}
        />
        <label htmlFor="asist-ger" className={etiqueta + " mt-4"}>
          Alemán
        </label>
        <textarea
          id="asist-ger"
          rows={2}
          maxLength={MAX_SALUDO}
          value={c.saludo.ger}
          onChange={(e) => setC({ ...c, saludo: { ...c.saludo, ger: e.target.value } })}
          className={campo}
        />
      </details>

      <div>
        <label htmlFor="asist-instr" className={etiqueta}>
          Instrucciones adicionales (opcional)
        </label>
        <textarea
          id="asist-instr"
          rows={6}
          maxLength={MAX_INSTRUCCIONES}
          value={c.instrucciones}
          onChange={(e) => setC({ ...c, instrucciones: e.target.value })}
          className={campo}
        />
        <p className="mt-1 text-sm text-grisazul">
          Datos o reglas que el asistente debe respetar, por ejemplo: “En diciembre atiendo en Buenos Aires; para agendar,
          escribir por WhatsApp”. Él ya conoce los servicios, el horario, la dirección, la garantía y las preguntas
          frecuentes del sitio. No escriba claves ni datos privados: estos textos se envían a Google.{" "}
          {c.instrucciones.length} de {MAX_INSTRUCCIONES} caracteres.
        </p>
      </div>

      <div className="border border-grisazul/30 p-4">
        <h2 className="font-titulo text-lg font-bold text-noche">Probar la conexión con Gemini</h2>
        <p className="mt-1 text-grisazul">Hace una consulta real y muestra la respuesta, o el error exacto que entrega Google.</p>
        <button type="button" onClick={() => void probar()} disabled={probando} className="boton-suave mt-3">
          {probando ? "Probando..." : "Probar Gemini"}
        </button>
        {prueba && (
          <div role="status" className="mt-4 space-y-2 border-l-4 border-azul bg-hielo px-4 py-3 text-noche">
            <p className="font-semibold">
              {prueba.ok ? "Funciona. Gemini respondió: “" + prueba.respuesta + "”" : "No funciona."}
            </p>
            <p>Modelo: <code>{prueba.modelo}</code>{prueba.estado ? <> · Estado: <code>{String(prueba.estado)}</code></> : null}</p>
            {prueba.error && <p className="break-words text-sm">{prueba.error}</p>}
            {prueba.alternativas && prueba.alternativas.length > 0 && (
              <div className="text-sm">
                <p className="font-semibold">Otros modelos probados con su clave:</p>
                <ul className="mt-1 space-y-1">
                  {prueba.alternativas.map((a) => (
                    <li key={a.modelo} className="break-words">
                      <strong>{a.ok ? "Funciona" : "No"}</strong> · <code>{a.modelo}</code> · {String(a.estado ?? "")}
                      {a.detalle ? ` · ${a.detalle}` : ""}
                    </li>
                  ))}
                </ul>
                {prueba.alternativas.some((a) => a.ok) && (
                  <p className="mt-1 font-semibold">Copie uno que diga “Funciona” en GEMINI_MODEL (Vercel) y vuelva a desplegar.</p>
                )}
              </div>
            )}
            {prueba.modelosDisponibles && prueba.modelosDisponibles.length > 0 && !prueba.alternativas?.length && (
              <p className="break-words text-sm">
                Modelos disponibles con su clave (copie uno en la variable <code>GEMINI_MODEL</code> de Vercel y vuelva a
                desplegar): <code>{prueba.modelosDisponibles.join(", ")}</code>
              </p>
            )}
          </div>
        )}
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
        {c.actualizado && (
          <p className="text-sm text-grisazul">
            Último cambio:{" "}
            {new Date(c.actualizado).toLocaleString("es-CL", { timeZone: "America/Santiago", dateStyle: "short", timeStyle: "short" })}
          </p>
        )}
      </div>
    </div>
  );
}
