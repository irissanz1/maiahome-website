import React from "react";

/** Renderizador ligero: ## / ### encabezados, - listas, párrafos separados por línea en blanco. */
export default function Markdown({ text }: { text: string }) {
  const lines = (text || "").split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push(
        <p key={blocks.length} className="mt-4 leading-relaxed text-neutral-700">
          {para.join(" ")}
        </p>
      );
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={blocks.length} className="mt-4 list-disc space-y-1.5 pl-5 text-neutral-700">
          {list.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    // Imagen en su propia línea: ![alt](url)
    const im = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (im) {
      flushPara();
      flushList();
      const src = im[2].includes("cdn.sanity.io") ? `${im[2].split("?")[0]}?w=1200&auto=format&fit=max` : im[2];
      blocks.push(
        <figure key={blocks.length} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={im[1] || ""} className="w-full rounded-2xl object-cover" loading="lazy" />
        </figure>
      );
      continue;
    }
    if (line.startsWith("&gt; ") || line.startsWith("> ")) {
      flushPara();
      flushList();
      blocks.push(
        <blockquote key={blocks.length} className="my-6 border-l-4 border-maia-strong pl-5 italic text-neutral-700">
          {line.replace(/^(&gt;|>)\s/, "")}
        </blockquote>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push(
        <h2 key={blocks.length} className="mt-8 font-serif text-2xl text-neutral-900">
          {line.slice(3)}
        </h2>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      blocks.push(
        <h3 key={blocks.length} className="mt-6 font-serif text-xl text-neutral-900">
          {line.slice(4)}
        </h3>
      );
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushPara();
      list.push(line.slice(2));
      continue;
    }
    para.push(line);
  }
  flushPara();
  flushList();
  return <div>{blocks}</div>;
}
