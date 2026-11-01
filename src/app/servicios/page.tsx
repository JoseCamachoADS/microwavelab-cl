import type { Metadata } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import { IconoServicio } from "@/components/Iconos";
import { servicios } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Reparación de placas electrónicas, equipos industriales, médicos, domésticos y automotrices.",
};

export default function Servicios() {
  return (
    <>
      <CabeceraPagina
        titulo="Servicios"
        bajada="Atendemos equipos electrónicos de todo tipo, con foco en el área industrial."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <article key={s.id} className="panel bg-hielo p-7">
                <IconoServicio id={s.id} className="h-10 w-10 text-rojo-accion" />
                <h2 className="mt-5 font-titulo text-xl font-bold text-noche">{s.titulo}</h2>
                <p className="mt-2 text-grisazul">{s.descripcion}</p>
              </article>
            ))}
          </div>
          <p className="mt-12">
            <Link href="/contacto" className="boton">
              Solicitar cotización
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
