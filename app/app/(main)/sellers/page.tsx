import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@supabase/supabase-js";

export default async function Countries() {
  const supabase = await createClient();
  const { data: sellers } = await supabase.from("seller").select();

  return <pre>{JSON.stringify(sellers, null, 2)}</pre>;
}
