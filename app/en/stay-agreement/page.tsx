import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Stay Agreement",
  description: "Stay Agreement — Maia Home.",
  alternates: { canonical: "/en/stay-agreement", languages: { es: "/stay-agreement", en: "/en/stay-agreement" } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage title="Stay Agreement" lang="en">
      <p>
        Our legal documents are published in Spanish, which is the binding version. Please read the
        full <Link href="/stay-agreement">Stay Agreement (Spanish)</Link> for the complete, official text.
      </p>
      <p>
        If you have questions, contact us at <a href="mailto:info@maiahome.com">info@maiahome.com</a>.
      </p>
    </LegalPage>
  );
}
