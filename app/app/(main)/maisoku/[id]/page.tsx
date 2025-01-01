import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase.from("maisoku").select("*").eq("id", id);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Data for ID: {id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href={`/download/maisoku/${id}`}>Download</Link>
    </div>
  );
}
