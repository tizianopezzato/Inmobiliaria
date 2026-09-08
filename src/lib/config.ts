export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Inmobiliaria",
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
    /\D/g,
    "",
  ),
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ??
    "https://www.google.com/maps/search/?api=1&query=Matias+Pezzato+Propiedades+25+de+Mayo+Buenos+Aires",
  hours:
    "Lunes a Viernes de 9 a 11hs. / 16 a 20hs. - Sábados 9 a 12hs.",
  license:
    "MARTILLERO Y CORREDOR PUBLICO UNIVERSITARIO (UNLP) MP3648",
};
