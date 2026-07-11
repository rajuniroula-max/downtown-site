import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function ServicesListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("services").select("*").order("order_index");

  return (
    <AdminDataTable
      title="Services"
      data={data || []}
      resourceType="services"
      tableName="services"
      basePath="/studio/services"
      searchKey="title"
    />
  );
}
