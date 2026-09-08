import Image from "next/image";
import Link from "next/link";
import { Pencil, ImageIcon } from "lucide-react";
import { DeletePropertyButton } from "@/components/admin/DeletePropertyButton";
import { getImagePublicUrl, getMainImage } from "@/lib/images";
import type { Property } from "@/lib/types";

export function AdminPropertyRow({ property }: { property: Property }) {
  const mainImage = getMainImage(property);
  const src = mainImage ? getImagePublicUrl(mainImage.storage_path) : "";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-white p-4 md:flex-row md:items-center">
      <div className="relative h-24 w-full overflow-hidden rounded-xl bg-sky-50 md:w-32">
        {src ? (
          <Image src={src} alt={property.title} fill className="object-cover" sizes="128px" />
        ) : (
          <div className="flex h-full items-center justify-center text-sky-300">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
          {property.type}
        </p>
        <h2 className="text-lg font-semibold text-sky-950">{property.title}</h2>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/admin/propiedades/${property.id}/editar`}
          className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Link>
        <DeletePropertyButton id={property.id} />
      </div>
    </div>
  );
}
