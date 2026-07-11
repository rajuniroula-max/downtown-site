"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Info } from "lucide-react";
import { updateSiteSetting } from "@/lib/supabase/admin-actions";

interface AnnouncementBarValue {
  text: string;
  link_text: string;
  link_url: string;
  enabled: boolean;
}

interface ContactNumbersValue {
  kathmandu: string;
  pokhara: string;
  hotline: string;
}

interface SettingsFormProps {
  initialAnnouncement: AnnouncementBarValue | null;
  initialContacts: ContactNumbersValue | null;
}

export function SettingsForm({ initialAnnouncement, initialContacts }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Announcement Bar state
  const [announcement, setAnnouncement] = useState<AnnouncementBarValue>({
    text: initialAnnouncement?.text || "",
    link_text: initialAnnouncement?.link_text || "",
    link_url: initialAnnouncement?.link_url || "",
    enabled: initialAnnouncement?.enabled ?? true,
  });

  // Contact Numbers state
  const [contacts, setContacts] = useState<ContactNumbersValue>({
    kathmandu: initialContacts?.kathmandu || "",
    pokhara: initialContacts?.pokhara || "",
    hotline: initialContacts?.hotline || "",
  });

  async function handleSaveAnnouncement(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      await updateSiteSetting("announcement_bar", announcement);
      setMessage({ type: "success", text: "Announcement bar settings updated successfully!" });
      router.refresh();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update settings" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveContacts(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      await updateSiteSetting("contact_numbers", contacts);
      setMessage({ type: "success", text: "Contact information settings updated successfully!" });
      router.refresh();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update settings" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 text-slate-800">
      {message && (
        <div
          className={`px-4 py-3 rounded-lg border text-sm flex items-start gap-2.5 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Announcement Bar Settings Section */}
      <form
        onSubmit={handleSaveAnnouncement}
        className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Announcement Bar</h2>
            <p className="text-[11px] text-slate-550">
              The promotional ribbon displayed at the top of all public pages.
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={announcement.enabled}
              onChange={(e) =>
                setAnnouncement((prev) => ({ ...prev, enabled: e.target.checked }))
              }
              className="w-4 h-4 rounded border-slate-200 bg-white text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-xs text-slate-700 font-semibold">Enabled</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Announcement Text
            </label>
            <textarea
              value={announcement.text}
              onChange={(e) =>
                setAnnouncement((prev) => ({ ...prev, text: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Bookings open for Fall 2026 Admissions..."
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-y leading-normal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Link Button Text
              </label>
              <input
                type="text"
                value={announcement.link_text}
                onChange={(e) =>
                  setAnnouncement((prev) => ({ ...prev, link_text: e.target.value }))
                }
                placeholder="e.g. Register Now"
                className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Link Destination URL
              </label>
              <input
                type="text"
                value={announcement.link_url}
                onChange={(e) =>
                  setAnnouncement((prev) => ({ ...prev, link_url: e.target.value }))
                }
                placeholder="e.g. /fair or /contact-us"
                className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="h-8 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Announcement
          </button>
        </div>
      </form>

      {/* Global Contact Numbers Section */}
      <form
        onSubmit={handleSaveContacts}
        className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Contact Information</h2>
          <p className="text-[11px] text-slate-550">
            Global office contact details and hotlines displayed across site banners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kathmandu Office Phone
            </label>
            <input
              type="text"
              value={contacts.kathmandu}
              onChange={(e) =>
                setContacts((prev) => ({ ...prev, kathmandu: e.target.value }))
              }
              placeholder="+977-1-4412345"
              className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pokhara Office Phone
            </label>
            <input
              type="text"
              value={contacts.pokhara}
              onChange={(e) =>
                setContacts((prev) => ({ ...prev, pokhara: e.target.value }))
              }
              placeholder="+977-61-532145"
              className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hotline Mobile Number
            </label>
            <input
              type="text"
              value={contacts.hotline}
              onChange={(e) =>
                setContacts((prev) => ({ ...prev, hotline: e.target.value }))
              }
              placeholder="+977-98XXXXXXXX"
              className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="h-8 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Contact Details
          </button>
        </div>
      </form>
    </div>
  );
}
