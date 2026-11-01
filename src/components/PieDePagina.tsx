import Image from "next/image";
import Link from "next/link";
import {
  direccionCompleta,
  empresa,
  enlaceMapa,
  enlaceWaze,
  logosExternos,
} from "@/lib/empresa";
import { datoPublico, enlaceTelefono, enlaceWhatsApp } from "@/lib/utilidades";
import EnlaceRed from "./EnlaceRed";
import { IconoChat, IconoNavegar, IconoPin, IconoRed, IconoTelefono } from "./Iconos";
import Rayo from "./Rayo";

const enlacesSitio = [
  { href: "/servicios", texto: "Servicios" },
  { href: "/proceso", texto: "Cómo trabajamos" },
  { href: "/#trayectoria", texto: "Trayectoria" },
  { href: "/#preguntas", texto: "Preguntas frecuentes" },
  { href: "/contacto", texto: "Contacto" },
  { href: "/portal", texto: "Seguimiento de mi equipo" },
  { href: "/privacidad", texto: "Privacidad y cookies" },
];

export default function PieDePagina() {
  const correo = datoPublico(empresa.correo);
  const telefono = datoPublico(empresa.telefono);
  const enlaceTel = enlaceTelefono(empresa.whatsapp);
  const wa = enlaceWhatsApp(
    empresa.whatsapp,
    "Hola, quisiera consultar por la reparación de un equipo."
  );

  return (
    <footer className="relative mt-0 bg-noche text-white/85">
      {/* Llamado a la acción antes de las columnas */}
      <div className="relative overflow-hidden bg-azul">
        <Rayo className="pointer-events-none absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 text-white/10 sm:right-10 sm:h-80 sm:w-80" />
        <div className="contenedor relative flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-titulo text-3xl font-bold text-white sm:text-4xl">
              ¿Tiene un equipo que no enciende?
            </h2>
            <p className="mt-2 max-w-xl text-lg text-white/90">
              Cuéntenos la falla y le orientamos sin costo. Más de {empresa.aniosTrayectoria} años
              y {empresa.garantiaMeses} meses de garantía en cada reparación.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="boton">
                <IconoChat className="h-5 w-5" />
                Escribir por WhatsApp
              </a>
            )}
            {enlaceTel && (
              <a href={enlaceTel} className="boton-claro">
                <IconoTelefono className="h-5 w-5" />
                Llamar
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="contenedor grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/logo/logo-reverso-320.png"
            alt={empresa.nombreCompleto}
            width={320}
            height={195}
            className="h-24 w-auto"
          />
          <p className="mt-5 max-w-sm">{empresa.eslogan}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <EnlaceRed
              href={empresa.linkedin}
              nombre="LinkedIn"
              etiqueta="LinkedIn"
              logo={logosExternos.linkedin}
              iconoRespaldo={<IconoRed className="h-6 w-6" />}
            />
            <EnlaceRed
              href={enlaceWaze}
              nombre="Waze"
              etiqueta="Ir con Waze"
              logo={logosExternos.waze}
              iconoRespaldo={<IconoNavegar className="h-6 w-6" />}
            />
          </div>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-3">
          <p className="font-titulo text-lg font-semibold text-white">El sitio</p>
          <ul className="mt-4 space-y-2">
            {enlacesSitio.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="hover:text-white hover:underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-titulo text-lg font-semibold text-white">Visítenos</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <IconoPin className="mt-1 h-5 w-5 flex-shrink-0 text-peri" />
              <a
                href={enlaceMapa}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                {direccionCompleta}
              </a>
            </li>
            {telefono && (
              <li className="flex gap-3">
                <IconoTelefono className="mt-1 h-5 w-5 flex-shrink-0 text-peri" />
                {enlaceTel ? (
                  <a href={enlaceTel} className="hover:text-white hover:underline">
                    {telefono}
                  </a>
                ) : (
                  telefono
                )}
              </li>
            )}
            {correo && <li className="pl-8">{correo}</li>}
            <li className="pl-8">{empresa.horario}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-white/70">
        © {new Date().getFullYear()} {empresa.nombreCompleto}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
