import Link from "next/link";
import type { SP } from "@/lib/listing";
import type { Lang } from "@/lib/i18n";

const T = {
  es: { all: "Todos", available: "Disponibles", unavailable: "No disponibles", noDates: "sin fechas: según calendario" },
  en: { all: "All", available: "Available", unavailable: "Not available", noDates: "no dates: per calendar" },
} as const;

function chipClass(active: boolean, tone: "neutral" | "green" | "gray") {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition";
  if (!active) return `${base} border-neutral-300 text-neutral-700 hover:bg-neutral-50`;
  const on = {
    neutral: "border-neutral-900 bg-neutral-900 text-white",
    green: "border-emerald-600 bg-emerald-600 text-white",
    gray: "border-neutral-500 bg-neutral-500 text-white",
  };
  return `${base} ${on[tone]}`;
}

export default function AvailabilityChips({
  basePath,
  params,
  disp,
  total,
  available,
  unavailable,
  hasDates,
  lang = "es",
}: {
  basePath: string;
  params: SP;
  disp?: string;
  total: number;
  available: number;
  unavailable: number;
  hasDates: boolean;
  lang?: Lang;
}) {
  const t = T[lang];
  const chipUrl = (value?: string) => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (typeof v === "string" && k !== "disp") p.set(k, v);
    });
    if (value) p.set("disp", value);
    const qs = p.toString();
    return `${basePath}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Link href={chipUrl()} className={chipClass(!disp, "neutral")}>
        {t.all} <span className="opacity-70">· {total}</span>
      </Link>
      <Link href={chipUrl("si")} className={chipClass(disp === "si", "green")}>
        <span className={`h-2 w-2 rounded-full ${disp === "si" ? "bg-white" : "bg-emerald-500"}`} />
        {t.available} <span className="opacity-80">· {available}</span>
      </Link>
      <Link href={chipUrl("no")} className={chipClass(disp === "no", "gray")}>
        <span className={`h-2 w-2 rounded-full ${disp === "no" ? "bg-white" : "bg-neutral-400"}`} />
        {t.unavailable} <span className="opacity-80">· {unavailable}</span>
      </Link>
      {!hasDates && <span className="text-xs text-neutral-400">{t.noDates}</span>}
    </div>
  );
}
