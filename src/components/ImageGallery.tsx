"use client";

import Image from "next/image";
import { useState } from "react";
import { getImagePublicUrl } from "@/lib/images";
import type { PropertyImage } from "@/lib/types";

export function ImageGallery({
  images,
  title,
}: {
  images: PropertyImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-3xl bg-sky-50 text-sky-400">
        Sin imágenes
      </div>
    );
  }

  const current = images[active] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sky-50">
        <Image
          src={getImagePublicUrl(current.storage_path)}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border-2 ${
                index === active ? "border-sky-500" : "border-transparent"
              }`}
            >
              <Image
                src={getImagePublicUrl(image.storage_path)}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
