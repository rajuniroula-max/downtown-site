import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TeamForm } from "@/components/studio/forms/team-form";
export default async function TeamEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"; let initialData = null;
  if (!isNew) { const s = createClient(); const { data } = await s.from("team_members").select("*").eq("id", params.id).single(); if (!data) notFound(); initialData = data; }
  return <TeamForm initialData={initialData} id={isNew ? null : params.id} />;
}
