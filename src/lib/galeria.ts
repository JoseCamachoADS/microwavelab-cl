// Contenido de la sección Multimedia (/multimedia): fotos de reparaciones y publicaciones de LinkedIn.
// Para agregar algo, solo se edita este archivo (y se copian las fotos en public/galeria/).
// Mientras las listas estén vacías, la página muestra un aviso y el enlace a LinkedIn,
// y el enlace "Multimedia" no aparece en el menú.

import type { Idioma } from "@/i18n/config";

export type FotoGaleria = {
  /** Ruta de la foto dentro de public/, por ejemplo "/galeria/variador-antes.jpg". */
  archivo: string;
  /** Tipo de equipo (id de los servicios de empresa.ts: tarjetas, industrial, fuentes, monitores, computadoras, otros). */
  categoria: string;
  /** Descripción corta. Si falta el inglés o el alemán, se usa el español. */
  texto: { es: string; en?: string; ger?: string };
};

export type PublicacionLinkedIn = {
  /** Identificador de la publicación, por ejemplo "urn:li:share:7123456789012345678". Ver docs/VERSIONES.md (v1.7.0). */
  urn: string;
  /** Alto del recuadro en píxeles (opcional; por defecto 560). */
  alto?: number;
};

/**
 * Fotos de reparaciones. Ejemplo:
 *   { archivo: "/galeria/variador.jpg", categoria: "industrial", texto: { es: "Variador de frecuencia reparado", en: "Repaired frequency drive", ger: "Reparierter Frequenzumrichter" } },
 */
export const fotos: readonly FotoGaleria[] = [
  {
    archivo: "/galeria/tarjeta-control-modulo-potencia.jpg",
    categoria: "tarjetas",
    texto: {
      es: "Tarjeta de control industrial con módulo de potencia",
      en: "Industrial control board with power module",
      ger: "Industrielle Steuerplatine mit Leistungsmodul",
    },
  },
  {
    archivo: "/galeria/fuente-alimentacion-industrial.jpg",
    categoria: "fuentes",
    texto: {
      es: "Fuente de alimentación industrial con su tarjeta de conexiones",
      en: "Industrial power supply with its connection board",
      ger: "Industrielles Netzteil mit Anschlussplatine",
    },
  },
  {
    archivo: "/galeria/reles-cableado-industrial-1.jpg",
    categoria: "industrial",
    texto: {
      es: "Módulo de relés y cableado de un equipo industrial",
      en: "Relay module and wiring of an industrial unit",
      ger: "Relaismodul und Verkabelung eines Industriegeräts",
    },
  },
  {
    archivo: "/galeria/reles-cableado-industrial-2.jpg",
    categoria: "industrial",
    texto: {
      es: "Equipo industrial abierto durante la revisión",
      en: "Industrial unit opened during inspection",
      ger: "Geöffnetes Industriegerät während der Prüfung",
    },
  },
  {
    archivo: "/galeria/tarjeta-cara-soldaduras.jpg",
    categoria: "tarjetas",
    texto: {
      es: "Cara de soldaduras de una tarjeta, con una zona quemada",
      en: "Solder side of a board, with a burnt area",
      ger: "Lötseite einer Platine mit verbrannter Stelle",
    },
  },
  {
    archivo: "/galeria/tarjeta-reles-bornes.jpg",
    categoria: "tarjetas",
    texto: {
      es: "Tarjeta de potencia con relés y bornes de conexión",
      en: "Power board with relays and terminal blocks",
      ger: "Leistungsplatine mit Relais und Anschlussklemmen",
    },
  },
];

/**
 * Publicaciones de LinkedIn (se muestran dentro del sitio). Ejemplo:
 *   { urn: "urn:li:share:7123456789012345678" },
 */
export const publicaciones: readonly PublicacionLinkedIn[] = [
  { urn: "urn:li:ugcPost:7433957225179635712" },
  { urn: "urn:li:ugcPost:7432134530410500096" },
  { urn: "urn:li:share:7432136520989483011" },
];

/**
 * Publicaciones que LinkedIn no deja insertar en otros sitios: se muestran como tarjeta con enlace.
 * `texto` es opcional (una línea que cuente de qué trata); sin él se muestra "Publicación N en LinkedIn".
 * Solo se aceptan enlaces cortos de LinkedIn (https://lnkd.in/p/...).
 */
export type EnlaceLinkedIn = {
  url: string;
  texto?: { es: string; en?: string; ger?: string };
};

export const enlacesLinkedIn: readonly EnlaceLinkedIn[] = [
  { url: "https://lnkd.in/p/dATqMRTH" },
  { url: "https://lnkd.in/p/dEFcQjAg" },
  { url: "https://lnkd.in/p/dm_NEEPU" },
  { url: "https://lnkd.in/p/d-rcBa3r" },
  { url: "https://lnkd.in/p/dE4yi3cJ" },
  { url: "https://lnkd.in/p/d4xZuDu6" },
  { url: "https://lnkd.in/p/dne_P7ep" },
  { url: "https://lnkd.in/p/dQwUrXtB" },
  { url: "https://lnkd.in/p/d_Mz8NHb" },
  { url: "https://lnkd.in/p/dnDjpEgj" },
];

export const hayMultimedia = fotos.length > 0 || publicaciones.length > 0 || enlacesLinkedIn.length > 0;

const URN_VALIDO = /^urn:li:(share|ugcPost|activity):\d{10,25}$/;
export const publicacionesValidas = publicaciones.filter((p) => URN_VALIDO.test(p.urn));

const ENLACE_VALIDO = /^https:\/\/lnkd\.in\/p\/[A-Za-z0-9_-]{4,40}$/;
export const enlacesValidos = enlacesLinkedIn.filter((e) => ENLACE_VALIDO.test(e.url));

export function textoEnlace(e: EnlaceLinkedIn, lang: Idioma): string | null {
  if (!e.texto) return null;
  return (lang === "en" ? e.texto.en : lang === "ger" ? e.texto.ger : e.texto.es) ?? e.texto.es;
}

export function textoFoto(f: FotoGaleria, lang: Idioma): string {
  return (lang === "en" ? f.texto.en : lang === "ger" ? f.texto.ger : f.texto.es) ?? f.texto.es;
}
