import type { Metadata } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import { empresa } from "@/lib/empresa";
import { INFO_ESTADO, LINEA_DE_TIEMPO } from "@/lib/estados";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Etapas de una reparación en Micro Wave Lab CL: recepción, diagnóstico, presupuesto, reparación, pruebas y entrega con garantía.",
};

export default function Proceso() {
  return (
    <>
      <CabeceraPagina
        titulo="Cómo trabajamos"
        bajada="Cada equipo pasa por las mismas etapas, para que usted sepa siempre en qué punto está su reparación."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          {/* Es una secuencia real, por eso lleva numeración */}
          <ol className="max-w-2xl">
            {LINEA_DE_TIEMPO.map((e, i) => (
              <li key={e} className="relative flex gap-5 pb-8 last:pb-0">
                {i < LINEA_DE_TIEMPO.length - 1 && (
                  <span
                    className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-0.5 bg-azul-100"
                    aria-hidden="true"
                  />
                )}
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center bg-azul font-titulo text-lg font-bold text-white [clip-path:polygon(0_0,calc(100%-9px)_0,100%_9px,100%_100%,9px_100%,0_calc(100%-9px))]">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-titulo text-xl font-bold text-noche">
                    {INFO_ESTADO[e].etiqueta}
                  </h2>
                  <p className="mt-1 text-grisazul">{INFO_ESTADO[e].descripcion}</p>
                  {e === "SOLICITUD_REPUESTO" && (
                    <p className="mt-1 text-sm text-grisazul">
                      Esta etapa solo ocurre si la reparación requiere un repuesto.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-2xl text-lg">
            Todas nuestras reparaciones tienen <strong>{empresa.garantiaMeses} meses de garantía</strong>.
          </p>
          <p className="mt-6">
            <Link href="/contacto" className="boton">
              Consultar por mi equipo
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
