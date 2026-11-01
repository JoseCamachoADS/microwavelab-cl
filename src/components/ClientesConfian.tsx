import type { Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { clientes } from "@/lib/empresa";

/** Empresas que confían en el laboratorio. Logo si existe; si no, su nombre en texto. */
export default function ClientesConfian({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  if (clientes.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="font-titulo text-xl font-bold text-noche">{d.clientes.titulo}</h3>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {clientes.map((c) => (
          <li
            key={c.nombre}
            className="panel flex h-20 items-center justify-center bg-hielo px-4 text-center [--c:12px]"
          >
            {c.logo ? (
              // Logo entregado por la empresa; se muestra sin modificar.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo} alt={c.nombre} className="max-h-12 w-auto max-w-full object-contain" />
            ) : (
              <span className="font-titulo text-base font-semibold leading-tight text-noche">
                {c.nombre}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
