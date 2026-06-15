import { NextResponse } from "next/server";
import { createWish } from "@/lib/wishes";

export async function POST(request: Request) {
  const formData = await request.formData();
  const nickname = String(formData.get("nickname") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!nickname || !title || !content) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await createWish({ nickname, title, content });
    return NextResponse.redirect(new URL("/submit?success=1", request.url), 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create wish.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
