import Rayo from "./Rayo";

/** Franja de título de las páginas interiores: fondo oscuro con borde diagonal. */
export default function CabeceraPagina({
  titulo,
  bajada,
}: {
  titulo: string;
  bajada: string;
}) {
  return (
    <section className="seccion corte-abajo relative overflow-hidden bg-noche text-white">
      <Rayo className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 text-rojo opacity-90 sm:h-96 sm:w-96" />
      <div className="contenedor relative">
        <h1 className="font-titulo text-4xl font-bold leading-tight sm:text-5xl">{titulo}</h1>
        <p className="mt-4 max-w-xl text-lg text-white/85">{bajada}</p>
      </div>
    </section>
  );
}
