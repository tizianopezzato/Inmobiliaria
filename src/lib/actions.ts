"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function loginAction(_prev: string, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { isConfigured } = getSupabaseEnv();

  if (!isConfigured) {
    const error = new Error(
      "NEXT_PUBLIC_SUPABASE_URL todavía no apunta a tu proyecto de Supabase.",
    );
    console.log(error);
    return error.message;
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.log(error);
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deletePropertyAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  // 1. Obtener las rutas de las imágenes en el Storage
  const { data: images } = await supabase
    .from("property_images")
    .select("storage_path")
    .eq("property_id", id);

  const paths = (images ?? []).map((image) => image.storage_path);
  
  // 2. Borrar los archivos del Storage de Supabase
  if (paths.length > 0) {
    await supabase.storage.from("property-images").remove(paths);
  }

  // 3. NUEVO: Borrar las filas de las imágenes en la tabla (evita error de clave foránea)
  await supabase.from("property_images").delete().eq("property_id", id);

  // 4. Borrar la propiedad de la tabla principal
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    console.error("Error de Supabase al borrar la propiedad:", error);
    return;
  }

  // 5. Refrescar las vistas para que desaparezca del panel
  revalidatePath("/", "layout");
}