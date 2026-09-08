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
      <section className="bg-white">
        <div className="relative">
          <Image
            src="/local-real.jpg"
            alt="Local de Matías Pezzato Propiedades"
            width={2000}
            height={2000}
            priority
            className="h-auto w-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-sky-950/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 pt-24 md:pb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
              {siteConfig.name}
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Te acompañamos a encontrar el lugar donde empieza tu próxima etapa.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-sky-50 md:text-lg">
              Somos un estudio cercano y profesional. Te escuchamos, te asesoramos
              con claridad y te acompañamos en cada venta, alquiler o tasación,
              con la responsabilidad que merece tu patrimonio.
            </p>
            <div className="mt-6 max-w-3xl">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>
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
