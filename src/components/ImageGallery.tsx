"use unified";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-3xl bg-sky-50 text-sky-400">
        Sin imágenes
      </div>
    );
  }

  const current = images[active] ?? images[0];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="w-full max-w-full min-w-0 space-y-3">
        {/* Imagen principal (Ahora es clickeable) */}
        <div 
          className="relative aspect-[16/10] w-full max-w-full overflow-hidden rounded-3xl bg-sky-50 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={getImagePublicUrl(current.storage_path)}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          {/* Indicador visual de que se puede ampliar */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
            <div className="opacity-0 group-hover:opacity-100 rounded-full bg-black/50 p-2 text-white transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-1">
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
                  alt={`${title}${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal de pantalla completa */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Botón cerrar */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 z-[60] p-2 text-white/70 hover:text-white"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Flecha anterior */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 md:left-8 top-1/2 z-[60] -translate-y-1/2 p-2 text-white/70 hover:text-white"
              aria-label="Imagen anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          {/* Imagen ampliada */}
          <div 
            className="relative h-full w-full max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()} // Evita que al hacer clic en la foto se cierre el modal
          >
            <Image
              src={getImagePublicUrl(current.storage_path)}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Flecha siguiente */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 md:right-8 top-1/2 z-[60] -translate-y-1/2 p-2 text-white/70 hover:text-white"
              aria-label="Imagen siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}