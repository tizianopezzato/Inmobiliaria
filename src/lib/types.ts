export type PropertyType = "venta" | "alquiler";

export type PropertyImage = {
  id: string;
  property_id: string;
  storage_path: string;
  is_main: boolean;
  sort_order: number;
  created_at: string;
};

export type Property = {
  id: string;
  type: PropertyType;
  title: string;
  description: string;
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  created_at: string;
  property_images?: PropertyImage[];
};

export type PropertyFormValues = {
  type: PropertyType;
  title: string;
  description: string;
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
};
