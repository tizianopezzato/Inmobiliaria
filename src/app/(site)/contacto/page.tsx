import { Mail, Phone } from "lucide-react";
import { MapsButton } from "@/components/MapsButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/config";
import { appraisalMessage, contactMessage } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-sky-950">Contacto</h1>
      <p className="mt-2 text-sky-700">
        Escribinos por WhatsApp o por cualquiera de estos canales.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex items-center gap-3 rounded-3xl bg-sky-50 p-5 text-sky-900"
        >
          <Phone className="h-5 w-5 text-sky-600" />
          {siteConfig.phone}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-3 rounded-3xl bg-sky-50 p-5 text-sky-900"
        >
          <Mail className="h-5 w-5 text-sky-600" />
          {siteConfig.email}
        </a>
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-3xl bg-sky-50 p-5 text-sky-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
            f
          </span>
          Facebook
        </a>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-3xl bg-sky-50 p-5 text-sky-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
            Ig
          </span>
          Instagram
        </a>
      </div>

      <div className="mt-4">
        <MapsButton className="w-full py-4 text-lg md:w-auto" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-sky-100 p-6">
          <h2 className="text-xl font-semibold text-sky-950">Dejanos tu consulta</h2>
          <p className="mt-2 mb-5 text-sky-700">
            Te respondemos por WhatsApp con un mensaje ya armado.
          </p>
          <WhatsAppButton message={contactMessage} label="Escribir consulta" />
        </div>
        <div className="rounded-3xl border border-sky-100 p-6">
          <h2 className="text-xl font-semibold text-sky-950">Solicitar tasación</h2>
          <p className="mt-2 mb-5 text-sky-700">
            Pedí una tasación de tu propiedad en un toque.
          </p>
          <WhatsAppButton message={appraisalMessage} label="Solicitar tasación" />
        </div>
      </div>
    </section>
  );
}
