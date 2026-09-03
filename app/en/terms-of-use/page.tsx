import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Website Terms of Use — Maia Home.",
  alternates: { canonical: "/en/terms-of-use", languages: { es: "/terminos-uso", en: "/en/terms-of-use" } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage title="Terms of Use" lang="en">
      <p>
        Our legal documents are published in Spanish, which is the binding version. Please read the
        full <Link href="/terminos-uso">Terms of Use (Spanish)</Link> for the complete, official text.
      </p>
      <p>
        If you have questions, contact us at <a href="mailto:info@maiahome.com">info@maiahome.com</a>.
      </p>
    </LegalPage>
  );
}
