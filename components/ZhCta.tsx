"use client";

import { whatsappUrl } from "@/lib/contact";
import { track } from "@/lib/analytics";

const WA_MSG = "你好，我想了解墨西哥城的公寓。（来自中文页面）";

// Los clics de esta página se marcan aparte para poder medir la prueba.
export function ZhWhatsApp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={whatsappUrl(WA_MSG)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("zh_cta", { destino: "whatsapp" })}
      className={className}
    >
      {children}
    </a>
  );
}

export function ZhLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} onClick={() => track("zh_cta", { destino: href })} className={className}>
      {children}
    </a>
  );
}
