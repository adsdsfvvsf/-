import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore sign-out failures and return user to the login page.
  }

  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
