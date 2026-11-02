import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import PanelAviso from "@/components/PanelAviso";
import { idiomaDe } from "@/i18n/servidor";

// Página interna del administrador, solo en español y fuera de Google.
// Cuando exista el panel del técnico (/panel), esta vista pasará a vivir ahí.
export const metadata: Metadata = {
  title: "Aviso del sitio",
  robots: { index: false, follow: false },
};

export default async function Aviso({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await idiomaDe(params);
  if (lang !== "es") notFound();

  return (
    <>
      <CabeceraPagina
        titulo="Aviso del sitio"
        bajada="Escriba el mensaje de la pizarra electrónica y enciéndalo o apáguelo cuando quiera."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <PanelAviso />
        </div>
      </section>
    </>
  );
}
