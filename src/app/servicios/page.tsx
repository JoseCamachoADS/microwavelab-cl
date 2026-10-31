import type { Metadata } from "next";
import Link from "next/link";
import { servicios } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Reparación de placas electrónicas, equipos industriales, médicos, domésticos y automotrices.",
};

export default function Servicios() {
  return (
    <section className="contenedor py-14">
      <h1 className="text-3xl font-bold text-marca-900">Servicios</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Atendemos equipos electrónicos de todo tipo, con foco en el área
        industrial.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((s) => (
          <article
            key={s.id}
            className="rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-marca-700">{s.titulo}</h2>
            <p className="mt-2 text-slate-600">{s.descripcion}</p>
          </article>
        ))}
      </div>
      <p className="mt-10">
        <Link href="/contacto" className="boton">
          Solicitar cotización
        </Link>
      </p>
    </section>
  );
}
