import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function TestimonialsListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("testimonials").select("*").order("name");

  return (
    <AdminDataTable
      title="Testimonials"
      data={data || []}
      resourceType="testimonials"
      tableName="testimonials"
      basePath="/studio/testimonials"
    />
  );
}
