import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import PanelHonorarios from "@/components/PanelHonorarios";
import { idiomaDe } from "@/i18n/servidor";

// Herramienta interna, solo en español y fuera de Google.
export const metadata: Metadata = {
  title: "Boletas de honorarios",
  robots: { index: false, follow: false },
};

export default async function Honorarios({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await idiomaDe(params);
  if (lang !== "es") notFound();

  return (
    <>
      <CabeceraPagina
        titulo="Boletas de honorarios"
        bajada="Calcule la retención de una boleta de honorarios según el año de emisión, con tasas que usted puede ajustar."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <PanelHonorarios />
        </div>
      </section>
    </>
  );
}
