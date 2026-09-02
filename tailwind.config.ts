import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maia: {
          yellow: "#FDDB51",
          strong: "#F9D316",
          dark: "#242323",
          green: "#DCF7E2",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        // Sistema visual Maia: una sola familia (Montserrat). "serif" se mantiene como
        // alias para no reescribir cada archivo, pero renderiza Montserrat.
        serif: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
