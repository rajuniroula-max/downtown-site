"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { upsertDestination } from "@/lib/supabase/admin-actions";
import { MediaUploader } from "@/components/studio/media-uploader";
import { ArrayInput, KeyValueInput, RepeaterInput } from "@/components/studio/form-controls";

interface DestinationFormProps {
  initialData: any | null;
  id: string | null;
}

export function DestinationForm({ initialData, id }: DestinationFormProps) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: initialData?.slug || "",
    country: initialData?.country || "",
    flagIcon: initialData?.flag_icon || "",
    universitiesCount: initialData?.universities_count || "",
    badge: initialData?.badge || "",
    tagline: initialData?.tagline || "",
    heroImage: initialData?.hero_image || "",
    whyStudyText: initialData?.why_study_text || "",
    whyStudyPoints: initialData?.why_study_points || [],
    costOfLiving: initialData?.cost_of_living || { rent: "", food: "", transport: "", overallEstimate: "" },
    visaRequirements: initialData?.visa_requirements || [],
    popularCourses: initialData?.popular_courses || [],
    published: initialData?.published ?? true,
    orderIndex: initialData?.order_index ?? 0,
  });

  function update(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await upsertDestination(isEdit ? id : null, form);
      router.push("/studio/destinations");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl bg-slate-50/50 min-h-screen text-slate-850 font-sans">
      <Link href="/studio/destinations" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to destinations
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-6">
        {isEdit ? "Edit Destination" : "New Destination"}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        {/* Basic fields */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Country *" value={form.country} onChange={(v) => update("country", v)} />
          <Field label="Slug *" value={form.slug} onChange={(v) => update("slug", v)} placeholder="e.g. australia" />
          <Field label="Flag emoji" value={form.flagIcon} onChange={(v) => update("flagIcon", v)} placeholder="🇦🇺" />
          <Field label="Universities count" value={form.universitiesCount} onChange={(v) => update("universitiesCount", v)} />
          <Field label="Badge" value={form.badge} onChange={(v) => update("badge", v)} placeholder="e.g. Most Popular" />
          <Field label="Tagline" value={form.tagline} onChange={(v) => update("tagline", v)} />
          <Field label="Order index" value={String(form.orderIndex)} onChange={(v) => update("orderIndex", parseInt(v) || 0)} type="number" />
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hero Image</label>
          <MediaUploader value={form.heroImage} onChange={(v) => update("heroImage", v)} folder="destinations" />
        </div>

        {/* Why Study Text */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Why Study Here</label>
          <textarea
            value={form.whyStudyText}
            onChange={(e) => update("whyStudyText", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-y leading-normal"
          />
        </div>

        {/* Why Study Points */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Key Points</label>
          <ArrayInput value={form.whyStudyPoints} onChange={(v) => update("whyStudyPoints", v)} placeholder="Add a key point" />
        </div>

        {/* Cost of Living */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cost of Living</label>
          <KeyValueInput
            value={form.costOfLiving}
            onChange={(v) => update("costOfLiving", v)}
            keys={[
              { key: "rent", label: "Rent" },
              { key: "food", label: "Food" },
              { key: "transport", label: "Transport" },
              { key: "overallEstimate", label: "Overall Estimate" },
            ]}
          />
        </div>

        {/* Visa Requirements */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Visa Requirements</label>
          <RepeaterInput
            value={form.visaRequirements}
            onChange={(v) => update("visaRequirements", v)}
            fields={[
              { key: "title", label: "Title" },
              { key: "details", label: "Details", type: "textarea" },
            ]}
            addLabel="Add requirement"
          />
        </div>

        {/* Popular Courses */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Popular Courses</label>
          <ArrayInput value={form.popularCourses} onChange={(v) => update("popularCourses", v)} placeholder="Add a course" />
        </div>

        {/* Published toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
            className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-xs text-slate-700 font-semibold">Published</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-10 px-6 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Update" : "Create"} Destination
        </button>
      </form>
    </div>
  );
}

/* Simple text field helper */
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors shadow-sm"
      />
    </div>
  );
}
