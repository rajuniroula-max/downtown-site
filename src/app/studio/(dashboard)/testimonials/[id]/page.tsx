import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/studio/forms/testimonial-form";
export default async function TestimonialEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"; let initialData = null;
  if (!isNew) { const s = createClient(); const { data } = await s.from("testimonials").select("*").eq("id", params.id).single(); if (!data) notFound(); initialData = data; }
  return <TestimonialForm initialData={initialData} id={isNew ? null : params.id} />;
}
