"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerMaisoku(formData: FormData) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  // 売主のIDを取得
  const sellerId = await supabase
    .from("seller")
    .select("id")
    .eq("auth_id", user.data?.user?.id)
    .single();

  // フォームデータを取得
  const data = {
    address: formData.get("address") as string,
    post_code: formData.get("postalCode") as string,
  };

  // supabaseのmaisokuテーブルにデータを挿入
  const { error } = await supabase.from("maisoku").insert([
    {
      address: data.address,
      seller_id: sellerId.data?.id,
      postal_code: data.post_code,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    throw new Error(error.message || "Unknown error occurred");
  }

  revalidatePath("/maisoku", "layout");
  redirect("/maisoku");
}
