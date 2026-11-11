import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import PanelBotones from "@/components/PanelBotones";
import { idiomaDe } from "@/i18n/servidor";

// Página interna del administrador, solo en español y fuera de Google.
export const metadata: Metadata = {
  title: "Botones flotantes",
  robots: { index: false, follow: false },
};

export default async function Botones({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await idiomaDe(params);
  if (lang !== "es") notFound();

  return (
    <>
      <CabeceraPagina
        titulo="Botones flotantes"
        bajada="Encienda o apague el botón de WhatsApp y elija qué se muestra en urgencias: botón rojo, aviso amarillo de pausa o nada."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <PanelBotones />
        </div>
      </section>
    </>
  );
}
