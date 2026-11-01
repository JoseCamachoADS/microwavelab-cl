import type { Metadata } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/CabeceraPagina";
import { IconoServicio } from "@/components/Iconos";
import { ruta } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe } from "@/i18n/servidor";
import { servicios } from "@/lib/empresa";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const m = obtenerDiccionario(lang).servicios.meta;
  return metaPagina(lang, "/servicios", m.titulo, m.descripcion);
}

export default async function Servicios({ params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  return (
    <>
      <CabeceraPagina titulo={d.servicios.titulo} bajada={d.servicios.bajada} />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <article key={s.id} className="panel bg-hielo p-7">
                <IconoServicio id={s.id} className="h-10 w-10 text-rojo-accion" />
                <h2 className="mt-5 font-titulo text-xl font-bold text-noche">
                  {d.servicios.items[s.id].titulo}
                </h2>
                <p className="mt-2 text-grisazul">{d.servicios.items[s.id].descripcion}</p>
              </article>
            ))}
          </div>
          <p className="mt-12">
            <Link href={ruta(lang, "/servicio-tecnico#cotizar")} className="boton">
              {d.servicios.solicitar}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
