import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";
import { empresa } from "@/lib/empresa";
import { datoPublico } from "@/lib/utilidades";

export const metadata: Metadata = {
  title: "Privacidad y cookies",
  description: "Qué datos mide este sitio, con qué herramientas y cómo rechazar la medición.",
};

export default function Privacidad() {
  const correo = datoPublico(empresa.correo);
  return (
    <>
      <CabeceraPagina
        titulo="Privacidad y cookies"
        bajada="Qué medimos en este sitio, con qué herramientas y cómo puede rechazarlo."
      />
      <section className="seccion tras-corte">
        <div className="contenedor max-w-3xl space-y-6 text-lg">
          <h2 className="font-titulo text-2xl font-bold text-noche">Qué medimos</h2>
          <p>
            Si usted acepta, usamos dos herramientas para saber cuántas personas visitan el sitio, qué
            páginas ven y si usan los botones de WhatsApp, teléfono o mapa:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Google Analytics 4:</strong> estadísticas agregadas de visitas, que luego
              presentamos en informes de Looker Studio.
            </li>
            <li>
              <strong>Microsoft Clarity:</strong> mapas de calor y grabaciones anónimas de la
              navegación para detectar partes del sitio difíciles de usar. Oculta por defecto lo que
              se escribe en campos de texto.
            </li>
          </ul>
          <h2 className="font-titulo text-2xl font-bold text-noche">Contador de visitas</h2>
          <p>
            El número de visitas del pie de página solo suma cuántas veces se abre el sitio. No guarda
            datos personales, no usa cookies y no depende de su decisión sobre la medición.
          </p>
          <h2 className="font-titulo text-2xl font-bold text-noche">Lo que no hacemos</h2>
          <p>
            No usamos estas cookies para publicidad. No medimos las páginas de seguimiento de equipos
            ni el panel interno, donde hay datos de clientes.
          </p>
          <h2 className="font-titulo text-2xl font-bold text-noche">Cómo cambiar su decisión</h2>
          <p>
            Si eligió &quot;Aceptar&quot; y quiere retirarlo, borre los datos de este sitio en la
            configuración de su navegador y el aviso volverá a aparecer. También puede bloquear las
            cookies desde el propio navegador.
          </p>
          <h2 className="font-titulo text-2xl font-bold text-noche">Consultas</h2>
          <p>
            Para consultas sobre sus datos, escríbanos
            {correo ? ` a ${correo}` : " por WhatsApp o llámenos"} ({empresa.telefono}).
          </p>
        </div>
      </section>
    </>
  );
}
