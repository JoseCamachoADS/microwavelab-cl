import type { Metadata } from "next";
import { empresa } from "@/lib/empresa";
import { datoPublico, enlaceWhatsApp } from "@/lib/utilidades";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Solicite una cotización o contáctenos.",
};

export default function Contacto() {
  const telefono = datoPublico(empresa.telefono);
  const correo = datoPublico(empresa.correo);
  const direccion = datoPublico(empresa.direccion);
  const horario = datoPublico(empresa.horario);
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
          {telefono && <li><strong>Teléfono:</strong> {telefono}</li>}
          {correo && (
            <li>
              <strong>Correo:</strong>{" "}
              <a className="text-marca-600 hover:underline" href={`mailto:${correo}`}>
                {correo}
              </a>
            </li>
          )}
          {direccion && <li><strong>Dirección:</strong> {direccion}</li>}
          {horario && <li><strong>Horario:</strong> {horario}</li>}
          {whatsapp && (
            <li>
              <a className="boton mt-2" href={whatsapp}>
                Escribir por WhatsApp
              </a>
            </li>
          )}
          {!telefono && !correo && !direccion && (
            <li className="rounded-lg border border-dashed border-slate-300 p-4 text-slate-500">
              Los datos de contacto se completan en <code>src/lib/empresa.ts</code>.
            </li>
          )}
        </ul>

        <div className="rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-marca-700">
            Formulario de cotización
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Se activará en la siguiente etapa, junto con el envío de correos.
          </p>
        </div>
      </div>
    </section>
  );
}
