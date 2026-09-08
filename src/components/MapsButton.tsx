import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function MapsButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteConfig.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 ${className}`}
    >
      <MapPin className="h-5 w-5" />
      Ver ubicación en Google Maps
    </a>
  );
}
