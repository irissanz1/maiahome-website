import type { Metadata } from "next";
import LockGuide from "@/components/LockGuide";

export const metadata: Metadata = {
  title: "How to open the door lock",
  description: "Step by step to open the electronic lock of your Maia Home apartment: wake the keypad, enter your 6-digit code and press #.",
  alternates: { canonical: "/en/lock", languages: { es: "/chapa", en: "/en/lock" } },
  robots: { index: false, follow: false }, // página operativa para huéspedes (no indexar)
};

export default function Lock() {
  return <LockGuide lang="en" />;
}
