// Clima de Santiago: interpreta el símbolo que entrega MET Norway (servicio meteorológico de Noruega,
// gratuito, datos con licencia CC BY 4.0: hay que mencionar la fuente, ver el pie de página).

export type CategoriaClima =
  | "despejado"
  | "parcial"
  | "nublado"
  | "niebla"
  | "lluvia"
  | "tormenta"
  | "nieve"
  | "aguanieve";

export type ClimaActual = { ok: true; temp: number; categoria: CategoriaClima; noche: boolean } | { ok: false };

/** Convierte un código como "partlycloudy_night" o "lightrainshowers_day" en una categoría simple. */
export function interpretarSimbolo(codigo: string): { categoria: CategoriaClima; noche: boolean } {
  const noche = codigo.endsWith("_night");
  const base = codigo.replace(/_(day|night|polartwilight)$/, "");
  let categoria: CategoriaClima = "nublado";
  if (base.includes("thunder")) categoria = "tormenta";
  else if (base.includes("sleet")) categoria = "aguanieve";
  else if (base.includes("snow")) categoria = "nieve";
  else if (base.includes("rain")) categoria = "lluvia";
  else if (base.includes("fog")) categoria = "niebla";
  else if (base === "clearsky") categoria = "despejado";
  else if (base === "fair" || base === "partlycloudy") categoria = "parcial";
  return { categoria, noche };
}
