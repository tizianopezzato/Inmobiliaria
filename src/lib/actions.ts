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

  const { data: images } = await supabase
    .from("property_images")
    .select("storage_path")
    .eq("property_id", id);

  const paths = (images ?? []).map((image) => image.storage_path);
  if (paths.length > 0) {
    await supabase.storage.from("property-images").remove(paths);
  }

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/propiedades");
  revalidatePath("/admin");
}
