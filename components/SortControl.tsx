"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { langFromPath } from "@/lib/i18n";

const T = {
  es: { label: "Ordenar", rel: "Relevancia", asc: "Precio: menor a mayor", desc: "Precio: mayor a menor" },
  en: { label: "Sort", rel: "Relevance", asc: "Price: low to high", desc: "Price: high to low" },
} as const;

export default function SortControl() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = T[langFromPath(pathname)];
  const orden = params.get("orden") || "";

  function set(v: string) {
    const p = new URLSearchParams(params.toString());
    if (v) p.set("orden", v);
    else p.delete("orden");
    router.push(`${pathname}?${p.toString()}`, { scroll: false });
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-neutral-600">
      <span className="font-medium">{t.label}:</span>
      <select
        value={orden}
        onChange={(e) => set(e.target.value)}
        className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-400"
      >
        <option value="">{t.rel}</option>
        <option value="precio-asc">{t.asc}</option>
        <option value="precio-desc">{t.desc}</option>
      </select>
    </label>
  );
}
