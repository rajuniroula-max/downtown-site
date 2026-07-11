import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StudioSidebar } from "@/components/studio/sidebar";

export default async function StudioDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const userResult = await supabase.auth.getUser();
  console.log("[SERVER LAYOUT] auth.getUser() result:", userResult);
  const user = userResult.data.user;

  if (!user) {
    console.log("[SERVER LAYOUT] No user, redirecting to /studio/login");
    redirect("/studio/login");
  }

  // Fetch profile role
  const profileResult = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();
  console.log("[SERVER LAYOUT] profiles query result:", profileResult);

  const profile = profileResult.data;

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    console.log("[SERVER LAYOUT] Unauthorized role or no profile, redirecting to /studio/unauthorized");
    redirect("/studio/unauthorized");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
      <StudioSidebar
        userEmail={user.email || ""}
        userName={profile.full_name || ""}
      />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
