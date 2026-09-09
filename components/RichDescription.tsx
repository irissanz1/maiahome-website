// Renderiza la descripción de la ficha. Las líneas que empiezan con "•" se
// muestran como una lista <ul>; el resto, como párrafos. Sirve para las
// descripciones SEO nuevas (intro en headline + viñetas aquí) y para las
// descripciones viejas en prosa (que caen a párrafos con saltos de línea).
export default function RichDescription({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  const lines = text.split("\n").map((l) => l.trim());
  const bullets = lines.filter((l) => l.startsWith("•")).map((l) => l.replace(/^•\s*/, ""));
  const paras = lines.filter((l) => l && !l.startsWith("•"));

  return (
    <div className={`mt-3 leading-relaxed text-neutral-600 ${className}`}>
      {paras.length > 0 && (
        <div className="whitespace-pre-line">{paras.join("\n")}</div>
      )}
      {bullets.length > 0 && (
        <ul className={`space-y-2 ${paras.length > 0 ? "mt-4" : ""}`}>
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-maia-strong" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
