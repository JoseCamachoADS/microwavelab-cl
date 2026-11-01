import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import PanelUso from "@/components/PanelUso";
import { idiomaDe } from "@/i18n/servidor";

// Página interna del administrador, solo en español y fuera de Google.
// Cuando exista el panel del técnico (/panel), esta vista pasará a vivir ahí.
export const metadata: Metadata = {
  title: "Uso de APIs",
  robots: { index: false, follow: false },
};

export default async function Uso({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await idiomaDe(params);
  if (lang !== "es") notFound();

  return (
    <>
      <CabeceraPagina
        titulo="Uso de APIs"
        bajada="Cuántas veces consulta el sitio a Google y a Cloudflare, hoy, este mes y en los últimos días."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <PanelUso />
        </div>
      </section>
    </>
  );
}
