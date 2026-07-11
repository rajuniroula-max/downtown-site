import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  MessageSquare,
  Globe,
  Building,
  FileText,
  Star,
  ArrowUpRight,
  Clock,
} from "lucide-react";

async function getStats() {
  const supabase = createClient();

  // Inquiries this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const { count: weekInquiries } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .gte("created_at", oneWeekAgo.toISOString());

  // Published counts
  const { count: destinations } = await supabase
    .from("destinations")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { count: universities } = await supabase
    .from("universities")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { count: blogPosts } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  // Pending testimonials
  const { count: pendingTestimonials } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true })
    .eq("published", false);

  // Recent inquiries
  const { data: recentInquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    weekInquiries: weekInquiries || 0,
    destinations: destinations || 0,
    universities: universities || 0,
    blogPosts: blogPosts || 0,
    pendingTestimonials: pendingTestimonials || 0,
    recentInquiries: recentInquiries || [],
  };
}

export default async function StudioDashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Inquiries (this week)",
      value: stats.weekInquiries,
      icon: MessageSquare,
      color: "text-blue-600 bg-blue-50 border border-blue-100",
      href: "/studio/inquiries",
    },
    {
      label: "Published Destinations",
      value: stats.destinations,
      icon: Globe,
      color: "text-emerald-600 bg-emerald-50 border border-emerald-100",
      href: "/studio/destinations",
    },
    {
      label: "Partner Universities",
      value: stats.universities,
      icon: Building,
      color: "text-violet-600 bg-violet-50 border border-violet-100",
      href: "/studio/universities",
    },
    {
      label: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      color: "text-amber-600 bg-amber-50 border border-amber-100",
      href: "/studio/blog",
    },
    {
      label: "Pending Testimonials",
      value: stats.pendingTestimonials,
      icon: Star,
      color: "text-rose-600 bg-rose-50 border border-rose-100",
      href: "/studio/testimonials",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Studio Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor your website&apos;s data models, inquiries, and settings.</p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-slate-100 bg-white p-5 hover:shadow-lg hover:shadow-slate-100/80 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4 shadow-sm`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-slate-900">{card.value}</p>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-semibold group-hover:text-brand-primary transition-colors">
              {card.label}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </p>
          </Link>
        ))}
      </div>

      {/* Section Header: Recent Inquiries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Inquiries</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">The latest student submissions and contact requests.</p>
          </div>
          <Link
            href="/studio/inquiries"
            className="text-xs font-bold text-brand-primary hover:text-brand-primary/80 flex items-center gap-1.5"
          >
            View all inquiries <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentInquiries.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl py-12 text-center text-sm text-slate-400 shadow-sm">
            No inquiries received yet.
          </div>
        ) : (
          /* Pinterest Masonry/Grid Card Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.recentInquiries.slice(0, 6).map((inq: any) => (
              <div
                key={inq.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200 shrink-0">
                      {inq.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs leading-none">{inq.name}</p>
                      <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[150px]">{inq.email}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border tracking-wider shrink-0 ${
                      inq.status === "resolved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : inq.status === "processing"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                {/* Message Body */}
                <div className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-100/50 flex-1">
                  <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                    &ldquo;{inq.message}&rdquo;
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100/50">
                  <span className="font-mono bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                    {inq.source_page}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
