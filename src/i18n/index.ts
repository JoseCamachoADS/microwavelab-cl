import { en } from "./en";
import { es, type Diccionario } from "./es";
import { ger } from "./ger";
import type { Idioma } from "./config";

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en, ger };

export function obtenerDiccionario(lang: Idioma): Diccionario {
  return DICCIONARIOS[lang];
}
export type { Diccionario };
