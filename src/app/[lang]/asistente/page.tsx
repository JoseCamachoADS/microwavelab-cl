import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CabeceraPagina from "@/components/CabeceraPagina";
import PanelAsistente from "@/components/PanelAsistente";
import { idiomaDe } from "@/i18n/servidor";

// Página interna del administrador, solo en español y fuera de Google.
export const metadata: Metadata = {
  title: "Asistente virtual",
  robots: { index: false, follow: false },
};

export default async function Asistente({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await idiomaDe(params);
  if (lang !== "es") notFound();

  return (
    <>
      <CabeceraPagina
        titulo="Asistente virtual"
        bajada="Encienda o apague el asistente, cambie su saludo y sus instrucciones, y fije cuántos mensajes puede responder por día."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <PanelAsistente />
        </div>
      </section>
    </>
  );
}
