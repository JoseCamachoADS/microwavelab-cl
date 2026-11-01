import Image from "next/image";
import Link from "next/link";
import { empresa } from "@/lib/empresa";
import BarraSuperior from "./BarraSuperior";
import MenuMovil from "./MenuMovil";

const enlaces = [
  { href: "/servicios", texto: "Servicios" },
  { href: "/proceso", texto: "Cómo trabajamos" },
  { href: "/#trayectoria", texto: "Trayectoria" },
  { href: "/#preguntas", texto: "Preguntas" },
  { href: "/contacto", texto: "Contacto" },
];

export default function Encabezado() {
  return (
    <>
      <BarraSuperior />
      <header className="sticky top-0 z-40 border-b border-azul-100 bg-white/95 backdrop-blur">
        <div className="contenedor relative flex items-center justify-between gap-4 py-2">
          <Link href="/" aria-label={`${empresa.nombreCompleto}, inicio`}>
            <Image
              src="/logo/logo-color-320.png"
              alt={empresa.nombreCompleto}
              width={320}
              height={195}
              priority
              className="h-14 w-auto sm:h-16"
            />
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="font-titulo text-base font-semibold text-noche hover:text-rojo-accion"
              >
                {e.texto}
              </Link>
            ))}
          </nav>
          <Link href="/portal" className="boton hidden md:inline-flex">
            Seguimiento de mi equipo
          </Link>
          <MenuMovil enlaces={enlaces} />
        </div>
      </header>
    </>
  );
}
