export type WishStatus = "pending" | "approved" | "rejected";

export type WishRecord = {
  id: string;
  nickname: string;
  title: string;
  content: string;
  answer: string | null;
  status: WishStatus;
  created_at: string;
  updated_at: string;
};

export type WishInsert = Pick<WishRecord, "nickname" | "title" | "content">;
