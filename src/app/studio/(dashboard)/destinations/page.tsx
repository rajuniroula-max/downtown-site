import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function DestinationsListPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("destinations")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <AdminDataTable
      title="Destinations"
      data={data || []}
      resourceType="destinations"
      tableName="destinations"
      basePath="/studio/destinations"
      searchKey="country"
    />
  );
}
