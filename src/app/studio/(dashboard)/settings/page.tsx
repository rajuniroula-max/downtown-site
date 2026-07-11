import React from "react";
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/studio/forms/settings-form";

export default async function StudioSettingsPage() {
  const supabase = createClient();
  
  // Fetch announcement_bar setting
  const { data: announcementBar } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "announcement_bar")
    .single();

  // Fetch contact_numbers setting
  const { data: contactNumbers } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact_numbers")
    .single();

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Site Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Configure site-wide announcements, global contact details, and links.
        </p>
      </div>

      <SettingsForm 
        initialAnnouncement={announcementBar?.value || null}
        initialContacts={contactNumbers?.value || null}
      />
    </div>
  );
}
