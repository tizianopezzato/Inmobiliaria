import { PropertyCard } from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";
import type { PropertyType } from "@/lib/types";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; habitaciones?: string }>;
}) {
  const params = await searchParams;
  const type =
    params.tipo === "venta" || params.tipo === "alquiler"
      ? (params.tipo as PropertyType)
      : undefined;
  const properties = await getProperties({
    type,
    bedrooms: params.habitaciones ? Number(params.habitaciones) : undefined,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-sky-950">Propiedades</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {properties.length === 0 ? (
          <p className="col-span-full rounded-3xl bg-sky-50 p-8 text-sky-700">
            No hay propiedades con esos filtros.
          </p>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </section>
  );
}
