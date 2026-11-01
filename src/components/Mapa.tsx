import { fmt, type Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { empresa, urlMapaEmbebido } from "@/lib/empresa";

/** Mapa de Google embebido con la ubicación del negocio. */
export default function Mapa({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  // El mapa se muestra en el idioma de la página.
  const src = urlMapaEmbebido.replace("&hl=es", `&hl=${d.idioma.hl}`);
  return (
    <div className="panel overflow-hidden bg-hielo">
      <iframe
        title={fmt(d.mapa.titulo, { nombre: empresa.nombreCompleto })}
        src={src}
        className="h-80 w-full md:h-[26rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
