import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const maisoku = await supabase.from("maisoku").select();

  return (
    <div>
      <h1>maisoku</h1>
      {maisoku?.data?.map((m) => (
        <>
          <p key={m.id}>
            〒{m.postal_code}
            {m.address}
          </p>
        </>
      ))}
    </div>
  );
}
