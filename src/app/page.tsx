import Link from "next/link";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
  logosExternos,
  preguntasFrecuentes,
  servicios,
} from "@/lib/empresa";
import EnlaceRed from "@/components/EnlaceRed";
import { IconoChat, IconoCheck, IconoMas, IconoNavegar, IconoPin, IconoServicio, IconoTelefono } from "@/components/Iconos";
import Mapa from "@/components/Mapa";
import Rayo from "@/components/Rayo";
import Resenas from "@/components/Resenas";
import { datoPublico, enlaceTelefono, enlaceWhatsApp } from "@/lib/utilidades";

export default function Inicio() {
  const whatsapp = enlaceWhatsApp(
    empresa.whatsapp,
    "Hola, quisiera cotizar la reparación de un equipo."
  );
  const llamar = enlaceTelefono(empresa.whatsapp);
  const telefono = datoPublico(empresa.telefono);
  const destacados = servicios.filter((s) => s.destacado);

  return (
    <>
      {/* Portada */}
      <section className="seccion corte-abajo relative overflow-hidden bg-noche text-white">
        <Rayo className="anim-rayo pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-rojo opacity-90 sm:-right-10 md:h-[40rem] md:w-[40rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-noche via-noche/90 to-transparent" aria-hidden="true" />
        <div className="contenedor relative">
          <div className="max-w-2xl">
            <p className="anim-texto font-titulo text-lg font-semibold text-peri">
              Más de {empresa.aniosTrayectoria} años reparando electrónica
            </p>
            <h1 className="anim-texto anim-texto-2 mt-4 font-titulo text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              Si su equipo se detuvo, lo hacemos funcionar de nuevo
            </h1>
            <p className="anim-texto anim-texto-3 mt-6 max-w-xl text-lg text-white/85">
              Laboratorio electrónico especializado en tarjetas, módulos I/O, fuentes de
              alimentación, inversores y monitores táctiles. Diagnóstico profesional y{" "}
              {empresa.garantiaMeses} meses de garantía.
            </p>
            <div className="anim-texto anim-texto-3 mt-9 flex flex-col gap-3 sm:flex-row">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="boton">
                  <IconoChat className="h-5 w-5" />
                  Cotizar por WhatsApp
                </a>
              )}
              {llamar && telefono && (
                <a href={llamar} className="boton-claro">
                  <IconoTelefono className="h-5 w-5" />
                  Llamar al {telefono}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="seccion tras-corte antes-corte">
        <div className="contenedor">
          <h2 className="titulo-seccion">Qué reparamos</h2>
          <p className="texto-medida mt-3 text-lg text-grisazul">
            Electrónica industrial y de todo tipo, reparada a nivel de componente.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {destacados.map((s) => (
              <article key={s.id} className="panel bg-hielo p-7">
                <IconoServicio id={s.id} className="h-10 w-10 text-rojo-accion" />
                <h3 className="mt-5 font-titulo text-xl font-bold text-noche">{s.titulo}</h3>
                <p className="mt-2 text-grisazul">{s.descripcion}</p>
              </article>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/servicios" className="enlace">
              Ver todos los servicios
            </Link>
          </p>
        </div>
      </section>

      {/* Trayectoria */}
      <section id="trayectoria" className="seccion corte-arriba corte-abajo relative overflow-hidden bg-azul text-white">
        <Rayo className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 text-white/10" />
        <div className="contenedor relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-titulo text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {empresa.aniosTrayectoria} años de experiencia en un solo taller
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/90">{empresa.descripcion}</p>
            <div className="mt-8">
              <EnlaceRed
                href={empresa.linkedin}
                nombre="LinkedIn"
                etiqueta="Síganos en LinkedIn"
                logo={logosExternos.linkedin}
                iconoRespaldo={<IconoCheck className="h-6 w-6" />}
              />
            </div>
          </div>
          <div className="panel bg-white p-8 text-tinta">
            <h3 className="font-titulo text-xl font-bold text-noche">Por qué elegirnos</h3>
            <ul className="mt-5 space-y-4">
              {[
                ["Experiencia comprobada", `más de ${empresa.aniosTrayectoria} años reparando electrónica.`],
                ["Garantía", `${empresa.garantiaMeses} meses en nuestras reparaciones.`],
                ["Diagnóstico primero", "identificamos la falla antes de presupuestar."],
                ["Atención personalizada", "nos adaptamos a sus requerimientos."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <IconoCheck className="mt-1 h-5 w-5 flex-shrink-0 text-rojo-accion" />
                  <span>
                    <strong className="text-noche">{t}:</strong> {d}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/proceso" className="enlace">
                Cómo es el proceso de reparación
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="seccion tras-corte antes-corte">
        <div className="contenedor">
          <h2 className="titulo-seccion">Dónde estamos</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <ul className="space-y-4 text-lg">
                <li className="flex gap-3">
                  <IconoPin className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                  {direccionCompleta}
                </li>
                <li className="pl-9">{empresa.horario}</li>
                {telefono && (
                  <li className="flex gap-3">
                    <IconoTelefono className="mt-1 h-6 w-6 flex-shrink-0 text-rojo-accion" />
                    {telefono} (llamadas y WhatsApp)
                  </li>
                )}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={enlaceMapa} target="_blank" rel="noopener noreferrer" className="boton">
                  <IconoPin className="h-5 w-5" />
                  Cómo llegar con Google Maps
                </a>
                <EnlaceRed
                  href={enlaceWaze}
                  nombre="Waze"
                  etiqueta="Cómo llegar con Waze"
                  logo={logosExternos.waze}
                  iconoRespaldo={<IconoNavegar className="h-5 w-5" />}
                  className="boton-azul"
                />
              </div>
            </div>
            <Mapa />
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="seccion corte-arriba corte-abajo bg-hielo">
        <div className="contenedor">
          <h2 className="titulo-seccion">Lo que dicen nuestros clientes</h2>
          <Resenas />
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className="seccion tras-corte">
        <div className="contenedor max-w-3xl">
          <h2 className="titulo-seccion">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-azul-100 border-y border-azul-100">
            {preguntasFrecuentes.map((p) => (
              <details key={p.pregunta} className="faq">
                <summary>
                  {p.pregunta}
                  <IconoMas className="mas h-6 w-6" />
                </summary>
                <p className="pb-6 text-grisazul">{p.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
