import { PropertyCard } from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";

export default async function SalePropertiesPage() {
  const properties = await getProperties({ type: "venta" });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-sky-950">Propiedades en venta</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {properties.length === 0 ? (
          <p className="col-span-full rounded-3xl bg-sky-50 p-8 text-sky-700">
            Todavía no hay propiedades en venta.
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
