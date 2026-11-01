import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";
import { fmt } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe } from "@/i18n/servidor";
import { empresa } from "@/lib/empresa";
import { datoPublico } from "@/lib/utilidades";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const m = obtenerDiccionario(lang).privacidad.meta;
  return metaPagina(lang, "/privacidad", m.titulo, m.descripcion);
}

export default async function Privacidad({ params }: Props) {
  const lang = await idiomaDe(params);
  const p = obtenerDiccionario(lang).privacidad;
  const correo = datoPublico(empresa.correo);
  const consultas = correo
    ? fmt(p.consultas.conCorreo, { correo, telefono: empresa.telefono })
    : fmt(p.consultas.sinCorreo, { telefono: empresa.telefono });
  const h2 = "font-titulo text-2xl font-bold text-noche";

  return (
    <>
      <CabeceraPagina titulo={p.titulo} bajada={p.bajada} />
      <section className="seccion tras-corte">
        <div className="contenedor max-w-3xl space-y-6 text-lg">
          <h2 className={h2}>{p.medimos.h}</h2>
          <p>{p.medimos.intro}</p>
          <ul className="list-disc space-y-2 pl-6">
            {p.medimos.items.map((i) => (
              <li key={i.b}>
                <strong>{i.b}</strong> {i.t}
              </li>
            ))}
          </ul>
          <h2 className={h2}>{p.contador.h}</h2>
          <p>{p.contador.p}</p>
          <h2 className={h2}>{p.traduccion.h}</h2>
          <p>{p.traduccion.p}</p>
          <h2 className={h2}>{p.noHacemos.h}</h2>
          <p>{p.noHacemos.p}</p>
          <h2 className={h2}>{p.cambiar.h}</h2>
          <p>{p.cambiar.p}</p>
          <h2 className={h2}>{p.consultas.h}</h2>
          <p>{consultas}</p>
        </div>
      </section>
    </>
  );
}
