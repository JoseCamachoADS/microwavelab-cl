// Cálculo de la retención de las boletas de honorarios (Chile). Funciones puras: sirven en el navegador y en el servidor.
//
// Importante: las boletas de honorarios NO llevan IVA. Lo que se calcula es la retención de impuesto (segunda categoría)
// que el receptor de la boleta descuenta y paga al SII cuando es contribuyente que debe retener. La tasa sube por ley
// (Ley 21.133) según el año de EMISIÓN de la boleta. Las tasas son editables en /honorarios, por si la ley cambia.

export type TasaAnual = { anio: number; tasa: number };

/** Tasas del calendario vigente (SII): 2026 15,25 % · 2027 16 % · desde 2028 17 %. */
export const tasasIniciales: TasaAnual[] = [
  { anio: 2026, tasa: 15.25 },
  { anio: 2027, tasa: 16 },
  { anio: 2028, tasa: 17 },
];

export const CLAVE_HONORARIOS = "honorarios";

/** Ordena, quita repetidos y valores inválidos. Tasas con hasta 3 decimales, entre 0 y 100 (exclusive). */
export function limpiarTasas(valor: unknown): TasaAnual[] {
  if (!Array.isArray(valor)) return [];
  const porAnio = new Map<number, number>();
  for (const f of valor as { anio?: unknown; tasa?: unknown }[]) {
    const anio = Number(f?.anio);
    const tasa = Math.round(Number(f?.tasa) * 1000) / 1000;
    if (Number.isInteger(anio) && anio >= 2000 && anio <= 2100 && Number.isFinite(tasa) && tasa >= 0 && tasa < 100) {
      porAnio.set(anio, tasa);
    }
  }
  return [...porAnio].map(([anio, tasa]) => ({ anio, tasa })).sort((a, b) => a.anio - b.anio);
}

/** Tasa que corresponde a un año: la del último año de la tabla que no supere al pedido (la del primero si es anterior). */
export function tasaDelAnio(tasas: TasaAnual[], anio: number): number | null {
  if (tasas.length === 0) return null;
  let elegida = tasas[0];
  for (const t of tasas) if (t.anio <= anio) elegida = t;
  return elegida.tasa;
}

const milesima = (tasa: number) => Math.round(tasa * 1000); // 15,25 % → 15250

/** Retención sobre un monto bruto, redondeada al peso. */
export function retencionDeBruto(bruto: number, tasa: number): number {
  return Math.floor((bruto * milesima(tasa) + 50000) / 100000);
}

export type Resultado = { bruto: number; retencion: number; liquido: number; tasa: number };

export function desdeBruto(bruto: number, tasa: number, retiene: boolean): Resultado {
  const ret = retiene ? retencionDeBruto(bruto, tasa) : 0;
  return { bruto, retencion: ret, liquido: bruto - ret, tasa: retiene ? tasa : 0 };
}

/** Del monto líquido (lo que se recibe) al bruto que debe ir en la boleta. */
export function desdeLiquido(liquido: number, tasa: number, retiene: boolean): Resultado {
  if (!retiene) return desdeBruto(liquido, tasa, false);
  const aprox = Math.round(liquido / (1 - tasa / 100));
  // El redondeo puede dejar el líquido a $1: se busca el bruto cercano que lo deja exacto.
  for (const delta of [0, 1, -1, 2, -2]) {
    const r = desdeBruto(aprox + delta, tasa, true);
    if (r.liquido === liquido) return r;
  }
  return desdeBruto(aprox, tasa, true);
}
