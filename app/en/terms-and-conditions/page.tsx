import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions of service — Maia Home.",
  alternates: { canonical: "/en/terms-and-conditions", languages: { es: "/terminos-y-condiciones", en: "/en/terms-and-conditions" } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage title="Terms and Conditions" lang="en">
      <p>
        Our legal documents are published in Spanish, which is the binding version. Please read the
        full <Link href="/terminos-y-condiciones">Terms and Conditions (Spanish)</Link> for the complete, official text.
      </p>
      <p>
        If you have questions, contact us at <a href="mailto:info@maiahome.com">info@maiahome.com</a>.
      </p>
    </LegalPage>
  );
}
