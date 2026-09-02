// TODO: reemplazar con los datos reales de Maia Home antes de producción.
export const WHATSAPP_NUMBER = "5215500000000"; // placeholder
export const WHATSAPP_DISPLAY = "+52 1 55 0000 0000"; // placeholder
export const SUPPORT_EMAIL = "reservaciones@maiahome.mx";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
