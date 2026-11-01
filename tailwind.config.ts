import type { Config } from "tailwindcss";

// Paleta tomada del logo de Electrónica Micro Wave Lab Chile:
//   rojo #E73338 · azul #414290 · negro #222021
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Azul de marca y su versión muy oscura, usada como base de las secciones oscuras
        azul: {
          DEFAULT: "#414290",
          700: "#2F3070",
          100: "#E4E5F5",
        },
        noche: {
          DEFAULT: "#15173F",
          800: "#1C1F52",
        },
        // Rojo de marca. "accion" es un tono apenas más oscuro para botones con texto
        // blanco (contraste 5,6:1; el rojo original da 4,3:1).
        rojo: {
          DEFAULT: "#E73338",
          accion: "#C8232A",
          oscuro: "#A81C23",
        },
        hielo: "#F1F2F8",
        tinta: "#222021",
        grisazul: "#5B5D78",
        peri: "#A4AAFF", // azul de marca aclarado para fondos oscuros
      },
      fontFamily: {
        titulo: ["var(--font-titulo)", "system-ui", "sans-serif"],
        sans: ["var(--font-cuerpo)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
