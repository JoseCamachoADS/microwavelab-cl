import type { Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { empresa } from "@/lib/empresa";
import { enlaceTelefono } from "@/lib/utilidades";
import { IconoReloj, IconoTelefono } from "./Iconos";
import RelojClima from "./RelojClima";

/** Franja fina sobre el encabezado: horario de atención, fecha, hora y clima de Santiago, y teléfono. */
export default function BarraSuperior({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  const tel = enlaceTelefono(empresa.whatsapp);
  return (
    <div className="bg-noche text-sm text-white/85">
      <div className="contenedor flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <p className="flex items-center gap-2 max-sm:w-full">
          <IconoReloj className="h-4 w-4 flex-shrink-0 text-peri" />
          <span className="hidden sm:inline">{d.comun.horario}</span>
          <span className="sm:hidden">{d.comun.horarioCorto}</span>
        </p>
        <RelojClima lang={lang} textos={d.clima} />
        {tel && (
          <a href={tel} className="flex items-center gap-2 font-semibold text-white hover:text-peri">
            <IconoTelefono className="h-4 w-4 text-peri" />
            {empresa.telefono}
          </a>
        )}
      </div>
    </div>
  );
}
