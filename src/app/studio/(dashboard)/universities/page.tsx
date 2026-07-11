import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function UniversitiesListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("universities").select("*").order("name");

  return (
    <AdminDataTable
      title="Universities"
      data={data || []}
      resourceType="universities"
      tableName="universities"
      basePath="/studio/universities"
    />
  );
}
