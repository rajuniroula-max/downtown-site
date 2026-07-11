import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  FolderKanban, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Search, 
  LogOut, 
  Bell 
} from "lucide-react";

export default function StudioDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
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

        {/* Footer info / Logout */}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-900 px-8 flex items-center justify-between shrink-0 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
            </button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 text-xs gap-1.5 h-9">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
            <p className="text-slate-400 text-xs mt-1">Real-time metrics and operations status.</p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-6 relative overflow-hidden backdrop-blur-sm">
              <span className="block text-xs font-medium text-slate-500">Active Consultancies</span>
              <span className="block text-3xl font-extrabold text-white mt-2">12</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full mt-4">
                +8% vs last month
              </span>
            </div>

            <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-6 relative overflow-hidden backdrop-blur-sm">
              <span className="block text-xs font-medium text-slate-500">Form Submissions</span>
              <span className="block text-3xl font-extrabold text-white mt-2">84</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full mt-4">
                +24% vs last week
              </span>
            </div>

            <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-6 relative overflow-hidden backdrop-blur-sm">
              <span className="block text-xs font-medium text-slate-500">Conversion Rate</span>
              <span className="block text-3xl font-extrabold text-white mt-2">3.4%</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-full mt-4">
                Stable analytics
              </span>
            </div>
          </div>

          {/* Table Area */}
          <div className="rounded-xl border border-slate-900 bg-slate-900/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-900 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Recent Clients</h3>
              <Button variant="ghost" size="xs" className="text-slate-400 hover:text-white flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
            <div className="divide-y divide-slate-900/50">
              <div className="px-6 py-3 flex items-center justify-between text-xs hover:bg-slate-900/10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold text-[10px]">
                    AC
                  </div>
                  <div>
                    <span className="block font-medium text-white">Acme Corp</span>
                    <span className="block text-[10px] text-slate-500">Strategy Restructuring</span>
                  </div>
                </div>
                <span className="text-slate-400">July 10, 2026</span>
              </div>

              <div className="px-6 py-3 flex items-center justify-between text-xs hover:bg-slate-900/10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-violet-950 text-violet-400 flex items-center justify-center font-bold text-[10px]">
                    NI
                  </div>
                  <div>
                    <span className="block font-medium text-white">Nova Industries</span>
                    <span className="block text-[10px] text-slate-500">Automated Pipeline</span>
                  </div>
                </div>
                <span className="text-slate-400">July 08, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
