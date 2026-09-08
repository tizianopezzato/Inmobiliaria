import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPropertyRow } from "@/components/admin/AdminPropertyRow";
import { getProperties } from "@/lib/properties";

export default async function AdminDashboardPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-sky-950">Propiedades</h1>
          <p className="text-sm text-sky-700">
            Cargá, editá o eliminá publicaciones.
          </p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center text-sky-700">
          Todavía no hay propiedades. Tocá el botón + para cargar la primera.
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => (
            <AdminPropertyRow key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
