import { empresa } from "@/lib/empresa";
import { datoPublico } from "@/lib/utilidades";

export default function PieDePagina() {
  const correo = datoPublico(empresa.correo);
  const telefono = datoPublico(empresa.telefono);
  const direccion = datoPublico(empresa.direccion);

  return (
    <footer className="mt-20 bg-marca-900 text-slate-200">
      <div className="contenedor grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{empresa.nombre}</p>
          <p className="mt-2 text-sm">{empresa.eslogan}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Contacto</p>
          <ul className="mt-2 space-y-1">
            {telefono && <li>{telefono}</li>}
            {correo && <li>{correo}</li>}
            {direccion && <li>{direccion}</li>}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Clientes</p>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="/portal" className="hover:text-white">
                Seguimiento de mi equipo
              </a>
            </li>
            <li>
              <a href="/contacto" className="hover:text-white">
                Solicitar cotización
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {empresa.nombre}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
