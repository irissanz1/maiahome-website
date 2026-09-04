import React from "react";
import Link from "next/link";

/** Procesa formato en línea: [texto](url), **negrita**, *itálica*. */
function emphasis(text: string, kp: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={`${kp}-b${i}`}>{m[1]}</strong>);
    else out.push(<em key={`${kp}-i${i}`}>{m[2]}</em>);
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function inline(text: string, kp: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  const linkCls = "font-medium text-maia-strong underline underline-offset-2 hover:text-maia-dark";
  while ((m = linkRe.exec(text))) {
    if (m.index > last) nodes.push(...emphasis(text.slice(last, m.index), `${kp}-t${i}`));
    const label = m[1];
    const href = m[2];
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`${kp}-l${i}`} href={href} className={linkCls}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a key={`${kp}-a${i}`} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {label}
        </a>
      );
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(...emphasis(text.slice(last), `${kp}-t${i}`));
  return nodes;
}

/** Renderizador ligero: ## / ### encabezados, - listas, > citas, imágenes y párrafos; con enlaces/negritas/itálicas en línea. */
export default function Markdown({ text }: { text: string }) {
  const lines = (text || "").split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push(
        <p key={blocks.length} className="mt-4 leading-relaxed text-neutral-700">
          {inline(para.join(" "), `p${blocks.length}`)}
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
            <li key={i}>{inline(li, `li${blocks.length}-${i}`)}</li>
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
          {inline(line.replace(/^(&gt;|>)\s/, ""), `q${blocks.length}`)}
        </blockquote>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push(
        <h2 key={blocks.length} className="mt-8 font-serif text-2xl text-neutral-900">
          {inline(line.slice(3), `h2${blocks.length}`)}
        </h2>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      blocks.push(
        <h3 key={blocks.length} className="mt-6 font-serif text-xl text-neutral-900">
          {inline(line.slice(4), `h3${blocks.length}`)}
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
