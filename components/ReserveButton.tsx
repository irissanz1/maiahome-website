"use client";

import { track } from "@/lib/analytics";

export default function ReserveButton({
  href,
  className,
  roomId,
  nombre,
  children,
}: {
  href: string;
  className?: string;
  roomId: string;
  nombre: string;
  children: React.ReactNode;
}) {
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
