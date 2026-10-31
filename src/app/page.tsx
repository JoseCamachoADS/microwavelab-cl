import Link from "next/link";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  preguntasFrecuentes,
  servicios,
} from "@/lib/empresa";
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
      <section className="bg-gradient-to-br from-marca-900 to-marca-700 text-white">
        <div className="contenedor grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cobre-400">
              Más de {empresa.aniosTrayectoria} años de experiencia
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Laboratorio electrónico: reparación de tarjetas y equipos
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-200">
              Diagnóstico y reparación de tarjetas electrónicas, módulos I/O,
              fuentes de alimentación, inversores, monitores táctiles y más,
              con atención personalizada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-cobre-500 px-6 py-3 text-base font-semibold text-white hover:bg-cobre-600"
                >
                  Cotizar por WhatsApp
                </a>
              )}
              {llamar && telefono && (
                <a
                  href={llamar}
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
                >
                  Llamar {telefono}
                </a>
              )}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-center">
            <div className="rounded-xl bg-white/10 p-5">
              <dt className="text-sm text-slate-300">Trayectoria</dt>
              <dd className="mt-1 text-3xl font-bold">
                +{empresa.aniosTrayectoria} años
              </dd>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <dt className="text-sm text-slate-300">Garantía</dt>
              <dd className="mt-1 text-3xl font-bold">
                {empresa.garantiaMeses} meses
              </dd>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <dt className="text-sm text-slate-300">Servicio</dt>
              <dd className="mt-1 text-xl font-bold">Diagnóstico profesional</dd>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <dt className="text-sm text-slate-300">Atención</dt>
              <dd className="mt-1 text-xl font-bold">Personalizada</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="contenedor py-16">
        <h2 className="text-2xl font-bold text-marca-900 sm:text-3xl">
          Qué reparamos
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Servicio de laboratorio electrónico para equipos industriales y de
          todo tipo.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {destacados.map((s) => (
            <article
              key={s.id}
              className="rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-marca-700">{s.titulo}</h3>
              <p className="mt-2 text-slate-600">{s.descripcion}</p>
            </article>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href="/servicios"
            className="font-semibold text-marca-600 hover:underline"
          >
            Ver todos los servicios →
          </Link>
        </p>
      </section>

      {/* Trayectoria */}
      <section id="trayectoria" className="bg-slate-50 py-16">
        <div className="contenedor grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-marca-900 sm:text-3xl">
              Más de {empresa.aniosTrayectoria} años de experiencia
            </h2>
            <p className="mt-4 text-slate-700">{empresa.descripcion}</p>
            <p className="mt-4">
              <a
                href={empresa.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-marca-600 hover:underline"
              >
                Síganos en LinkedIn →
              </a>
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-bold text-marca-700">Por qué elegirnos</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>
                <strong>Experiencia comprobada:</strong> más de{" "}
                {empresa.aniosTrayectoria} años reparando electrónica.
              </li>
              <li>
                <strong>Garantía:</strong> {empresa.garantiaMeses} meses en
                nuestras reparaciones.
              </li>
              <li>
                <strong>Diagnóstico:</strong> identificamos la falla antes de
                presupuestar.
              </li>
              <li>
                <strong>Atención personalizada:</strong> nos adaptamos a sus
                requerimientos.
              </li>
            </ul>
            <p className="mt-5">
              <Link
                href="/proceso"
                className="font-semibold text-marca-600 hover:underline"
              >
                Cómo es el proceso de reparación →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="contenedor py-16">
        <h2 className="text-2xl font-bold text-marca-900 sm:text-3xl">
          Dónde estamos
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-2 text-slate-700">
            <p>
              <strong>Dirección:</strong> {direccionCompleta}
            </p>
            <p>
              <strong>Horario:</strong> {empresa.horario}
            </p>
            {telefono && (
              <p>
                <strong>Teléfono y WhatsApp:</strong> {telefono}
              </p>
            )}
          </div>
          <div>
            <a
              href={enlaceMapa}
              target="_blank"
              rel="noopener noreferrer"
              className="boton"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="bg-slate-50 py-16">
        <div className="contenedor">
          <h2 className="text-2xl font-bold text-marca-900 sm:text-3xl">
            Lo que dicen nuestros clientes
          </h2>
          {empresa.urlGoogle ? (
            <p className="mt-4">
              <a
                href={empresa.urlGoogle}
                className="boton-secundario"
                rel="noopener noreferrer"
              >
                Ver reseñas en Google
              </a>
            </p>
          ) : (
            <p className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-slate-500">
              Aquí se mostrarán las reseñas reales de Google cuando se conecte la
              ficha de la empresa.
            </p>
          )}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className="contenedor py-16">
        <h2 className="text-2xl font-bold text-marca-900 sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200">
          {preguntasFrecuentes.map((p) => (
            <details key={p.pregunta} className="group p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold text-marca-900">
                {p.pregunta}
              </summary>
              <p className="mt-3 text-slate-700">{p.respuesta}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
