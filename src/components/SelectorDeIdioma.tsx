import { IDIOMAS, fmt, type Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import SelectorIdioma from "./SelectorIdioma";

/** Prepara las opciones del selector con los textos del idioma actual. */
export default function SelectorDeIdioma({
  lang,
  claro,
  arriba,
  izquierda,
}: {
  lang: Idioma;
  claro?: boolean;
  arriba?: boolean;
  izquierda?: boolean;
}) {
  const d = obtenerDiccionario(lang);
  const opciones = IDIOMAS.map((l) => {
    const i = obtenerDiccionario(l).idioma;
    return {
      lang: l,
      corto: i.corto,
      nombre: i.nombre,
      htmlLang: i.htmlLang,
      etiqueta: fmt(d.idioma.cambiarA, { idioma: i.nombre }),
    };
  });
  return (
    <SelectorIdioma
      actual={lang}
      opciones={opciones}
      nombre={d.idioma.selector}
      claro={claro}
      arriba={arriba}
      izquierda={izquierda}
    />
  );
}
