import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { whatsappUrl } from "@/lib/contact";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maiahome.mx"),
  title: {
    default: "Maia Home · Departamentos amueblados en CDMX y Houston",
    template: "%s · Maia Home",
  },
  description:
    "Departamentos amueblados premium en Polanco, Condesa (CDMX) y Houston. Reserva directo, sin intermediarios: mejor tarifa y atención personal.",
  openGraph: {
    type: "website",
    siteName: "Maia Home",
    locale: "es_MX",
    images: [{ url: "/og/banner.jpg", width: 1200, height: 630, alt: "Maia Home — departamentos de lujo en CDMX" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/banner.jpg"],
  },
  alternates: { canonical: "/" },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Maia Home",
  url: "https://maiahome.mx",
  logo: "https://maiahome.mx/maia-logo.png",
  image: "https://maiahome.mx/og/banner.jpg",
  description:
    "Departamentos amueblados premium en renta en Ciudad de México (Polanco, Condesa) y Houston. Reserva directo, sin intermediarios.",
  telephone: "+525533505427",
  email: "info@maiahome.com",
  priceRange: "$$$",
  areaServed: [
    { "@type": "City", name: "Ciudad de México" },
    { "@type": "City", name: "Houston" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Ciudad de México", addressCountry: "MX" },
  sameAs: [
    "https://www.instagram.com/maiahomemx",
    "https://www.facebook.com/maiahomemx",
    "https://www.tiktok.com/@maiahomemx",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={montserrat.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <a
          href={whatsappUrl("Hola, me interesa información sobre un departamento de Maia Home.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.42 1.32-1.95 1.36-.5.04-.5.4-3.16-.66-2.66-1.06-4.34-3.79-4.47-3.97-.13-.18-1.07-1.43-1.07-2.72s.68-1.93.92-2.2c.24-.26.53-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.58.8 2 .87 2.14.07.13.12.29.02.47-.1.18-.15.29-.29.45-.15.16-.31.36-.44.48-.15.15-.3.31-.13.6.18.29.79 1.3 1.69 2.11 1.16 1.03 2.13 1.35 2.43 1.5.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.29.4-.24.66-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.12.07.68-.17 1.36Z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
