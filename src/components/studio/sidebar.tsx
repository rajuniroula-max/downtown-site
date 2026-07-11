import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, FolderKanban, TrendingUp, LogOut } from "lucide-react";

export function StudioSidebar() {
  return (
    <aside className="w-64 border-r border-slate-900 bg-slate-950 flex flex-col shrink-0">
      {/* Brand */}
      <div className="h-16 px-6 border-b border-slate-900 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
          D
        </div>
        <span className="font-semibold text-sm tracking-tight text-white">
          Studio Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-950/50 text-indigo-400 text-sm font-medium">
          <LayoutDashboard className="w-4 h-4" />
          Overview
        </Link>
        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 text-sm font-medium transition-colors">
          <FolderKanban className="w-4 h-4" />
          Projects
        </Link>
        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 text-sm font-medium transition-colors">
          <TrendingUp className="w-4 h-4" />
          Analytics
        </Link>
        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 text-sm font-medium transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-900">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xs">
            AD
          </div>
          <div>
            <span className="block text-xs font-semibold text-white">Admin Demo</span>
            <span className="block text-[10px] text-slate-500">admin@downtown.site</span>
          </div>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20">
            <LogOut className="w-4 h-4" />
            Exit Studio
          </Button>
        </Link>
      </div>
    </aside>
  );
}
