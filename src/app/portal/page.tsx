import type { Metadata } from "next";
import CabeceraPagina from "@/components/CabeceraPagina";

export const metadata: Metadata = {
  title: "Seguimiento de mi equipo",
  robots: { index: false },
};

export default function Portal() {
  return (
    <>
      <CabeceraPagina
        titulo="Seguimiento de mi equipo"
        bajada="Pronto podrá ingresar con su correo electrónico para ver en qué etapa está la reparación de su equipo, revisar y aceptar su presupuesto y pagar en línea."
      />
      <section className="seccion tras-corte">
        <div className="contenedor">
          <p className="panel max-w-xl bg-hielo p-6 text-grisazul">
            Mientras tanto, si necesita saber el estado de su equipo, escríbanos por WhatsApp
            indicando su nombre y el equipo que dejó.
          </p>
        </div>
      </section>
    </>
  );
}
