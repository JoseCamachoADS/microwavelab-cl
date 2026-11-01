import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe } from "@/i18n/servidor";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  return metaPagina(lang, "/portal", obtenerDiccionario(lang).portal.meta.titulo, undefined, {
    indexar: false,
  });
}

export default async function Portal({ params }: Props) {
  const lang = await idiomaDe(params);
  const p = obtenerDiccionario(lang).portal;
  return (
    <>
      <CabeceraPagina titulo={p.titulo} bajada={p.bajada} />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <p className="panel max-w-xl bg-hielo p-6 text-grisazul">{p.nota}</p>
        </div>
      </section>
    </>
  );
}
