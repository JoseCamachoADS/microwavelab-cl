import { empresa, urlMapaEmbebido } from "@/lib/empresa";

/** Mapa de Google embebido con la ubicación del negocio. */
export default function Mapa() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <iframe
        title={`Mapa de ubicación de ${empresa.nombreCompleto}`}
        src={urlMapaEmbebido}
        className="h-80 w-full md:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
