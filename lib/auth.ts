import { redirect } from "next/navigation";
import { getCurrentUser, isAdminUser } from "@/lib/supabase/server";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login?reason=signin");
  }

  if (!isAdminUser(user)) {
    redirect("/admin/login?reason=forbidden");
  }

  return user;
}
