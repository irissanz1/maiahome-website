"use client";

import { useEffect } from "react";

// Dispara "Reserva iniciada" al cargar la página de checkout (Beds24).
export default function TrackCheckout() {
  useEffect(() => {
    const w = window as any;
    if (typeof w.fbq === "function") w.fbq("track", "InitiateCheckout");
    if (typeof w.gtag === "function") w.gtag("event", "begin_checkout");
  }, []);
  return null;
}
