import { createBrowserClient } from "@supabase/ssr";
import { getEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnv();

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase browser environment variables.");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
