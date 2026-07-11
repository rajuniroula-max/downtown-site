"use client";

import React, { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
}

export function MediaUploader({
  value,
  onChange,
  folder = "uploads",
  accept = "image/*",
  label = "Upload image",
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);

      try {
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("media")
          .getPublicUrl(fileName);

        onChange(urlData.publicUrl);
      } catch (err: any) {
        setError(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange]
  );

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className="space-y-2 text-slate-800">
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg border border-slate-200"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
            dragOver
              ? "border-brand-primary bg-indigo-50/50"
              : "border-slate-300 hover:border-slate-450 bg-slate-50/50"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-5 h-5 text-slate-450 mb-1.5" />
              <span className="text-xs font-semibold text-slate-600">{label}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                Drag & drop or click to browse
              </span>
            </>
          )}
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      )}

      {/* URL input fallback */}
      <div className="flex items-center gap-2">
        <ImageIcon className="w-3.5 h-3.5 text-slate-450 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL..."
          className="w-full h-8 px-2.5 rounded-md bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
        />
      </div>

      {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
    </div>
  );
}

/* Multi-image variant for gallery fields */
interface MultiMediaUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
}

export function MultiMediaUploader({
  value,
  onChange,
  folder = "gallery",
  label = "Add images",
}: MultiMediaUploaderProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {value.map((url, i) => (
          <div key={i} className="relative group">
            <img
              src={url}
              alt={`Gallery ${i + 1}`}
              className="w-full h-20 object-cover rounded-md border border-slate-200"
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>
      <MediaUploader
        value=""
        onChange={(url) => {
          if (url) onChange([...value, url]);
        }}
        folder={folder}
        label={label}
      />
    </div>
  );
}
