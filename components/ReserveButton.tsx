"use client";

import { track } from "@/lib/analytics";

export default function ReserveButton({
  href,
  className,
  roomId,
  nombre,
  disabled = false,
  children,
}: {
  href: string;
  className?: string;
  roomId: string;
  nombre: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("reserva_click", { roomId, nombre })}
    >
      {children}
    </a>
  );
}
