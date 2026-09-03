import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy Notice of Maia Luxury Apartments and Services Mexico (MaiaHome).",
  alternates: { canonical: "/en/privacy-notice", languages: { es: "/aviso-privacidad", en: "/en/privacy-notice" } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Notice" lang="en">
      <p>
        Our legal documents are published in Spanish, which is the binding version. Please read the
        full <Link href="/aviso-privacidad">Privacy Notice (Spanish)</Link> for the complete, official text.
      </p>
      <p>
        If you have questions, contact us at <a href="mailto:info@maiahome.com">info@maiahome.com</a>.
      </p>
    </LegalPage>
  );
}
