"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { langFromPath } from "@/lib/i18n";

export default function ReserveButton({
  href,
  className,
  roomId,
  nombre,
  disabled = false,
  pickDates = false,
  children,
}: {
  href: string;
  className?: string;
  roomId: string;
  nombre: string;
  disabled?: boolean;
  pickDates?: boolean;
  children: React.ReactNode;
}) {
  const [flash, setFlash] = useState(false);
  const flashMsg = langFromPath(usePathname()) === "en" ? "Pick your dates ☝️" : "Elige tus fechas ☝️";

  // Sin fechas: no manda a Beds24; pide elegir fechas y baja al selector.
  if (pickDates) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          const el = document.getElementById("fechas");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("ring-2", "ring-maia-strong", "rounded-2xl");
            setTimeout(() => el.classList.remove("ring-2", "ring-maia-strong", "rounded-2xl"), 1800);
          }
          setFlash(true);
          setTimeout(() => setFlash(false), 2500);
          track("reserva_pick_dates", { roomId, nombre });
        }}
      >
        {flash ? flashMsg : children}
      </button>
    );
  }

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  const external = /^https?:/i.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      onClick={() => track("reserva_click", { roomId, nombre })}
    >
      {children}
    </a>
  );
}
