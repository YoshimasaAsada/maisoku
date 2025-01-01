import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface PageParams {
  id: string;
}

export default async function Page({ params }: { params: PageParams }) {
  const { id } = params; // URLからidを取得
  const supabase = await createClient();

  const { data } = await supabase.from("maisoku").select("*").eq("id", id);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Data for ID: {id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href={`/maisoku/${id}/download`}>Download</Link>
    </div>
  );
}
