import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function TeamListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("team_members").select("*").order("order_index");

  return (
    <AdminDataTable
      title="Team Members"
      data={data || []}
      resourceType="team"
      tableName="team_members"
      basePath="/studio/team"
    />
  );
}
