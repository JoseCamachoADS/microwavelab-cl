import type { Metadata, Viewport } from "next";
import "./globals.css";
import Encabezado from "@/components/Encabezado";
import PieDePagina from "@/components/PieDePagina";
import { empresa } from "@/lib/empresa";

export const metadata: Metadata = {
  title: {
    default: `${empresa.nombre} | Reparación de placas y equipos electrónicos`,
    template: `%s | ${empresa.nombre}`,
  },
  description:
    "Servicio técnico profesional especializado en reparación de placas electrónicas y equipos industriales, médicos, domésticos y automotrices. Más de 40 años de trayectoria en Chile.",
  applicationName: empresa.nombre,
  openGraph: {
    title: empresa.nombre,
    description: empresa.eslogan,
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#124a79",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body>
        <Encabezado />
        <main>{children}</main>
        <PieDePagina />
      </body>
    </html>
  );
}
