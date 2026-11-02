import Image from "next/image";
import Link from "next/link";
import { fmt, ruta, type Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { empresa } from "@/lib/empresa";
import { hayMultimedia } from "@/lib/galeria";
import BarraSuperior from "./BarraSuperior";
import MenuMovil from "./MenuMovil";
import SelectorDeIdioma from "./SelectorDeIdioma";

export default function Encabezado({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  const enlaces = [
    { href: ruta(lang, "/servicios"), texto: d.nav.servicios },
    { href: ruta(lang, "/proceso"), texto: d.nav.proceso },
    ...(hayMultimedia ? [{ href: ruta(lang, "/multimedia"), texto: d.nav.multimedia }] : []),
    { href: ruta(lang, "/#trayectoria"), texto: d.nav.trayectoria },
    { href: ruta(lang, "/#preguntas"), texto: d.nav.preguntas },
    { href: ruta(lang, "/contacto"), texto: d.nav.contacto },
  ];
  const portal = { href: ruta(lang, "/portal"), texto: d.nav.portal };

  return (
    <>
      <BarraSuperior lang={lang} />
      <header className="sticky top-0 z-40 border-b border-azul-100 bg-white/95 backdrop-blur">
        <div className="contenedor relative flex items-center justify-between gap-4 py-2">
          <Link
            href={ruta(lang, "/")}
            aria-label={fmt(d.nav.inicioDe, { nombre: empresa.nombreCompleto })}
          >
            <Image
              src="/logo/logo-color-320.png"
              alt={empresa.nombreCompleto}
              width={320}
              height={195}
              priority
              className="h-14 w-auto sm:h-16"
            />
          </Link>
          <nav aria-label={d.nav.principal} className="hidden items-center gap-6 md:flex">
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="font-titulo text-base font-semibold text-noche hover:text-rojo-accion"
              >
                {e.texto}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <SelectorDeIdioma lang={lang} />
            <Link href={portal.href} className="boton">
              {portal.texto}
            </Link>
          </div>
          <MenuMovil
            enlaces={enlaces}
            portal={portal}
            textos={{ abrir: d.nav.menuAbrir, cerrar: d.nav.menuCerrar }}
            principal={d.nav.principal}
          >
            <SelectorDeIdioma lang={lang} izquierda />
          </MenuMovil>
        </div>
      </header>
    </>
  );
}
