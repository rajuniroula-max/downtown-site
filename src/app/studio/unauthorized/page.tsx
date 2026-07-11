"use client";

import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/studio/login";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldX className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Your account does not have admin or editor permissions to access the Studio dashboard.
          Please contact your administrator to request access.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleSignOut}
            className="h-9 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Sign out &amp; switch account
          </button>
          <Link
            href="/"
            className="h-9 px-4 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
