"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MARKETS, resolveMarket, type MarketId } from "@/lib/market";

export default function MarketSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = resolveMarket(sp.get("market")).id;

  function setMarket(id: MarketId) {
    if (id === current) return;
    const params = new URLSearchParams(Array.from(sp.entries()));
    params.set("market", id);
    params.delete("zona"); // la zona pertenece al otro mercado
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-0.5 text-sm">
      {(Object.values(MARKETS) as { id: MarketId; label: string }[]).map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => setMarket(m.id)}
          aria-pressed={current === m.id}
          className={`rounded-full px-3 py-1 font-medium transition ${
            current === m.id
              ? "bg-maia-dark text-white"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
