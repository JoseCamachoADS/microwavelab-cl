import { empresa } from "@/lib/empresa";
import { obtenerResenas } from "@/lib/resenas";

function Estrellas({ puntaje }: { puntaje: number }) {
  const llenas = Math.round(puntaje);
  return (
    <span role="img" aria-label={`${puntaje} de 5 estrellas`} className="text-amber-500">
      {"★".repeat(llenas)}
      <span className="text-slate-300">{"★".repeat(Math.max(0, 5 - llenas))}</span>
    </span>
  );
}

function formatoPuntaje(n: number): string {
  return n.toFixed(1).replace(".", ",");
}

/** Reseñas reales de Google. Si no hay clave o Google no responde, muestra un enlace simple. */
export default async function Resenas() {
  const datos = await obtenerResenas();

  if (!datos) {
    return (
      <p className="mt-4">
        <a
          href={empresa.urlGoogle}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-secundario"
        >
          Ver reseñas en Google
        </a>
      </p>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-4xl font-bold text-marca-900">
          {formatoPuntaje(datos.puntaje)}
        </span>
        <div>
          <Estrellas puntaje={datos.puntaje} />
          <p className="text-sm text-slate-600">
            {datos.total} {datos.total === 1 ? "reseña" : "reseñas"} en Google
          </p>
        </div>
      </div>

      {datos.resenas.length > 0 && (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {datos.resenas.map((r, i) => (
            <li
              key={`${r.autor}-${i}`}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {r.fotoUrl && (
                  // Foto de perfil servida por Google; no se descarga ni se guarda.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.fotoUrl}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div className="min-w-0">
                  {r.autorUrl ? (
                    <a
                      href={r.autorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate font-semibold text-marca-900 hover:underline"
                    >
                      {r.autor}
                    </a>
                  ) : (
                    <p className="truncate font-semibold text-marca-900">{r.autor}</p>
                  )}
                  <p className="text-xs text-slate-500">{r.cuando}</p>
                </div>
              </div>
              <p className="mt-3">
                <Estrellas puntaje={r.puntaje} />
              </p>
              <p className="mt-2 line-clamp-6 text-slate-700">{r.texto}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={empresa.urlGoogle}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-secundario"
        >
          Ver todas las reseñas en Google
        </a>
        <a
          href={datos.urlEscribirResena}
          target="_blank"
          rel="noopener noreferrer"
          className="boton"
        >
          Dejar una reseña
        </a>
      </div>
      <p className="mt-4 text-xs text-slate-500">Reseñas de Google Maps</p>
    </div>
  );
}
