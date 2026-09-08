import type { Property, PropertyImage } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export function getImagePublicUrl(storagePath: string) {
  if (!storagePath || !supabaseUrl) return "";
  return `${supabaseUrl}/storage/v1/object/public/property-images/${storagePath}`;
}

export function getMainImage(property: Property): PropertyImage | undefined {
  const images = [...(property.property_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  return images.find((image) => image.is_main) ?? images[0];
}

export function getSortedImages(property: Property): PropertyImage[] {
  return [...(property.property_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
}
