import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import type { Property } from "@/lib/types";
import { getImagePublicUrl, getMainImage } from "@/lib/images";

export function PropertyCard({ property }: { property: Property }) {
  const mainImage = getMainImage(property);
  const src = mainImage ? getImagePublicUrl(mainImage.storage_path) : "";

  return (
    <article className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-sky-50">
        {src ? (
          <Image
            src={src}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sky-300">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
          {property.type}
        </span>
      </div>
      <div className="space-y-4 p-5">
        <h3 className="text-lg font-semibold text-sky-950">{property.title}</h3>
        <Link
          href={`/propiedades/${property.id}`}
          className="inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
        >
          Ver más
        </Link>
      </div>
    </article>
  );
}
