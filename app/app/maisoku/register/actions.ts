"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function registerMaisoku(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    address: formData.get("address") as string,
  };

  console.log("Form data:", data);

  // アドレスのバリデーション
  if (!data.address || data.address.length < 5) {
    console.error("Invalid address");
    return { error: "Invalid address" };
  }

  const { data: insertData, error } = await supabase
    .from("maisoku")
    .insert([{ address: data.address }]);

  console.log("Insert data:", insertData);
  console.log("Insert error:", error);

  if (error) {
    console.error("Error inserting data:", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
