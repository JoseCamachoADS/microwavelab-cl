// Contador propio de clics en los botones de WhatsApp, separado por dispositivo (móvil o escritorio) y por botón.
// Es anónimo: solo se suman números en Upstash Redis (como el contador de visitas). No se guarda IP, identificador,
// cookie ni texto, y funciona aunque la persona haya rechazado la medición de Analytics.

import { redisLote, type ComandoRedis } from "./redis";
import { fechaChile } from "./uso-api";

export const ORIGENES = {
  flotante: "Botón flotante de WhatsApp",
  "urgencia-flotante": "Botón flotante de urgencias (rayo)",
  portada: "Portada: solicitar cotización",
  "urgencia-portada": "Portada: reportar una urgencia",
  "pausa-urgencias": "Aviso amarillo de urgencias en pausa (consultas)",
  "consulta-portada": "Portada: consultas con urgencias en pausa",
  pie: "Pie de página",
  contacto: "Página de contacto",
  formulario: "Formulario de cotización",
  asistente: "Asistente virtual",
  otro: "Otros enlaces de WhatsApp",
} as const;
export type Origen = keyof typeof ORIGENES;
export type Dispositivo = "movil" | "escritorio";

export const esOrigen = (v: unknown): v is Origen => typeof v === "string" && v in ORIGENES;
export const esDispositivo = (v: unknown): v is Dispositivo => v === "movil" || v === "escritorio";

const claveDia = (dia: string) => `clics:dia:${dia}`;
const claveMes = (mes: string) => `clics:mes:${mes}`;

/** Suma un clic de WhatsApp. Nunca lanza errores. */
export async function registrarClic(origen: Origen, dispositivo: Dispositivo): Promise<void> {
  try {
    const dia = fechaChile(new Date());
    const mes = dia.slice(0, 7);
    const comandos: ComandoRedis[] = [];
    for (const clave of [claveDia(dia), claveMes(mes)]) {
      comandos.push(["HINCRBY", clave, `whatsapp:${dispositivo}`, 1]);
      comandos.push(["HINCRBY", clave, `origen:${origen}:${dispositivo}`, 1]);
    }
    comandos.push(["EXPIRE", claveDia(dia), 60 * 60 * 24 * 120]);
    comandos.push(["EXPIRE", claveMes(mes), 60 * 60 * 24 * 800]);
    await redisLote(comandos);
  } catch {
    /* contar es secundario */
  }
}

export type ContadoresClics = Record<string, number>;
export type ResumenClics = {
  disponible: boolean;
  mes: string;
  mesAnterior: string;
  hoy: ContadoresClics;
  esteMes: ContadoresClics;
  mesPasado: ContadoresClics;
  dias: { dia: string; c: ContadoresClics }[];
  origenes: Record<string, string>;
};

function aContadores(fila: unknown): ContadoresClics {
  const salida: ContadoresClics = {};
  if (!Array.isArray(fila)) return salida;
  for (let i = 0; i + 1 < fila.length; i += 2) salida[String(fila[i])] = Number(fila[i + 1]);
  return salida;
}

export async function leerClics(): Promise<ResumenClics> {
  const ahora = new Date();
  const hoyFecha = fechaChile(ahora);
  const mes = hoyFecha.slice(0, 7);
  const [a, m] = mes.split("-").map(Number);
  const mesAnterior = m === 1 ? `${a - 1}-12` : `${a}-${String(m - 1).padStart(2, "0")}`;
  const dias = Array.from({ length: 14 }, (_, i) => fechaChile(new Date(ahora.getTime() - i * 86_400_000)));
  const vacio: ResumenClics = {
    disponible: false,
    mes,
    mesAnterior,
    hoy: {},
    esteMes: {},
    mesPasado: {},
    dias: dias.map((dia) => ({ dia, c: {} })),
    origenes: ORIGENES,
  };
  const r = await redisLote([
    ["HGETALL", claveMes(mes)],
    ["HGETALL", claveMes(mesAnterior)],
    ...dias.map((d): ComandoRedis => ["HGETALL", claveDia(d)]),
  ]);
  if (!r) return vacio;
  const porDia = dias.map((dia, i) => ({ dia, c: aContadores(r[2 + i]) }));
  return { ...vacio, disponible: true, esteMes: aContadores(r[0]), mesPasado: aContadores(r[1]), hoy: porDia[0].c, dias: porDia };
}
