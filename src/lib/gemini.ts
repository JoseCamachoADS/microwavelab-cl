// Consulta a Gemini (Google AI Studio). Solo se ejecuta en el servidor: la clave nunca llega al navegador.
// Variables: GEMINI_API_KEY (obligatoria) y GEMINI_MODEL (opcional; por defecto un modelo "Flash-Lite", el más liviano).
// Cada llamada queda en el registro de /uso (servicio "gemini", en tokens).

import { registrarUso } from "./uso-api";

export type MensajeChat = { rol: "usuario" | "asistente"; texto: string };

const MODELO = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
// Las respuestas son cortas por instrucción; el margen evita cortes si el modelo "piensa" antes de responder.
const MAX_SALIDA = 1024;

type Respuesta = {
  candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
  usageMetadata?: { totalTokenCount?: number };
};

/** Devuelve la respuesta del modelo, o null si falló (el motivo queda en el registro de uso). */
export async function consultarGemini(instrucciones: string, mensajes: MensajeChat[]): Promise<string | null> {
  const clave = process.env.GEMINI_API_KEY;
  if (!clave) return null;
  const inicio = Date.now();
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODELO)}:generateContent`, {
      method: "POST",
      // La clave va en un encabezado (no en la URL) para que no quede en ningún registro.
      headers: { "Content-Type": "application/json", "x-goog-api-key": clave },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instrucciones }] },
        contents: mensajes.map((m) => ({ role: m.rol === "usuario" ? "user" : "model", parts: [{ text: m.texto }] })),
        generationConfig: { maxOutputTokens: MAX_SALIDA, temperature: 0.3 },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) {
      const detalle = (await r.text()).slice(0, 300);
      console.error(`[gemini] Respondió ${r.status}: ${detalle}`);
      await registrarUso({ servicio: "gemini", ok: false, estado: r.status, ms: Date.now() - inicio, detalle });
      return null;
    }
    const datos = (await r.json()) as Respuesta;
    const texto = datos.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
    await registrarUso({
      servicio: "gemini",
      ok: Boolean(texto),
      estado: r.status,
      ms: Date.now() - inicio,
      unidades: datos.usageMetadata?.totalTokenCount,
      detalle: texto ? undefined : `sin texto (${datos.candidates?.[0]?.finishReason ?? "sin candidatos"})`,
    });
    return texto || null;
  } catch (error) {
    console.error("[gemini] No se pudo consultar:", error);
    await registrarUso({ servicio: "gemini", ok: false, estado: "red", ms: Date.now() - inicio, detalle: "sin respuesta de Gemini" });
    return null;
  }
}

export type Diagnostico = {
  claveConfigurada: boolean;
  modelo: string;
  ok: boolean;
  estado?: number | string;
  respuesta?: string;
  error?: string;
  /** Modelos disponibles para esta clave (se lista cuando el modelo configurado no existe). */
  modelosDisponibles?: string[];
};

/** Prueba real contra Gemini para /asistente: devuelve el error exacto de Google si falla. */
export async function diagnosticarGemini(): Promise<Diagnostico> {
  const clave = process.env.GEMINI_API_KEY;
  if (!clave) return { claveConfigurada: false, modelo: MODELO, ok: false, error: "Falta GEMINI_API_KEY en Vercel (o falta volver a desplegar después de agregarla)." };
  const base = { claveConfigurada: true, modelo: MODELO };
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODELO)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": clave },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "Responde solo con la palabra: listo" }] }],
        generationConfig: { maxOutputTokens: 256 },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (r.ok) {
      const d = (await r.json()) as Respuesta;
      const texto = d.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
      return texto
        ? { ...base, ok: true, estado: r.status, respuesta: texto }
        : { ...base, ok: false, estado: r.status, error: `Google respondió sin texto (${d.candidates?.[0]?.finishReason ?? "sin candidatos"}).` };
    }
    const detalle = (await r.text()).slice(0, 400);
    let modelosDisponibles: string[] | undefined;
    if (r.status === 404) {
      try {
        const l = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=100", {
          headers: { "x-goog-api-key": clave },
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        });
        if (l.ok) {
          const lista = (await l.json()) as { models?: { name?: string; supportedGenerationMethods?: string[] }[] };
          modelosDisponibles = (lista.models ?? [])
            .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
            .map((m) => (m.name ?? "").replace(/^models\//, ""))
            .filter((n) => /^gemini-/.test(n));
        }
      } catch {
        /* sin lista */
      }
    }
    return { ...base, ok: false, estado: r.status, error: detalle, modelosDisponibles };
  } catch (e) {
    return { ...base, ok: false, estado: "red", error: e instanceof Error ? e.message : "Sin respuesta de Google." };
  }
}
