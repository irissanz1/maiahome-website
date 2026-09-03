export default function LegalPage({
  title,
  updated,
  children,
  lang = "es",
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
  lang?: "es" | "en";
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <h1 className="font-serif text-3xl text-neutral-900 md:text-4xl">{title}</h1>
      {updated && <p className="mt-2 text-sm text-neutral-500">{lang === "en" ? "Last updated" : "Última actualización"}: {updated}</p>}
      <div className="legal-prose mt-8 text-[15px] leading-relaxed text-neutral-700">{children}</div>
    </div>
  );
}
