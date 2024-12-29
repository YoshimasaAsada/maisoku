import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@supabase/supabase-js";

export default async function Countries() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
