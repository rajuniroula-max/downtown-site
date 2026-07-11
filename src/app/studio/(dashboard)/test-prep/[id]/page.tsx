import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TestPrepForm } from "@/components/studio/forms/test-prep-form";
export default async function TestPrepEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  let initialData = null;
  if (!isNew) { const s = createClient(); const { data } = await s.from("test_prep_programs").select("*").eq("id", params.id).single(); if (!data) notFound(); initialData = data; }
  return <TestPrepForm initialData={initialData} id={isNew ? null : params.id} />;
}
