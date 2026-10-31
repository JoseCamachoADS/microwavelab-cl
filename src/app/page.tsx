import Link from "next/link";
import { empresa, servicios } from "@/lib/empresa";
import { enlaceWhatsApp } from "@/lib/utilidades";
import { INFO_ESTADO, LINEA_DE_TIEMPO } from "@/lib/estados";

export default function Inicio() {
  const whatsapp = enlaceWhatsApp(
    empresa.whatsapp,
    "Hola, quisiera cotizar la reparación de un equipo."
  );
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
              Reparación especializada de placas y equipos electrónicos
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-200">
              Devolvemos a funcionar equipos industriales, médicos, domésticos
              y automotrices, con diagnóstico a nivel de componente y
              seguimiento en línea de cada reparación.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-lg bg-cobre-500 px-6 py-3 text-base font-semibold text-white hover:bg-cobre-600"
              >
                Solicitar cotización
              </Link>
              {whatsapp && (
                <a
                  href={whatsapp}
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
                >
                  Escribir por WhatsApp
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
              <dt className="text-sm text-slate-300">Especialidad</dt>
              <dd className="mt-1 text-xl font-bold">Placas electrónicas</dd>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <dt className="text-sm text-slate-300">Foco</dt>
              <dd className="mt-1 text-xl font-bold">Equipos industriales</dd>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <dt className="text-sm text-slate-300">Seguimiento</dt>
              <dd className="mt-1 text-xl font-bold">En línea, paso a paso</dd>
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
          Servicio profesional para todo lo relacionado con la electrónica.
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
              Trayectoria y experiencia
            </h2>
            <p className="mt-4 text-slate-700">
              {empresa.nombre} reúne más de {empresa.aniosTrayectoria} años de
              experiencia en reparación electrónica. Esa experiencia nos permite
              diagnosticar fallas complejas y reparar equipos que otros dan por
              perdidos.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-bold text-marca-700">Cómo trabajamos</h3>
            <ol className="mt-4 space-y-2">
              {LINEA_DE_TIEMPO.filter((e) => e !== "DECISION_CLIENTE").map(
                (e, i) => (
                  <li key={e} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marca-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700">
                      {INFO_ESTADO[e].etiqueta}
                    </span>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="contenedor py-16">
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
          <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-6 text-slate-500">
            Aquí se mostrarán las reseñas reales de Google cuando se conecte la
            ficha de la empresa.
          </p>
        )}
      </section>
    </>
  );
}
