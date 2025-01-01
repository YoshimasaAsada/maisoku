"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  redirect("/login");
};
