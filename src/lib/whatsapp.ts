import { siteConfig } from "@/lib/config";

export function buildWhatsAppUrl(message: string) {
  const number = siteConfig.whatsappNumber;
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function propertyInquiryMessage(title: string, url?: string) {
  const extra = url ? ` Link: ${url}` : "";
  return `Hola, quiero consultar por la propiedad "${title}".${extra}`;
}

export const contactMessage =
  "Hola, dejo mi consulta. Me gustaría recibir más información.";

export const appraisalMessage =
  "Hola, quiero solicitar una tasación de mi propiedad.";
