import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";
import GaleriaFotos from "@/components/GaleriaFotos";
import PublicacionesLinkedIn from "@/components/PublicacionesLinkedIn";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe } from "@/i18n/servidor";
import { empresa, servicios } from "@/lib/empresa";
import { enlacesValidos, fotos, publicacionesValidas, textoEnlace, textoFoto } from "@/lib/galeria";
import { fmt } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const m = obtenerDiccionario(lang).multimedia.meta;
  return metaPagina(lang, "/multimedia", m.titulo, m.descripcion);
}

export default async function Multimedia({ params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  const t = d.multimedia;
  const enlaceLinkedIn = `${empresa.linkedin}/posts/`;
  const h2 = "font-titulo text-2xl font-bold text-noche sm:text-3xl";

  const fotosLista = fotos.map((f) => ({ archivo: f.archivo, categoria: f.categoria, texto: textoFoto(f, lang) }));
  const categorias = servicios.map((s) => ({ id: s.id, nombre: d.servicios.items[s.id].titulo }));

  return (
    <>
      <CabeceraPagina titulo={t.titulo} bajada={t.bajada} />

      <section className="seccion tras-corte">
        <div className="contenedor">
          <h2 className={h2}>{t.fotos.h}</h2>
          {fotosLista.length > 0 ? (
            <>
              <p className="mt-3 max-w-2xl text-lg text-grisazul">{t.fotos.intro}</p>
              <div className="mt-8">
                <GaleriaFotos
                  fotos={fotosLista}
                  categorias={categorias}
                  textos={{
                    todas: t.fotos.todas,
                    filtro: t.fotos.filtro,
                    ampliar: t.fotos.ampliar,
                    cerrar: t.fotos.cerrar,
                    anterior: t.fotos.anterior,
                    siguiente: t.fotos.siguiente,
                    contador: t.fotos.contador,
                  }}
                />
              </div>
            </>
          ) : (
            <p className="mt-3 max-w-2xl text-lg text-grisazul">{t.fotos.vacio}</p>
          )}

          <h2 className={h2 + " mt-20"}>{t.linkedin.h}</h2>
          <p className="mt-3 max-w-2xl text-lg text-grisazul">{t.linkedin.intro}</p>
          {publicacionesValidas.length > 0 && (
            <div className="mt-8">
              <PublicacionesLinkedIn
                items={publicacionesValidas.map((p) => ({ urn: p.urn, alto: p.alto ?? 560 }))}
                textos={{ cargar: t.linkedin.cargar, aviso: t.linkedin.aviso, abrir: t.linkedin.abrir, titulo: t.linkedin.tituloPublicacion }}
              />
            </div>
          )}
          {enlacesValidos.length > 0 && (
            <>
              <h3 className="mt-12 font-titulo text-xl font-bold text-noche">{t.linkedin.mas}</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {enlacesValidos.map((e, i) => (
                  <li key={e.url} className="border-l-4 border-rojo bg-hielo p-5">
                    <p className="font-titulo text-lg font-semibold text-noche">
                      {textoEnlace(e, lang) ?? fmt(t.linkedin.publicacionN, { n: i + 1 })}
                    </p>
                    <p className="mt-3">
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="enlace">
                        {t.linkedin.abrir}
                        <span className="sr-only"> {d.comun.externo}</span>
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-8">
            <a href={enlaceLinkedIn} target="_blank" rel="noopener noreferrer" className="boton-azul">
              {t.linkedin.verTodas}
              <span className="sr-only"> {d.comun.externo}</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
