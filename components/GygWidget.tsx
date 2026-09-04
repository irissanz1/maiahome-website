"use client";

import { useEffect } from "react";
import { GYG_PARTNER_ID } from "@/lib/gyg";

// Widget de GetYourGuide (experiencias/tours). Carga el script del partner una sola
// vez y renderiza el contenedor que GYG detecta por sus atributos data-gyg-*.
export default function GygWidget({
  locale = "es-ES",
  q = "Ciudad de México",
  items = 12,
}: {
  locale?: string;
  q?: string;
  items?: number;
}) {
  useEffect(() => {
    if (!GYG_PARTNER_ID) return;
    const SRC = "https://widget.getyourguide.com/dist/pa.umd.production.min.js";
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.defer = true;
      s.setAttribute("data-gyg-partner-id", GYG_PARTNER_ID);
      document.body.appendChild(s);
    }
  }, []);

  if (!GYG_PARTNER_ID) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-sm text-neutral-500">
        Widget de tours pendiente de configuración.
      </div>
    );
  }

  return (
    <div
      data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
      data-gyg-locale-code={locale}
      data-gyg-widget="activities"
      data-gyg-number-of-items={String(items)}
      data-gyg-partner-id={GYG_PARTNER_ID}
      data-gyg-q={q}
    />
  );
}
