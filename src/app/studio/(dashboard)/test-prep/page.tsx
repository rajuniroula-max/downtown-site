import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function TestPrepListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("test_prep_programs").select("*").order("name");

  return (
    <AdminDataTable
      title="Test Prep Programs"
      data={data || []}
      resourceType="test-prep"
      tableName="test_prep_programs"
      basePath="/studio/test-prep"
    />
  );
}
