// Registro y contador de las APIs externas que consulta el sitio.
// Cada llamada queda en tres lugares:
//   1. Los registros de Vercel (línea "[uso-api] {...}"), siempre, incluso sin Redis.
//   2. Contadores por día y por mes en Upstash Redis (el mismo del contador de visitas).
//   3. Una lista con las últimas 500 llamadas (hora, servicio, resultado, duración).
// No se guarda nada que identifique a una persona: ni IP, ni textos, ni correos.

import { redisLote, redisDisponible, type ComandoRedis } from "./redis";

export type Servicio = "google_places" | "google_translate" | "turnstile";

export const SERVICIOS: Record<Servicio, { nombre: string; unidad: string | null; nota: string }> = {
  google_places: {
    nombre: "Google Places (reseñas)",
    unidad: null,
    nota: "Cuenta las veces que el sitio pide las reseñas. Si Vercel las tenía guardadas, Google no recibe la llamada. El consumo exacto y el cobro están en Google Cloud → APIs y servicios → Métricas.",
  },
  google_translate: {
    nombre: "Google Translate (formularios)",
    unidad: "caracteres",
    nota: "Google cobra por caracteres enviados a traducir. Se cuentan solo los de las traducciones exitosas.",
  },
  turnstile: {
    nombre: "Cloudflare Turnstile (captcha)",
    unidad: null,
    nota: "“Correctas” son personas verificadas; “con error” son intentos rechazados (robots o tokens vencidos). Es gratuito.",
  },
};

export type Registro = {
  servicio: Servicio;
  ok: boolean;
  /** Código HTTP u otra etiqueta corta ("tope_mensual", "red"). */
  estado?: number | string;
  ms: number;
  /** Cantidad consumida (caracteres en traducción). Solo se suma si la llamada salió bien. */
  unidades?: number;
  /** Causa breve del error. Nunca datos de personas. */
  detalle?: string;
};

export type LineaLog = {
  t: string;
  s: Servicio;
  ok: boolean;
  st?: number | string;
  ms: number;
  u?: number;
  d?: string;
};

export type Contadores = Record<string, number>;

const ZONA = "America/Santiago";
const DIAS_VISIBLES = 14;
const LARGO_LOG = 500;

/** Fecha AAAA-MM-DD en hora de Chile. */
function fechaChile(fecha: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(fecha);
}

const claveDia = (dia: string) => `uso:dia:${dia}`;
const claveMes = (mes: string) => `uso:mes:${mes}`;

/** Anota una llamada. Nunca lanza errores: registrar no puede romper el sitio. */
export async function registrarUso(r: Registro): Promise<void> {
  try {
    const ahora = new Date();
    const dia = fechaChile(ahora);
    const mes = dia.slice(0, 7);
    const linea: LineaLog = {
      t: ahora.toISOString(),
      s: r.servicio,
      ok: r.ok,
      st: r.estado,
      ms: Math.round(r.ms),
      u: r.ok ? r.unidades : undefined,
      d: r.detalle?.slice(0, 200),
    };
    console.log("[uso-api]", JSON.stringify(linea));
    if (!redisDisponible) return;

    const comandos: ComandoRedis[] = [];
    for (const clave of [claveDia(dia), claveMes(mes)]) {
      comandos.push(["HINCRBY", clave, `${r.servicio}:llamadas`, 1]);
      comandos.push(["HINCRBY", clave, `${r.servicio}:${r.ok ? "ok" : "error"}`, 1]);
      if (r.ok && r.unidades) comandos.push(["HINCRBY", clave, `${r.servicio}:unidades`, r.unidades]);
    }
    comandos.push(["EXPIRE", claveDia(dia), 60 * 60 * 24 * 120]);
    comandos.push(["EXPIRE", claveMes(mes), 60 * 60 * 24 * 800]);
    comandos.push(["LPUSH", "uso:log", JSON.stringify(linea)]);
    comandos.push(["LTRIM", "uso:log", 0, LARGO_LOG - 1]);
    await redisLote(comandos);
  } catch {
    /* registrar es secundario */
  }
}

/** Total consumido este mes de un servicio (null si Redis no responde). */
export async function unidadesDelMes(servicio: Servicio): Promise<number | null> {
  const mes = fechaChile(new Date()).slice(0, 7);
  const r = await redisLote([["HGET", claveMes(mes), `${servicio}:unidades`]]);
  if (!r) return null;
  return Number(r[0] ?? 0);
}

/** Tope mensual de caracteres a traducir. Google entrega 500.000 gratis al mes; el tope deja margen. */
export function limiteTraduccionMensual(): number {
  const n = Number(process.env.LIMITE_TRADUCCION_CARACTERES_MES);
  return Number.isFinite(n) && n > 0 ? n : 400_000;
}

function aContadores(fila: unknown): Contadores {
  const salida: Contadores = {};
  if (!Array.isArray(fila)) return salida;
  for (let i = 0; i + 1 < fila.length; i += 2) salida[String(fila[i])] = Number(fila[i + 1]);
  return salida;
}

export type ResumenUso = {
  redis: boolean;
  fechaHoy: string;
  mes: string;
  mesAnterior: string;
  hoy: Contadores;
  esteMes: Contadores;
  mesPasado: Contadores;
  dias: { dia: string; c: Contadores }[];
  log: LineaLog[];
};

export async function leerUso(): Promise<ResumenUso> {
  const ahora = new Date();
  const fechaHoy = fechaChile(ahora);
  const mes = fechaHoy.slice(0, 7);
  const [a, m] = mes.split("-").map(Number);
  const mesAnterior = m === 1 ? `${a - 1}-12` : `${a}-${String(m - 1).padStart(2, "0")}`;
  const dias = Array.from({ length: DIAS_VISIBLES }, (_, i) => fechaChile(new Date(ahora.getTime() - i * 86_400_000)));

  const vacio: ResumenUso = {
    redis: redisDisponible,
    fechaHoy,
    mes,
    mesAnterior,
    hoy: {},
    esteMes: {},
    mesPasado: {},
    dias: dias.map((dia) => ({ dia, c: {} })),
    log: [],
  };
  const r = await redisLote([
    ["HGETALL", claveMes(mes)],
    ["HGETALL", claveMes(mesAnterior)],
    ["LRANGE", "uso:log", 0, 199],
    ...dias.map((d): ComandoRedis => ["HGETALL", claveDia(d)]),
  ]);
  if (!r) return vacio;

  const log: LineaLog[] = [];
  for (const fila of Array.isArray(r[2]) ? r[2] : []) {
    try {
      log.push(JSON.parse(String(fila)) as LineaLog);
    } catch {
      /* línea dañada: se omite */
    }
  }
  const porDia = dias.map((dia, i) => ({ dia, c: aContadores(r[3 + i]) }));
  return {
    ...vacio,
    esteMes: aContadores(r[0]),
    mesPasado: aContadores(r[1]),
    hoy: porDia[0].c,
    dias: porDia,
    log,
  };
}
