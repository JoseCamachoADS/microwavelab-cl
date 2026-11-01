import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";
import FormularioCotizacion from "@/components/FormularioCotizacion";
import { IconoCheck, IconoServicio } from "@/components/Iconos";
import { fmt } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { metaPagina } from "@/i18n/meta";
import { idiomaDe, variables } from "@/i18n/servidor";
import { empresa, servicios } from "@/lib/empresa";
import { enlaceWhatsApp } from "@/lib/utilidades";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await idiomaDe(params);
  const m = obtenerDiccionario(lang).tecnico.meta;
  return metaPagina(lang, "/servicio-tecnico", m.titulo, m.descripcion);
}

export default async function ServicioTecnico({ params }: Props) {
  const lang = await idiomaDe(params);
  const d = obtenerDiccionario(lang);
  const v = variables(d);
  const t = d.tecnico;
  const equipos = servicios.map((s) => d.servicios.items[s.id].titulo);
  // Dirección de WhatsApp lista para agregarle el mensaje (se arma con un texto vacío y se quita el sufijo).
  const base = enlaceWhatsApp(empresa.whatsapp, "") ?? "";
  const mensajeEnlace = base.includes("text=") ? base : `${base}${base.includes("?") ? "&" : "?"}text=`;

  const Lista = ({ items }: { items: string[] }) => (
    <ul className="mt-5 space-y-4">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <IconoCheck className="mt-1 h-5 w-5 flex-shrink-0 text-rojo-accion" />
          <span>{fmt(i, v)}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <CabeceraPagina titulo={t.titulo} bajada={t.bajada} />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel bg-hielo p-8">
              <h2 className="font-titulo text-2xl font-bold text-noche">{t.alcance.h}</h2>
              <Lista items={t.alcance.items} />
            </div>
            <div className="panel bg-hielo p-8">
              <h2 className="font-titulo text-2xl font-bold text-noche">{t.valor.h}</h2>
              <Lista items={t.valor.items} />
            </div>
          </div>

          <h2 className="mt-16 font-titulo text-2xl font-bold text-noche">{t.equipos.h}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <li key={s.id} className="flex items-center gap-3 border-l-4 border-rojo bg-hielo px-4 py-3">
                <IconoServicio id={s.id} className="h-6 w-6 flex-shrink-0 text-azul" />
                <span className="font-titulo font-semibold text-noche">{d.servicios.items[s.id].titulo}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cotizar" className="seccion corte-arriba bg-hielo">
        <div className="contenedor grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="titulo-seccion">{t.formulario.titulo}</h2>
            <p className="mt-4 text-lg text-grisazul">{t.formulario.intro}</p>
          </div>
          <div className="panel bg-white p-6 sm:p-8 md:col-span-8">
            <FormularioCotizacion textos={t.formulario} equipos={equipos} mensajeEnlace={mensajeEnlace} />
          </div>
        </div>
      </section>
    </>
  );
}
