"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { upsertUniversity } from "@/lib/supabase/admin-actions";
import { MediaUploader, MultiMediaUploader } from "@/components/studio/media-uploader";
import { ArrayInput } from "@/components/studio/form-controls";

interface Props { initialData: any | null; id: string | null; }

export function UniversityForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: initialData?.slug || "",
    name: initialData?.name || "",
    country: initialData?.country || "",
    city: initialData?.city || "",
    logo: initialData?.logo || "",
    aboutText: initialData?.about_text || "",
    coursesOffered: initialData?.courses_offered || [],
    admissionRequirements: initialData?.admission_requirements || [],
    galleryImages: initialData?.gallery_images || [],
    isFeatured: initialData?.is_featured ?? false,
    published: initialData?.published ?? true,
    logoAlt: initialData?.logo_alt || "University Logo",
    galleryImagesAlts: initialData?.gallery_images_alts || [],
  });

  function update(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Align gallery image alts array length to match gallery images
    const alignedAlts = form.galleryImages.map((_: any, idx: number) => {
      return form.galleryImagesAlts[idx] || "University Campus Gallery Image";
    });
    try {
      await upsertUniversity(isEdit ? id : null, {
        ...form,
        galleryImagesAlts: alignedAlts
      });
      router.push("/studio/universities");
      router.refresh();
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  }

  return (
    <div className="p-6 max-w-3xl bg-slate-50/50 min-h-screen text-slate-850 font-sans">
      <Link href="/studio/universities" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to universities
      </Link>
      <h1 className="text-xl font-bold text-slate-900 mb-6">{isEdit ? "Edit University" : "New University"}</h1>
      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-750 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name *" value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Slug *" value={form.slug} onChange={(v) => update("slug", v)} placeholder="e.g. anu-australia" />
          <Field label="Country *" value={form.country} onChange={(v) => update("country", v)} />
          <Field label="City *" value={form.city} onChange={(v) => update("city", v)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Logo</label>
            <MediaUploader value={form.logo} onChange={(v) => update("logo", v)} folder="universities" label="Upload university logo" />
          </div>
          <div>
            <Field 
              label="Logo Alt Text *" 
              value={form.logoAlt} 
              onChange={(v) => update("logoAlt", v)} 
              placeholder="e.g. University Crest Logo" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">About</label>
          <textarea value={form.aboutText} onChange={(e) => update("aboutText", e.target.value)} rows={4}
            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-y leading-normal" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Courses Offered</label>
          <ArrayInput value={form.coursesOffered} onChange={(v) => update("coursesOffered", v)} placeholder="Add course" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admission Requirements</label>
          <ArrayInput value={form.admissionRequirements} onChange={(v) => update("admissionRequirements", v)} placeholder="Add requirement" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gallery Images</label>
          <MultiMediaUploader value={form.galleryImages} onChange={(v) => update("galleryImages", v)} folder="universities/gallery" />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)}
              className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary" />
            <span className="text-xs text-slate-700 font-semibold">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)}
              className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary" />
            <span className="text-xs text-slate-700 font-semibold">Published</span>
          </label>
        </div>

        <button type="submit" disabled={loading}
          className="h-10 px-6 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Update" : "Create"} University
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors shadow-sm" />
    </div>
  );
}
