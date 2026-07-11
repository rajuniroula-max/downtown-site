import React from "react";
import { createClient } from "@/lib/supabase/server";
import { InquiriesListClient } from "@/components/studio/inquiries-list-client";

export default async function StudioInquiriesPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Inquiries</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Manage all incoming contact forms and lead inquiries.
        </p>
      </div>

      <InquiriesListClient initialInquiries={data || []} />
    </div>
  );
}
