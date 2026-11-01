import type { Metadata } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import { fmt, ruta } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe, variables } from "@/i18n/servidor";
import { LINEA_DE_TIEMPO } from "@/lib/estados";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const m = obtenerDiccionario(lang).proceso.meta;
  return metaPagina(lang, "/proceso", m.titulo, m.descripcion);
}

export default async function Proceso({ params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  const v = variables(d);
  const p = d.proceso;
  return (
    <>
      <CabeceraPagina titulo={p.titulo} bajada={p.bajada} />
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
                  <h2 className="font-titulo text-xl font-bold text-noche">{p.pasos[e].etiqueta}</h2>
                  <p className="mt-1 text-grisazul">{p.pasos[e].descripcion}</p>
                  {e === "SOLICITUD_REPUESTO" && (
                    <p className="mt-1 text-sm text-grisazul">{p.notaRepuesto}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-2xl text-lg">
            {p.garantiaAntes}
            <strong>{fmt(p.garantiaNegrita, v)}</strong>
            {p.garantiaDespues}
          </p>
          <p className="mt-6">
            <Link href={ruta(lang, "/contacto")} className="boton">
              {p.cta}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
