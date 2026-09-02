import { placeholderColors } from "@/lib/format";

// Placeholder de foto (mientras llegan las fotos reales desde Sanity).
export default function Placeholder({
  seed,
  label,
  className = "",
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const { c1, c2 } = placeholderColors(seed);
  return (
    <div
      className={`photo-ph flex items-center justify-center ${className}`}
      style={{ ["--c1" as string]: c1, ["--c2" as string]: c2 }}
      aria-hidden="true"
    >
      {label && (
        <span className="relative z-10 font-serif text-2xl text-white/85 drop-shadow-sm">
          {label}
        </span>
      )}
    </div>
  );
}
