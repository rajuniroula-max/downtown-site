"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Calendar, Clock, Filter, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { updateInquiryStatus } from "@/lib/supabase/admin-actions";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source_page: string;
  destination_interest: string | null;
  status: "pending" | "processing" | "resolved";
  created_at: string;
}

interface InquiriesListClientProps {
  initialInquiries: Inquiry[];
}

export function InquiriesListClient({ initialInquiries }: InquiriesListClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredInquiries = initialInquiries.filter((inq) => {
    if (filterStatus === "all") return true;
    return inq.status === filterStatus;
  });

  async function handleStatusChange(id: string, newStatus: "pending" | "processing" | "resolved") {
    setUpdatingId(id);
    startTransition(async () => {
      try {
        await updateInquiryStatus(id, newStatus);
        router.refresh();
      } catch (err) {
        console.error("Failed to update inquiry status:", err);
      } finally {
        setUpdatingId(null);
      }
    });
  }

  return (
    <div className="space-y-4 text-slate-800">
      {/* Filters Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700">Filter by status:</span>
        </div>
        <div className="flex gap-1.5">
          {["all", "pending", "processing", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterStatus === status
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-250 shadow-sm">
            No inquiries match this status.
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 shadow-sm transition-all space-y-4"
            >
              {/* Header / Meta */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{inq.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {inq.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {inq.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Badges */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      inq.status === "resolved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                        : inq.status === "processing"
                        ? "bg-amber-50 text-amber-700 border-amber-200/50"
                        : "bg-red-50 text-red-700 border-red-200/50"
                    }`}
                  >
                    {inq.status}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(inq.created_at).toLocaleDateString()} at{" "}
                    {new Date(inq.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div className="md:col-span-2 space-y-1.5">
                  <p className="font-semibold text-slate-500">Message:</p>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed whitespace-pre-line">
                    {inq.message}
                  </p>
                </div>

                <div className="space-y-3 bg-slate-50/50 p-3.5 rounded-lg border border-slate-100 self-start">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      Source Page
                    </span>
                    <span className="text-slate-700 font-mono mt-0.5 block truncate" title={inq.source_page}>
                      {inq.source_page}
                    </span>
                  </div>
                  {inq.destination_interest && (
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                        Destination Interest
                      </span>
                      <span className="text-brand-primary font-bold mt-0.5 block">
                        {inq.destination_interest}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Change Status:</span>
                  <div className="flex gap-1.5">
                    {(["pending", "processing", "resolved"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(inq.id, status)}
                        disabled={updatingId === inq.id || isPending}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold capitalize border transition-all shadow-sm ${
                          inq.status === status
                            ? status === "resolved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                              : status === "processing"
                              ? "bg-amber-50 text-amber-700 border-amber-250"
                              : "bg-red-50 text-red-700 border-red-250"
                            : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {updatingId === inq.id && inq.status !== status && "..." ? (
                          <RefreshCw className="w-3 h-3 animate-spin inline mr-1" />
                        ) : null}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reply Button (UI Placeholder) */}
                <button
                  type="button"
                  className="h-8 px-4 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary hover:text-brand-primary/90 text-xs font-bold border border-brand-primary/30 shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email (Placeholder)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
