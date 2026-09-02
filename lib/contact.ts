// Datos de contacto oficiales de Maia Home.
export const WHATSAPP_NUMBER = "525533505427";
export const WHATSAPP_DISPLAY = "+52 55 3350 5427";
export const SUPPORT_EMAIL = "info@maiahome.com";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
