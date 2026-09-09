export type PropertyType = "venta" | "alquiler";

export interface PropertyImage {
  id: string;
  property_id: string;
  storage_path: string;
  is_main: boolean;
  sort_order: number;
}

export interface Property {
  id: string;
  type: PropertyType;
  property_type?: string; // Nuevo campo
  title: string;
  description: string;
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  is_rented?: boolean; // Nuevo campo booleano
  property_images?: PropertyImage[];
  created_at?: string;
}

export interface PropertyFormValues {
  type: PropertyType;
  property_type: string; // Nuevo campo
  title: string;
  description: string;
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  is_rented: boolean; // Nuevo campo
}