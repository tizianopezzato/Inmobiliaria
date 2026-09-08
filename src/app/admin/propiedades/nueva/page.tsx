import { PropertyForm } from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-sky-950">Agregar propiedad</h1>
        <p className="text-sm text-sky-700">
          Completá los datos. No se pide ni se muestra precio.
        </p>
      </div>
      <PropertyForm />
    </div>
  );
}
