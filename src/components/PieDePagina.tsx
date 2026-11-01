import Image from "next/image";
import Link from "next/link";
import { fmt, ruta, type Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { variables } from "@/i18n/servidor";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
  logosExternos,
} from "@/lib/empresa";
import { datoPublico, enlaceTelefono, enlaceWhatsApp } from "@/lib/utilidades";
import ContadorVisitas from "./ContadorVisitas";
import EnlaceRed from "./EnlaceRed";
import { IconoChat, IconoNavegar, IconoPin, IconoRed, IconoTelefono } from "./Iconos";
import Rayo from "./Rayo";
import SelectorDeIdioma from "./SelectorDeIdioma";

export default function PieDePagina({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  const v = variables(d);
  const correo = datoPublico(empresa.correo);
  const telefono = datoPublico(empresa.telefono);
  const enlaceTel = enlaceTelefono(empresa.whatsapp);
  const wa = enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeConsulta);

  const enlacesSitio = [
    { href: ruta(lang, "/servicios"), texto: d.nav.servicios },
    { href: ruta(lang, "/servicio-tecnico"), texto: d.tecnico.titulo },
    { href: ruta(lang, "/proceso"), texto: d.nav.proceso },
    { href: ruta(lang, "/#trayectoria"), texto: d.nav.trayectoria },
    { href: ruta(lang, "/#preguntas"), texto: d.nav.preguntasLarga },
    { href: ruta(lang, "/contacto"), texto: d.nav.contacto },
    { href: ruta(lang, "/portal"), texto: d.nav.portal },
    { href: ruta(lang, "/privacidad"), texto: d.nav.privacidad },
  ];

  return (
    <footer className="relative mt-0 bg-noche text-white/85">
      {/* Llamado a la acción antes de las columnas */}
      <div className="relative overflow-hidden bg-azul">
        <Rayo className="pointer-events-none absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 text-white/10 sm:right-10 sm:h-80 sm:w-80" />
        <div className="contenedor relative flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-titulo text-3xl font-bold text-white sm:text-4xl">{d.pie.titulo}</h2>
            <p className="mt-2 max-w-xl text-lg text-white/90">{fmt(d.pie.texto, v)}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="boton">
                <IconoChat className="h-5 w-5" />
                {d.pie.whatsapp}
              </a>
            )}
            {enlaceTel && (
              <a href={enlaceTel} className="boton-claro">
                <IconoTelefono className="h-5 w-5" />
                {d.pie.llamar}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="contenedor grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/logo/logo-reverso-320.png"
            alt={empresa.nombreCompleto}
            width={320}
            height={195}
            className="h-24 w-auto"
          />
          <p className="mt-5 max-w-sm">{d.comun.eslogan}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <EnlaceRed
              href={empresa.linkedin}
              nombre="LinkedIn"
              etiqueta={d.pie.linkedin}
              externo={d.comun.externo}
              logo={logosExternos.linkedin}
              iconoRespaldo={<IconoRed className="h-6 w-6" />}
            />
            <EnlaceRed
              href={enlaceWaze}
              nombre="Waze"
              etiqueta={d.pie.irWaze}
              externo={d.comun.externo}
              logo={logosExternos.waze}
              iconoRespaldo={<IconoNavegar className="h-6 w-6" />}
            />
          </div>
        </div>

        <nav aria-label={d.nav.pie} className="md:col-span-3">
          <p className="font-titulo text-lg font-semibold text-white">{d.nav.sitio}</p>
          <ul className="mt-4 space-y-2">
            {enlacesSitio.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="hover:text-white hover:underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-titulo text-lg font-semibold text-white">{d.nav.visitenos}</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <IconoPin className="mt-1 h-5 w-5 flex-shrink-0 text-peri" />
              <a
                href={enlaceMapa}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                {direccionCompleta}
              </a>
            </li>
            {telefono && (
              <li className="flex gap-3">
                <IconoTelefono className="mt-1 h-5 w-5 flex-shrink-0 text-peri" />
                {enlaceTel ? (
                  <a href={enlaceTel} className="hover:text-white hover:underline">
                    {telefono}
                  </a>
                ) : (
                  telefono
                )}
              </li>
            )}
            {correo && <li className="pl-8">{correo}</li>}
            <li className="pl-8">{d.comun.horario}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-sm text-white/70">
        <div className="contenedor flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {empresa.nombreCompleto}. {d.pie.derechos}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <SelectorDeIdioma lang={lang} claro arriba />
            <ContadorVisitas textos={d.contador} htmlLang={d.idioma.htmlLang} />
          </div>
        </div>
      </div>
    </footer>
  );
}
