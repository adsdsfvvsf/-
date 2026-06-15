import { NextResponse } from "next/server";
import { hasSupabaseConfig } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.redirect(new URL("/admin/login?reason=signin", request.url), 303);
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url), 303);
  }

  try {
    const supabase = await createSupabaseServerClient();
    const redirectTo = new URL("/auth/callback", request.url).toString();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo
      }
    });

    if (error) {
      throw error;
    }

    return NextResponse.redirect(new URL("/admin/login?sent=1", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/admin/login?reason=signin", request.url), 303);
  }
}
