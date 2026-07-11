import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { DestinationForm } from "@/components/studio/forms/destination-form";

export default async function DestinationEditPage({
  params,
}: {
  params: { id: string };
}) {
  const isNew = params.id === "new";
  let initialData = null;

  if (!isNew) {
    const supabase = createClient();
    const { data } = await supabase
      .from("destinations")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!data) notFound();
    initialData = data;
  }

  return (
    <DestinationForm
      initialData={initialData}
      id={isNew ? null : params.id}
    />
  );
}
