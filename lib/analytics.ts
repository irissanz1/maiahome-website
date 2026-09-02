// Helper de tracking: manda eventos a GA4 (gtag) y Meta Pixel (fbq) si están cargados.
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (typeof w.gtag === "function") w.gtag("event", event, params || {});
  if (typeof w.fbq === "function") w.fbq("trackCustom", event, params || {});
}
