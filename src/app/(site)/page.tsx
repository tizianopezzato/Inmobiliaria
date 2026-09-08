import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { getLatestProperties } from "@/lib/properties";
import { siteConfig } from "@/lib/config";

export default async function HomePage() {
  const featured = await getLatestProperties(3);

  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden md:min-h-[78vh]">
        <Image
          src="/local-real.jpg"
          alt="Local de Matías Pezzato Propiedades"
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/92 via-sky-950/72 to-sky-950/60" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 md:min-h-[78vh] md:pb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            {siteConfig.name}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Encontrá el lugar que estás buscando.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50">
            Somos un estudio cercano y profesional. Te escuchamos, te asesoramos
            con claridad y te acompañamos en cada venta, alquiler o tasación,
            con la responsabilidad que merece tu patrimonio.
          </p>
          <div className="mt-8 max-w-3xl">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-sky-950">
              Propiedades destacadas
            </h2>
            <p className="text-sky-700">Las publicaciones más recientes.</p>
          </div>
          <Link href="/propiedades" className="text-sm font-medium text-sky-700 hover:text-sky-900">
            Ver todas
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="rounded-3xl bg-sky-50 p-8 text-sky-700">
            Pronto vas a ver propiedades aquí.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
