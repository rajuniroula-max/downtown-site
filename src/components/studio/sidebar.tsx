"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Building,
  Briefcase,
  BookOpen,
  Users,
  MapPin,
  Star,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navSections: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: "Dashboard", href: "/studio", icon: LayoutDashboard },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Destinations", href: "/studio/destinations", icon: Globe },
      { label: "Universities", href: "/studio/universities", icon: Building },
      { label: "Services", href: "/studio/services", icon: Briefcase },
      { label: "Test Prep", href: "/studio/test-prep", icon: BookOpen },
      { label: "Team", href: "/studio/team", icon: Users },
      { label: "Branches", href: "/studio/branches", icon: MapPin },
      { label: "Testimonials", href: "/studio/testimonials", icon: Star },
      { label: "Blog", href: "/studio/blog", icon: FileText },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Inquiries", href: "/studio/inquiries", icon: MessageSquare },
      { label: "Settings", href: "/studio/settings", icon: Settings },
    ],
  },
];

interface StudioSidebarProps {
  userEmail: string;
  userName: string;
}

export function StudioSidebar({ userEmail, userName }: StudioSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/studio") return pathname === "/studio";
    return pathname.startsWith(href);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/studio/login";
  }

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : userEmail.slice(0, 2).toUpperCase();

  return (
    <aside className="w-60 border-r border-slate-100 bg-white flex flex-col shrink-0 h-screen sticky top-0 font-sans shadow-sm">
      {/* Brand */}
      <div className="h-16 px-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-primary to-indigo-600 flex items-center justify-center shadow-md shadow-brand-primary/10">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <span className="font-extrabold text-sm tracking-tight text-slate-900">Downtown Studio</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navSections.map((section, si) => (
          <div key={si} className="space-y-2">
            {section.title && (
              <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                      active
                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 px-1 mb-4">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-[10px] font-extrabold text-brand-primary">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{userName || "Admin"}</p>
            <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-red-650 hover:text-red-700 bg-red-50 hover:bg-red-100 transition-all w-full"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
