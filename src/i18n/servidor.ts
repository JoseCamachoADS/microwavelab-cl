import { notFound } from "next/navigation";
import { empresa } from "@/lib/empresa";
import { esIdioma, type Idioma } from "./config";
import type { Diccionario } from "./es";

/** Idioma de la página a partir de los parámetros de la ruta; responde 404 si no existe. */
export async function idiomaDe(params: Promise<{ lang: string }>): Promise<Idioma> {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return lang;
}

/** Variables comunes para los textos del diccionario. */
export function variables(d: Diccionario): Record<string, string | number> {
  return {
    anios: empresa.aniosTrayectoria,
    garantia: empresa.garantiaMeses,
    telefono: empresa.telefono,
    calle: empresa.direccionCalle,
    comuna: empresa.comuna,
    nombre: empresa.nombreCompleto,
    horario: d.comun.horario,
    horarioMin: d.comun.horario.toLowerCase(),
  };
}
