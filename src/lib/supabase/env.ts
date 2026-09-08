export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  const isConfigured =
    Boolean(url && anonKey) && !url.toLowerCase().includes("tu-proyecto");

  return { url, anonKey, isConfigured };
}
