import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/studio/forms/service-form";
export default async function ServiceEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  let initialData = null;
  if (!isNew) { const s = createClient(); const { data } = await s.from("services").select("*").eq("id", params.id).single(); if (!data) notFound(); initialData = data; }
  return <ServiceForm initialData={initialData} id={isNew ? null : params.id} />;
}
