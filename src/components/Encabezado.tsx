import Link from "next/link";
import { empresa } from "@/lib/empresa";

const enlaces = [
  { href: "/servicios", texto: "Servicios" },
  { href: "/proceso", texto: "Cómo trabajamos" },
  { href: "/#trayectoria", texto: "Trayectoria" },
  { href: "/#preguntas", texto: "Preguntas" },
  { href: "/contacto", texto: "Contacto" },
];

export default function Encabezado() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="contenedor flex items-center justify-between py-3">
        <Link href="/" className="text-lg font-bold text-marca-900">
          {empresa.nombre}
        </Link>
        <nav aria-label="Principal" className="hidden gap-6 md:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="text-sm font-medium text-slate-700 hover:text-marca-600"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        <Link
          href="/portal"
          className="rounded-lg border border-marca-600 px-4 py-2 text-sm font-semibold text-marca-700 hover:bg-marca-50"
        >
          Seguimiento de mi equipo
        </Link>
      </div>
      <nav
        aria-label="Principal móvil"
        className="flex gap-4 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden"
      >
        {enlaces.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="whitespace-nowrap text-sm font-medium text-slate-700"
          >
            {e.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}
