import type { Metadata } from "next";
import Link from "next/link";
import { empresa } from "@/lib/empresa";
import { INFO_ESTADO, LINEA_DE_TIEMPO } from "@/lib/estados";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Etapas de una reparación en Micro Wave Lab CL: recepción, diagnóstico, presupuesto, reparación, pruebas y entrega con garantía.",
};

export default function Proceso() {
  return (
    <section className="contenedor py-14">
      <h1 className="text-3xl font-bold text-marca-900">Cómo trabajamos</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Cada equipo pasa por las mismas etapas, para que usted sepa siempre en
        qué punto está su reparación.
      </p>

      <ol className="mt-8 max-w-2xl space-y-4">
        {LINEA_DE_TIEMPO.map((e, i) => (
          <li key={e} className="flex gap-4 rounded-xl border border-slate-200 p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marca-600 font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="text-lg font-bold text-marca-700">
                {INFO_ESTADO[e].etiqueta}
              </h2>
              <p className="mt-1 text-slate-600">{INFO_ESTADO[e].descripcion}</p>
              {e === "SOLICITUD_REPUESTO" && (
                <p className="mt-1 text-sm text-slate-500">
                  Esta etapa solo ocurre si la reparación requiere un repuesto.
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-slate-700">
        Todas nuestras reparaciones tienen {empresa.garantiaMeses} meses de
        garantía.
      </p>
      <p className="mt-6">
        <Link href="/contacto" className="boton">
          Consultar por mi equipo
        </Link>
      </p>
    </section>
  );
}
