import { createClient } from "@/lib/supabase/server";
import type { Property, PropertyType } from "@/lib/types";

const PROPERTY_SELECT = "*, property_images(*)";

export async function getProperties(filters?: {
  type?: PropertyType;
  bedrooms?: number;
}) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .order("created_at", { ascending: false });

    if (filters?.type) {
      query = query.eq("type", filters.type);
    }
    if (filters?.bedrooms) {
      query = query.gte("bedrooms", filters.bedrooms);
    }

    const { data, error } = await query;
    if (error) {
      console.error(error);
      return [] as Property[];
    }
    return (data ?? []) as Property[];
  } catch (error) {
    console.error(error);
    return [] as Property[];
  }
}

export async function getLatestProperties(limit = 3) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error(error);
      return [] as Property[];
    }
    return (data ?? []) as Property[];
  } catch (error) {
    console.error(error);
    return [] as Property[];
  }
}

export async function getPropertyById(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("id", id)
      .single();

    if (error) {
      return null;
    }
    return data as Property;
  } catch {
    return null;
  }
}
