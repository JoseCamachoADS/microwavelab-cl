import type { Metadata } from "next";
import Link from "next/link";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
  logosExternos,
  servicios,
} from "@/lib/empresa";
import EnlaceRed from "@/components/EnlaceRed";
import {
  IconoChat,
  IconoCheck,
  IconoMas,
  IconoNavegar,
  IconoPin,
  IconoServicio,
  IconoTelefono,
} from "@/components/Iconos";
import ClientesConfian from "@/components/ClientesConfian";
import Mapa from "@/components/Mapa";
import Rayo from "@/components/Rayo";
import Resenas from "@/components/Resenas";
import { fmt, ruta } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe, variables } from "@/i18n/servidor";
import { datoPublico, enlaceTelefono, enlaceWhatsApp } from "@/lib/utilidades";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  // El título de la portada es el predeterminado del layout.
  return { ...metaPagina(lang, "/", `${empresa.nombre} | ${d.meta.titulo}`), title: { absolute: `${empresa.nombre} | ${d.meta.titulo}` } };
}

export default async function Inicio({ params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  const v = variables(d);
  const whatsapp = enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeCotizar);
  const urgencia = enlaceWhatsApp(empresa.whatsapp, d.comun.mensajeUrgencia);
  const llamar = enlaceTelefono(empresa.whatsapp);
  const telefono = datoPublico(empresa.telefono);
  const destacados = servicios.filter((s) => s.destacado);
  const h = d.inicio;

  return (
    <>
      {/* Portada */}
      <section className="seccion corte-abajo relative overflow-hidden bg-noche text-white">
        <Rayo className="anim-rayo pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-rojo opacity-90 sm:-right-10 md:h-[40rem] md:w-[40rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-noche via-noche/90 to-transparent" aria-hidden="true" />
        <div className="contenedor relative">
          <div className="max-w-2xl">
            <p className="anim-texto font-titulo text-lg font-semibold text-peri">
              {fmt(h.hero.kicker, v)}
            </p>
            <h1 className="anim-texto anim-texto-2 mt-4 font-titulo text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              {h.hero.titulo}
            </h1>
            <p className="anim-texto anim-texto-3 mt-6 max-w-xl text-lg text-white/85">
              {fmt(h.hero.texto, v)}
            </p>
            <div className="anim-texto anim-texto-3 mt-9 flex flex-col gap-3 sm:flex-row">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="boton">
                  <IconoChat className="h-5 w-5" />
                  {h.hero.cotizar}
                </a>
              )}
              {llamar && telefono && (
                <a href={llamar} className="boton-claro">
                  <IconoTelefono className="h-5 w-5" />
                  {fmt(h.hero.llamar, { telefono })}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="seccion tras-corte antes-corte">
        <div className="contenedor">
          <h2 className="titulo-seccion">{h.queReparamos.titulo}</h2>
          <p className="texto-medida mt-3 text-lg text-grisazul">{h.queReparamos.texto}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {destacados.map((s) => (
              <article key={s.id} className="panel bg-hielo p-7">
                <IconoServicio id={s.id} className="h-10 w-10 text-rojo-accion" />
                <h3 className="mt-5 font-titulo text-xl font-bold text-noche">
                  {d.servicios.items[s.id].titulo}
                </h3>
                <p className="mt-2 text-grisazul">{d.servicios.items[s.id].descripcion}</p>
              </article>
            ))}
          </div>
          <p className="mt-8">
            <Link href={ruta(lang, "/servicios")} className="enlace">
              {h.queReparamos.ver}
            </Link>
          </p>
          {/* Reparaciones de emergencia */}
          <div
            id="urgencias"
            className="panel relative mt-16 scroll-mt-24 overflow-hidden bg-noche p-8 text-white [--c:28px] md:p-12"
          >
            <Rayo className="pointer-events-none absolute -right-12 -top-10 h-64 w-64 text-rojo/25 md:h-80 md:w-80" />
            <div className="relative">
              <h2 className="font-titulo text-3xl font-bold leading-tight sm:text-4xl">{h.urgencias.titulo}</h2>
              <p className="mt-4 max-w-2xl text-lg text-white/90">{h.urgencias.bajada}</p>
              <ul className="mt-8 grid gap-6 md:grid-cols-3">
                {h.urgencias.puntos.map((p) => (
                  <li key={p.t} className="border-l-4 border-rojo pl-4">
                    <strong className="block font-titulo text-lg text-white">{p.t}</strong>
                    <span className="mt-1 block text-white/80">{p.d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl font-semibold text-peri">{fmt(h.urgencias.respaldo, v)}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {urgencia && (
                  <a href={urgencia} target="_blank" rel="noopener noreferrer" className="boton">
                    <IconoChat className="h-5 w-5" />
                    {h.urgencias.cta}
                  </a>
                )}
                {llamar && (
                  <a href={llamar} className="boton-claro">
                    <IconoTelefono className="h-5 w-5" />
                    {h.urgencias.llamar}
                  </a>
                )}
              </div>
            </div>
          </div>
          <ClientesConfian lang={lang} />
        </div>
      </section>

      {/* Trayectoria */}
      <section id="trayectoria" className="seccion corte-arriba corte-abajo relative overflow-hidden bg-azul text-white">
        <Rayo className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 text-white/10" />
        <div className="contenedor relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-titulo text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {fmt(h.trayectoria.titulo, v)}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/90">{d.comun.descripcionEmpresa}</p>
            <div className="mt-8">
              <EnlaceRed
                href={empresa.linkedin}
                nombre="LinkedIn"
                etiqueta={h.trayectoria.linkedin}
                externo={d.comun.externo}
                logo={logosExternos.linkedin}
                iconoRespaldo={<IconoCheck className="h-6 w-6" />}
              />
            </div>
          </div>
          <div className="panel bg-white p-8 text-tinta">
            <h3 className="font-titulo text-xl font-bold text-noche">{h.trayectoria.porQue}</h3>
            <ul className="mt-5 space-y-4">
              {h.trayectoria.puntos.map((p) => (
                <li key={p.t} className="flex gap-3">
                  <IconoCheck className="mt-1 h-5 w-5 flex-shrink-0 text-rojo-accion" />
                  <span>
                    <strong className="text-noche">{p.t}:</strong> {fmt(p.d, v)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href={ruta(lang, "/proceso")} className="enlace">
                {h.trayectoria.proceso}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="seccion tras-corte antes-corte">
        <div className="contenedor">
          <h2 className="titulo-seccion">{h.ubicacion.titulo}</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <ul className="space-y-4 text-lg">
                <li className="flex gap-3">
                  <IconoPin className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                  {direccionCompleta}
                </li>
                <li className="pl-9">{d.comun.horario}</li>
                {telefono && (
                  <li className="flex gap-3">
                    <IconoTelefono className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                    {telefono} {d.comun.telefonoNota}
                  </li>
                )}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={enlaceMapa} target="_blank" rel="noopener noreferrer" className="boton">
                  <IconoPin className="h-5 w-5" />
                  {h.ubicacion.maps}
                </a>
                <EnlaceRed
                  href={enlaceWaze}
                  nombre="Waze"
                  etiqueta={h.ubicacion.waze}
                  externo={d.comun.externo}
                  logo={logosExternos.waze}
                  iconoRespaldo={<IconoNavegar className="h-5 w-5" />}
                  className="boton-azul"
                />
              </div>
            </div>
            <Mapa lang={lang} />
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="seccion corte-arriba corte-abajo bg-hielo">
        <div className="contenedor">
          <h2 className="titulo-seccion">{h.resenas.titulo}</h2>
          <Resenas lang={lang} />
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className="seccion tras-corte">
        <div className="contenedor max-w-3xl">
          <h2 className="titulo-seccion">{h.preguntas.titulo}</h2>
          <div className="mt-8 divide-y divide-azul-100 border-y border-azul-100">
            {d.faq.map((p) => (
              <details key={p.pregunta} className="faq">
                <summary>
                  {p.pregunta}
                  <IconoMas className="mas h-6 w-6" />
                </summary>
                <p className="pb-6 text-grisazul">{fmt(p.respuesta, v)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
