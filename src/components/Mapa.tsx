import { empresa, urlMapaEmbebido } from "@/lib/empresa";

/** Mapa de Google embebido con la ubicación del negocio. */
export default function Mapa() {
  return (
    <div className="panel overflow-hidden bg-hielo">
      <iframe
        title={`Mapa de ubicación de ${empresa.nombreCompleto}`}
        src={urlMapaEmbebido}
        className="h-80 w-full md:h-[26rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
