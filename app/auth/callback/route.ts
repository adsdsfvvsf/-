import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient, isAdminUser } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");

  try {
    const supabase = await createSupabaseServerClient();

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    } else if (tokenHash && type) {
      await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as EmailOtpType
      });
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!isAdminUser(user)) {
      return NextResponse.redirect(new URL("/admin/login?reason=forbidden", request.url), 303);
    }

    return NextResponse.redirect(new URL("/admin", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/admin/login?reason=signin", request.url), 303);
  }
}
