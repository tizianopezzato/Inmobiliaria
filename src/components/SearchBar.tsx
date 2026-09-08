"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState(searchParams.get("tipo") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("habitaciones") ?? "");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("tipo", type);
    if (bedrooms) params.set("habitaciones", bedrooms);
    const query = params.toString();
    router.push(query ? `/propiedades?${query}` : "/propiedades");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-3xl bg-white p-4 shadow-lg shadow-sky-950/20 md:grid-cols-3"
    >
      <select
        value={type}
        onChange={(event) => setType(event.target.value)}
        className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sky-900 outline-none focus:border-sky-400"
      >
        <option value="">Tipo</option>
        <option value="venta">Venta</option>
        <option value="alquiler">Alquiler</option>
      </select>
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
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-700"
      >
        <Search className="h-4 w-4" />
        Buscar
      </button>
    </form>
  );
}
