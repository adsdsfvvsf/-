import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { WishInsert, WishRecord, WishStatus } from "@/lib/types";

const mockWishes: WishRecord[] = [
  {
    id: "demo-1",
    nickname: "匿名来信",
    title: "我想重新开始，但不知道从哪里动第一步",
    content: "希望有人能给一个不需要很大勇气的起步方式。",
    answer: "先只做一件 10 分钟能完成的小事，比如整理桌面或写下今天最想解决的问题。",
    status: "approved",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "demo-2",
    nickname: "晚风",
    title: "想做自己的小项目，又怕半途而废",
    content: "总觉得自己不够厉害，开始前就先打退堂鼓。",
    answer: null,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function listPublicWishes() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as WishRecord[];
  } catch {
    return mockWishes.filter((item) => item.status === "approved");
  }
}

export async function listAllWishes() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as WishRecord[];
  } catch {
    return mockWishes;
  }
}

export async function createWish(input: WishInsert) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("wishes")
    .insert({
      ...input,
      status: "pending"
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as WishRecord;
}

export async function updateWishStatus(params: {
  id: string;
  status: WishStatus;
  answer?: string;
}) {
  const supabase = createSupabaseAdminClient();
  const payload: Partial<WishRecord> = {
    status: params.status
  };

  if (typeof params.answer === "string") {
    payload.answer = params.answer;
  }

  const { data, error } = await supabase
    .from("wishes")
    .update(payload)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as WishRecord;
}
