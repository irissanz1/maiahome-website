"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// En /registro-cliente (destino del formulario Zoho, en ES): si el huésped llega
// DESDE el formulario (referrer de Zoho) y su navegador está en inglés, lo mandamos
// a la versión EN. Solo actúa viniendo de Zoho, así el toggle ES↔EN no hace bucle.
export default function RegLangRedirect() {
  const router = useRouter();
  useEffect(() => {
    try {
      const fromForm = /zoho/i.test(document.referrer || "");
      const isEn = (navigator.language || "").toLowerCase().startsWith("en");
      if (fromForm && isEn) router.replace("/en/registration-complete");
    } catch {
      /* noop */
    }
  }, [router]);
  return null;
}
