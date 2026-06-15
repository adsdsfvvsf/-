import { NextResponse } from "next/server";
import { getCurrentUser, isAdminUser } from "@/lib/supabase/server";
import { updateWishStatus } from "@/lib/wishes";

const allowedStatuses = new Set(["pending", "approved", "rejected"]);

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!isAdminUser(user)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();

  if (!id || !allowedStatuses.has(status)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    await updateWishStatus({
      id,
      status: status as "pending" | "approved" | "rejected",
      answer
    });
    return NextResponse.redirect(new URL("/admin?saved=1", request.url), 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update wish.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
