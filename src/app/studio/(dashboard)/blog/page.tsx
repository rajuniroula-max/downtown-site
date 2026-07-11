import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminDataTable } from "@/components/studio/data-table";

export default async function BlogListPage() {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });

  return (
    <AdminDataTable
      title="Blog Posts"
      data={data || []}
      resourceType="blog"
      tableName="blog_posts"
      basePath="/studio/blog"
      searchKey="title"
    />
  );
}
