import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";
import EnlaceRed from "@/components/EnlaceRed";
import { IconoChat, IconoNavegar, IconoPin, IconoReloj, IconoTelefono } from "@/components/Iconos";
import Mapa from "@/components/Mapa";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
  logosExternos,
} from "@/lib/empresa";
import { datoPublico, enlaceTelefono, enlaceWhatsApp } from "@/lib/utilidades";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctenos por teléfono, WhatsApp o visítenos en General Freire 80, La Cisterna.",
};

export default function Contacto() {
  const telefono = datoPublico(empresa.telefono);
  const correo = datoPublico(empresa.correo);
  const llamar = enlaceTelefono(empresa.whatsapp);
  const whatsapp = enlaceWhatsApp(
    empresa.whatsapp,
    "Hola, quisiera cotizar la reparación de un equipo."
  );

  return (
    <>
      <CabeceraPagina
        titulo="Contacto"
        bajada="Cuéntenos qué equipo necesita reparar y le responderemos a la brevedad."
      />
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
                    <span className="block text-base text-grisazul">
                      Llamadas, mensajes de texto y WhatsApp.
                    </span>
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
                {empresa.horario}
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="boton">
                  <IconoChat className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              )}
              <a href={enlaceMapa} target="_blank" rel="noopener noreferrer" className="boton-suave">
                <IconoPin className="h-5 w-5" />
                Google Maps
              </a>
              <EnlaceRed
                href={enlaceWaze}
                nombre="Waze"
                etiqueta="Waze"
                logo={logosExternos.waze}
                iconoRespaldo={<IconoNavegar className="h-5 w-5" />}
                className="boton-suave"
              />
            </div>
            <div className="panel mt-10 bg-hielo p-6">
              <h2 className="font-titulo text-lg font-bold text-noche">Formulario de cotización</h2>
              <p className="mt-2 text-grisazul">
                Se activará en la siguiente etapa, junto con el envío de correos. Mientras tanto,
                escríbanos por WhatsApp o llámenos.
              </p>
            </div>
          </div>
          <Mapa />
        </div>
      </section>
    </>
  );
}
