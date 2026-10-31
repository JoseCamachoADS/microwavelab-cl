import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguimiento de mi equipo",
  robots: { index: false },
};

export default function Portal() {
  return (
    <section className="contenedor py-14">
      <h1 className="text-3xl font-bold text-marca-900">
        Seguimiento de mi equipo
      </h1>
      <p className="mt-3 max-w-xl text-slate-600">
        Pronto podrá ingresar con su correo electrónico para ver en qué etapa
        está la reparación de su equipo, revisar y aceptar su presupuesto y
        pagar en línea.
      </p>
    </section>
  );
}
