import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta técnica: azul profundo + acento cobre (placa electrónica)
        marca: {
          50: "#eef5fb",
          100: "#d6e6f5",
          500: "#1f6fb2",
          600: "#175a93",
          700: "#124a79",
          900: "#0b2a44",
        },
        cobre: {
          400: "#d98a4e",
          500: "#c4702f",
          600: "#a35a24",
        },
      },
    },
  },
  plugins: [],
};

export default config;
