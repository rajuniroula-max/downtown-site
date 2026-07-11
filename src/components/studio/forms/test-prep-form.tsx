"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { upsertTestPrep } from "@/lib/supabase/admin-actions";
import { ArrayInput, RepeaterInput } from "@/components/studio/form-controls";

interface Props { initialData: any | null; id: string | null; }
export function TestPrepForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: initialData?.slug || "", name: initialData?.name || "",
    tagline: initialData?.tagline || "", overview: initialData?.overview || "",
    syllabusPoints: initialData?.syllabus_points || [],
    duration: initialData?.duration || "", pricing: initialData?.pricing || "",
    classSchedule: initialData?.class_schedule || [],
    faq: initialData?.faq || [],
    published: initialData?.published ?? true,
  });
  function u(k: string, v: any) { setForm((p) => ({ ...p, [k]: v })); }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setLoading(true);
    try { await upsertTestPrep(isEdit ? id : null, form); router.push("/studio/test-prep"); router.refresh(); }
    catch (err: any) { setError(err.message); } finally { setLoading(false); }
  }
  return (
    <div className="p-6 max-w-3xl bg-slate-50/50 min-h-screen text-slate-850 font-sans">
      <Link href="/studio/test-prep" className="flex items-center gap-1.5 text-xs text-slate-505 hover:text-slate-900 mb-4 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back</Link>
      <h1 className="text-xl font-bold text-slate-900 mb-6">{isEdit ? "Edit" : "New"} Test Prep Program</h1>
      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-755 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <F label="Name *" value={form.name} onChange={(v) => u("name", v)} />
          <F label="Slug *" value={form.slug} onChange={(v) => u("slug", v)} />
          <F label="Duration" value={form.duration} onChange={(v) => u("duration", v)} placeholder="e.g. 6 Weeks" />
          <F label="Pricing" value={form.pricing} onChange={(v) => u("pricing", v)} placeholder="e.g. Rs 15,000" />
        </div>
        <F label="Tagline" value={form.tagline} onChange={(v) => u("tagline", v)} />
        <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Overview</label>
          <textarea value={form.overview} onChange={(e) => u("overview", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-y leading-normal" /></div>
        <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Syllabus Points</label>
          <ArrayInput value={form.syllabusPoints} onChange={(v) => u("syllabusPoints", v)} /></div>
        <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">Class Schedule</label>
          <RepeaterInput value={form.classSchedule} onChange={(v) => u("classSchedule", v)}
            fields={[{ key: "batch", label: "Batch" }, { key: "timing", label: "Timing" }, { key: "instructor", label: "Instructor" }]}
            addLabel="Add schedule" /></div>
        <div><label className="block text-xs font-semibold text-slate-700 mb-1.5">FAQ</label>
          <RepeaterInput value={form.faq} onChange={(v) => u("faq", v)}
            fields={[{ key: "question", label: "Question" }, { key: "answer", label: "Answer", type: "textarea" }]}
            addLabel="Add FAQ" /></div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => u("published", e.target.checked)} className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary" />
          <span className="text-xs text-slate-700 font-semibold">Published</span></label>
        <button type="submit" disabled={loading} className="h-10 px-6 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {isEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
function F({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (<div><label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-405 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors shadow-sm" /></div>);
}
