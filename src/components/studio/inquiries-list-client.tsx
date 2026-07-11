"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Calendar, Clock, Filter, CheckCircle2, AlertCircle, RefreshCw, Send } from "lucide-react";
import { updateInquiryStatus } from "@/lib/supabase/admin-actions";
import { replyToInquiry } from "@/app/actions/inquiry";

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
  replied_at?: string | null;
  reply_message?: string | null;
}

interface InquiriesListClientProps {
  initialInquiries: Inquiry[];
}

export function InquiriesListClient({ initialInquiries }: InquiriesListClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // States for custom reply editor
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySendingId, setReplySendingId] = useState<string | null>(null);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [replySuccessMessage, setReplySuccessMessage] = useState<string | null>(null);

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

  async function handleSendReply(id: string, recipientEmail: string) {
    setReplyError(null);
    setReplySuccessMessage(null);
    setReplySendingId(id);

    try {
      const res = await replyToInquiry(id, recipientEmail, replyText);
      if (res.success) {
        setReplySuccessMessage("Email response sent successfully and logged in database.");
        setReplyText("");
        setReplyingId(null);
        router.refresh();
      }
    } catch (err: any) {
      console.error("Failed to send custom reply:", err);
      setReplyError(err.message || "Failed to send email. Please try again.");
    } finally {
      setReplySendingId(null);
    }
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

              {/* Display Past Reply History Logs if they exist */}
              {inq.replied_at && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Replied via email on {new Date(inq.replied_at).toLocaleDateString()} at{" "}
                      {new Date(inq.replied_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}:
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 bg-white p-3 rounded border border-slate-100 whitespace-pre-line leading-relaxed font-sans shadow-sm">
                    {inq.reply_message}
                  </p>
                </div>
              )}

              {/* Custom Reply Textarea Block */}
              {replyingId === inq.id && (
                <div className="border border-slate-200 rounded-xl bg-slate-50/50 p-4 space-y-3 mt-3 shadow-inner">
                  <label className="block text-xs font-bold text-slate-650 uppercase">Compose Email Response</label>
                  {replyError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700 font-semibold">
                      {replyError}
                    </div>
                  )}
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type custom email message to send directly to this student..."
                    className="w-full bg-white border border-slate-200 text-xs rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-y leading-normal text-slate-800"
                    disabled={replySendingId === inq.id}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingId(null);
                        setReplyText("");
                        setReplyError(null);
                      }}
                      className="h-8 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                      disabled={replySendingId === inq.id}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendReply(inq.id, inq.email)}
                      disabled={replySendingId === inq.id || !replyText.trim()}
                      className="h-8 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      {replySendingId === inq.id ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Send className="w-3 h-3" />
                      )}
                      {replySendingId === inq.id ? "Sending..." : "Send Response"}
                    </button>
                  </div>
                </div>
              )}

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
                        {updatingId === inq.id && inq.status !== status ? (
                          <RefreshCw className="w-3 h-3 animate-spin inline mr-1" />
                        ) : null}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send Reply Button trigger */}
                {replyingId !== inq.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingId(inq.id);
                      setReplyText("");
                      setReplyError(null);
                    }}
                    className="h-8 px-4 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary hover:text-brand-primary/90 text-xs font-bold border border-brand-primary/30 shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {inq.replied_at ? "Write Another Reply" : "Reply via Email"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
