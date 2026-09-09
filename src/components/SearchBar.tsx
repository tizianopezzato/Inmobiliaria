"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parámetros de búsqueda actualizados
  const [listingType, setListingType] = useState(searchParams.get("propiedades") ?? "");
  const [propertyType, setPropertyType] = useState(searchParams.get("tipo") ?? "todos");
  const [bedrooms, setBedrooms] = useState(searchParams.get("habitaciones") ?? "");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.set("propiedades", listingType);
    if (propertyType && propertyType !== "todos") params.set("tipo", propertyType);
    if (bedrooms) params.set("habitaciones", bedrooms);
    
    const query = params.toString();
    router.push(query ? `/propiedades?${query}` : "/propiedades");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-3xl bg-white p-4 shadow-lg shadow-sky-950/20 md:grid-cols-3"
    >
      {/* 1. Propiedades: Venta / Alquiler */}
      <select
        value={listingType}
        onChange={(event) => setListingType(event.target.value)}
        className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sky-900 outline-none focus:border-sky-400"
      >
        <option value="">Propiedades</option>
        <option value="venta">Venta</option>
        <option value="alquiler">Alquiler</option>
      </select>

      {/* 2. Tipo: todos, lote, dpto, casa, local, campo, cochera, quinta */}
      <select
        value={propertyType}
        onChange={(event) => setPropertyType(event.target.value)}
        className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sky-900 outline-none focus:border-sky-400"
      >
        <option value="todos">Tipo: Todos</option>
        <option value="lote">Lote</option>
        <option value="dpto">Dpto</option>
        <option value="casa">Casa</option>
        <option value="local">Local</option>
        <option value="campo">Campo</option>
        <option value="cochera">Cochera</option>
        <option value="quinta">Quinta</option>
      </select>

      {/* 3. Habitaciones (Intacto) */}
      <select
        value={bedrooms}
        onChange={(event) => setBedrooms(event.target.value)}
        className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sky-900 outline-none focus:border-sky-400"
      >
        <option value="">Habitaciones</option>
        <option value="1">1 o más</option>
        <option value="2">2 o más</option>
        <option value="3">3 o más</option>
        <option value="4">4 o más</option>
      </select>

      <button
        type="submit"
        className="md:col-span-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-700"
      >
        <Search className="h-4 w-4" />
        Buscar
      </button>
    </form>
  );
}