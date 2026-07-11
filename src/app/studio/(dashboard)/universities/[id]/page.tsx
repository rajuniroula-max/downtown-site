import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { UniversityForm } from "@/components/studio/forms/university-form";

export default async function UniversityEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  let initialData = null;
  if (!isNew) {
    const supabase = createClient();
    const { data } = await supabase.from("universities").select("*").eq("id", params.id).single();
    if (!data) notFound();
    initialData = data;
  }
  return <UniversityForm initialData={initialData} id={isNew ? null : params.id} />;
}
