"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { upsertTestimonial } from "@/lib/supabase/admin-actions";
interface Props { initialData: any | null; id: string | null; }
export function TestimonialForm({ initialData, id }: Props) {
  const router = useRouter(); const isEdit = !!id && id !== "new";
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: initialData?.name || "", destination: initialData?.destination || "",
    initials: initialData?.initials || "", quote: initialData?.quote || "",
    rating: initialData?.rating ?? 5, published: initialData?.published ?? true,
    featured: initialData?.featured ?? false,
  });
  function u(k: string, v: any) { setForm((p) => ({ ...p, [k]: v })); }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setLoading(true);
    try { await upsertTestimonial(isEdit ? id : null, form); router.push("/studio/testimonials"); router.refresh(); }
    catch (err: any) { setError(err.message); } finally { setLoading(false); }
  }
  return (
    <div className="p-6 max-w-3xl bg-slate-50/50 min-h-screen text-slate-850 font-sans">
      <Link href="/studio/testimonials" className="flex items-center gap-1.5 text-xs text-slate-550 hover:text-slate-900 mb-4 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back</Link>
      <h1 className="text-xl font-bold text-slate-900 mb-6">{isEdit ? "Edit" : "New"} Testimonial</h1>
      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-755 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <F label="Name *" value={form.name} onChange={(v) => u("name", v)} />
          <F label="Destination *" value={form.destination} onChange={(v) => u("destination", v)} placeholder="e.g. Australia" />
          <F label="Initials" value={form.initials} onChange={(v) => u("initials", v)} placeholder="e.g. RS" />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rating (1-5)</label>
            <select value={form.rating} onChange={(e) => u("rating", parseInt(e.target.value))}
              className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
            </select>
          </div>
        </div>
        <div><label className="block text-xs font-semibold text-slate-700 mb-1">Quote</label>
          <textarea value={form.quote} onChange={(e) => u("quote", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-y leading-normal" /></div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => u("published", e.target.checked)} className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary" />
            <span className="text-xs text-slate-700 font-semibold">Published</span></label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => u("featured", e.target.checked)} className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary" />
            <span className="text-xs text-slate-700 font-semibold">Featured</span></label>
        </div>
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
