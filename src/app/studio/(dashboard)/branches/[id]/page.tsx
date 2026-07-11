import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BranchForm } from "@/components/studio/forms/branch-form";
export default async function BranchEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"; let initialData = null;
  if (!isNew) { const s = createClient(); const { data } = await s.from("branches").select("*").eq("id", params.id).single(); if (!data) notFound(); initialData = data; }
  return <BranchForm initialData={initialData} id={isNew ? null : params.id} />;
}
