import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BlogForm } from "@/components/studio/forms/blog-form";
export default async function BlogEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new"; let initialData = null;
  if (!isNew) { const s = createClient(); const { data } = await s.from("blog_posts").select("*").eq("id", params.id).single(); if (!data) notFound(); initialData = data; }
  return <BlogForm initialData={initialData} id={isNew ? null : params.id} />;
}
