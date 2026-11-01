import type { Metadata } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import EnlaceRed from "@/components/EnlaceRed";
import { IconoChat, IconoNavegar, IconoPin, IconoReloj, IconoTelefono } from "@/components/Iconos";
import Mapa from "@/components/Mapa";
import { ruta } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe } from "@/i18n/servidor";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
  logosExternos,
} from "@/lib/empresa";
import { datoPublico, enlaceTelefono, enlaceWhatsApp } from "@/lib/utilidades";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const m = obtenerDiccionario(lang).contacto.meta;
  return metaPagina(lang, "/contacto", m.titulo, m.descripcion);
}

export default async function Contacto({ params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  const c = d.contacto;
  const telefono = datoPublico(empresa.telefono);
  const correo = datoPublico(empresa.correo);
  const llamar = enlaceTelefono(empresa.whatsapp);
  const whatsapp = enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeCotizar);

  return (
    <>
      <CabeceraPagina titulo={c.titulo} bajada={c.bajada} />
      <section className="seccion tras-corte">
        <div className="contenedor grid gap-12 md:grid-cols-2">
          <div>
            <ul className="space-y-5 text-lg">
              {telefono && (
                <li className="flex gap-3">
                  <IconoTelefono className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                  <span>
                    {llamar ? (
                      <a className="enlace" href={llamar}>
                        {telefono}
                      </a>
                    ) : (
                      telefono
                    )}
                    <span className="block text-base text-grisazul">{c.telefonoNota}</span>
                  </span>
                </li>
              )}
              {correo && (
                <li className="pl-9">
                  <a className="enlace" href={`mailto:${correo}`}>
                    {correo}
                  </a>
                </li>
              )}
              <li className="flex gap-3">
                <IconoPin className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                {direccionCompleta}
              </li>
              <li className="flex gap-3">
                <IconoReloj className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                {d.comun.horario}
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="boton">
                  <IconoChat className="h-5 w-5" />
                  {c.whatsapp}
                </a>
              )}
              <a href={enlaceMapa} target="_blank" rel="noopener noreferrer" className="boton-suave">
                <IconoPin className="h-5 w-5" />
                {c.maps}
              </a>
              <EnlaceRed
                href={enlaceWaze}
                nombre="Waze"
                etiqueta={c.waze}
                externo={d.comun.externo}
                logo={logosExternos.waze}
                iconoRespaldo={<IconoNavegar className="h-5 w-5" />}
                className="boton-suave"
              />
            </div>
            <div className="panel mt-10 bg-hielo p-6">
              <h2 className="font-titulo text-lg font-bold text-noche">{c.formulario.titulo}</h2>
              <p className="mt-2 text-grisazul">{c.formulario.texto}</p>
              <p className="mt-4">
                <Link href={ruta(lang, "/servicio-tecnico#cotizar")} className="boton-azul">
                  {c.formulario.ir}
                </Link>
              </p>
            </div>
          </div>
          <Mapa lang={lang} />
        </div>
      </section>
    </>
  );
}
