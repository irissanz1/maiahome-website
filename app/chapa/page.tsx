import type { Metadata } from "next";
import LockGuide from "@/components/LockGuide";

export const metadata: Metadata = {
  title: "Cómo abrir la chapa",
  description: "Paso a paso para abrir la chapa electrónica de tu departamento Maia Home: enciende el teclado, marca tu código de 6 dígitos y presiona #.",
  alternates: { canonical: "/chapa", languages: { es: "/chapa", en: "/en/lock" } },
  robots: { index: false, follow: false }, // página operativa para huéspedes (no indexar)
};

export default function Chapa() {
  return <LockGuide lang="es" />;
}
