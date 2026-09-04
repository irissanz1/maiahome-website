"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

const GA = process.env.NEXT_PUBLIC_GA_ID;
const PX = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Envía page_view en cada cambio de ruta (SPA). La primera carga ya la reportan
// los snippets base (gtag config / fbq PageView), así que la omitimos aquí para
// no duplicar el PageView inicial.
function PageViews() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as any;
    const url = pathname + (sp.toString() ? `?${sp.toString()}` : "");
    if (typeof w.gtag === "function" && GA) w.gtag("event", "page_view", { page_path: url });
    if (typeof w.fbq === "function") w.fbq("track", "PageView");
  }, [pathname, sp]);
  return null;
}

export default function Analytics() {
  if (!GA && !PX) return null; // sin IDs configurados, no carga nada
  return (
    <>
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');`}
          </Script>
        </>
      )}
      {PX && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PX}');fbq('track','PageView');`}
        </Script>
      )}
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}
