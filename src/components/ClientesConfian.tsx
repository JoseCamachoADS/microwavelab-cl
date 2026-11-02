import type { Idioma } from "@/i18n/config";
import { obtenerDiccionario } from "@/i18n";
import { clientes } from "@/lib/empresa";
import CintaClientes from "./CintaClientes";

/** Empresas que confían en el laboratorio, en una cinta de película que avanza sola. Logo si existe; si no, su nombre. */
export default function ClientesConfian({ lang }: { lang: Idioma }) {
  const d = obtenerDiccionario(lang);
  if (clientes.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="font-titulo text-xl font-bold text-noche">{d.clientes.titulo}</h3>
      <div className="mt-6">
        <CintaClientes
          items={[...clientes]}
          etiqueta={d.clientes.titulo}
          pausar={d.clientes.pausar}
          reanudar={d.clientes.reanudar}
        />
      </div>
    </div>
  );
}
