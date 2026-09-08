import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { getPropertyById } from "@/lib/properties";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-sky-950">Editar propiedad</h1>
        <p className="text-sm text-sky-700">{property.title}</p>
      </div>
      <PropertyForm property={property} />
    </div>
  );
}
