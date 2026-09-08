import { notFound } from "next/navigation";
import { Bath, BedDouble, Car } from "lucide-react";
import { ImageGallery } from "@/components/ImageGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSortedImages } from "@/lib/images";
import { getPropertyById } from "@/lib/properties";
import { propertyInquiryMessage } from "@/lib/whatsapp";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sky-600">
        {property.type}
      </p>
      <h1 className="mb-8 text-3xl font-semibold text-sky-950 md:text-4xl">
        {property.title}
      </h1>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <ImageGallery images={getSortedImages(property)} title={property.title} />
        <aside className="space-y-6 rounded-3xl bg-sky-50 p-6">
          <ul className="space-y-3 text-sky-900">
            <li className="flex items-center gap-3">
              <BedDouble className="h-5 w-5 text-sky-600" />
              {property.bedrooms} habitaciones
            </li>
            <li className="flex items-center gap-3">
              <Bath className="h-5 w-5 text-sky-600" />
              {property.bathrooms} baños
            </li>
            <li className="flex items-center gap-3">
              <Car className="h-5 w-5 text-sky-600" />
              Cochera: {property.garage ? "Sí" : "No"}
            </li>
          </ul>
          <WhatsAppButton
            label="Consultar por WhatsApp"
            message={propertyInquiryMessage(property.title)}
            className="w-full py-4 text-lg"
          />
        </aside>
      </div>
      <div className="mt-10 max-w-3xl">
        <h2 className="mb-3 text-xl font-semibold text-sky-950">Descripción</h2>
        <p className="whitespace-pre-wrap leading-7 text-sky-800">
          {property.description}
        </p>
      </div>
    </section>
  );
}
