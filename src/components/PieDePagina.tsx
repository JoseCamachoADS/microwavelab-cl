import Link from "next/link";
import { direccionCompleta, empresa, enlaceMapa } from "@/lib/empresa";
import { datoPublico, enlaceTelefono } from "@/lib/utilidades";

export default function PieDePagina() {
  const correo = datoPublico(empresa.correo);
  const telefono = datoPublico(empresa.telefono);
  const enlaceTel = enlaceTelefono(empresa.whatsapp);

  return (
    <footer className="mt-20 bg-marca-900 text-slate-200">
      <div className="contenedor grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{empresa.nombreCompleto}</p>
          <p className="mt-2 text-sm">{empresa.eslogan}</p>
          <p className="mt-3 text-sm">
            Más de {empresa.aniosTrayectoria} años de experiencia ·{" "}
            {empresa.garantiaMeses} meses de garantía
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Contacto</p>
          <ul className="mt-2 space-y-1">
            {telefono && (
              <li>
                {enlaceTel ? (
                  <a href={enlaceTel} className="hover:text-white">
                    {telefono}
                  </a>
                ) : (
                  telefono
                )}
              </li>
            )}
            {correo && <li>{correo}</li>}
            <li>
              <a href={enlaceMapa} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                {direccionCompleta}
              </a>
            </li>
            <li>{empresa.horario}</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Enlaces</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/portal" className="hover:text-white">
                Seguimiento de mi equipo
              </Link>
            </li>
            <li>
              <Link href="/proceso" className="hover:text-white">
                Cómo trabajamos
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <a
                href={empresa.linkedin}
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {empresa.nombreCompleto}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
