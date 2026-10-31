import type { Metadata } from "next";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
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
    <section className="contenedor py-14">
      <h1 className="text-3xl font-bold text-marca-900">Contacto</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Cuéntenos qué equipo necesita reparar y le responderemos a la brevedad.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <ul className="space-y-3 text-slate-700">
          {telefono && (
            <li>
              <strong>Teléfono:</strong>{" "}
              {llamar ? (
                <a className="text-marca-600 hover:underline" href={llamar}>
                  {telefono}
                </a>
              ) : (
                telefono
              )}
              <span className="block text-sm text-slate-500">
                Llamadas, mensajes de texto y WhatsApp.
              </span>
            </li>
          )}
          {correo && (
            <li>
              <strong>Correo:</strong>{" "}
              <a className="text-marca-600 hover:underline" href={`mailto:${correo}`}>
                {correo}
              </a>
            </li>
          )}
          <li>
            <strong>Dirección:</strong> {direccionCompleta}
          </li>
          <li>
            <strong>Horario:</strong> {empresa.horario}
          </li>
          <li className="flex flex-wrap gap-3 pt-2">
            {whatsapp && (
              <a
                className="boton"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </a>
            )}
            <a
              className="boton-secundario"
              href={enlaceMapa}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar (Google Maps)
            </a>
            <a
              className="boton-secundario"
              href={enlaceWaze}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar (Waze)
            </a>
          </li>
        </ul>

        <div className="rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-marca-700">
            Formulario de cotización
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Se activará en la siguiente etapa, junto con el envío de correos.
            Mientras tanto, escríbanos por WhatsApp o llámenos.
          </p>
        </div>
      </div>
    </section>
  );
}
