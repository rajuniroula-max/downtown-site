import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function BranchesListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("branches").select("*").order("order_index");

  return (
    <AdminDataTable
      title="Office Location"
      data={data || []}
      resourceType="branches"
      tableName="branches"
      basePath="/studio/branches"
      hasPublish={false}
    />
  );
}
