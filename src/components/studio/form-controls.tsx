"use client";

import React from "react";
import { Plus, X, GripVertical } from "lucide-react";

/* ── String Array Input ── */
interface ArrayInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function ArrayInput({ value, onChange, placeholder = "Add item…", label }: ArrayInputProps) {
  function addItem() {
    onChange([...value, ""]);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function updateItem(index: number, newValue: string) {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  }

  return (
    <div className="space-y-1.5 text-slate-800">
      {label && <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>}
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <GripVertical className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 h-8 px-2.5 rounded-md bg-white border border-slate-250 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
          />
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-xs text-brand-primary hover:text-brand-primary/85 font-semibold transition-colors mt-1"
      >
        <Plus className="w-3.5 h-3.5" />
        Add item
      </button>
    </div>
  );
}

/* ── Key-Value Pair Input (for cost_of_living) ── */
interface KeyValueInputProps {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  keys: { key: string; label: string }[];
}

export function KeyValueInput({ value, onChange, keys }: KeyValueInputProps) {
  return (
    <div className="space-y-2">
      {keys.map(({ key, label }) => (
        <div key={key}>
          <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">{label}</label>
          <input
            type="text"
            value={value[key] || ""}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            className="w-full h-8 px-2.5 rounded-md bg-white border border-slate-250 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
          />
        </div>
      ))}
    </div>
  );
}

/* ── Repeating Object Array (for visa_requirements, class_schedule, faq) ── */
interface RepeaterField {
  key: string;
  label: string;
  type?: "text" | "textarea";
}

interface RepeaterInputProps {
  value: Record<string, string>[];
  onChange: (value: Record<string, string>[]) => void;
  fields: RepeaterField[];
  addLabel?: string;
}

export function RepeaterInput({
  value,
  onChange,
  fields,
  addLabel = "Add entry",
}: RepeaterInputProps) {
  function addEntry() {
    const empty: Record<string, string> = {};
    fields.forEach((f) => (empty[f.key] = ""));
    onChange([...value, empty]);
  }

  function removeEntry(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function updateEntry(index: number, key: string, newValue: string) {
    const updated = [...value];
    updated[index] = { ...updated[index], [key]: newValue };
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {value.map((entry, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 space-y-2 relative shadow-sm"
        >
          <button
            type="button"
            onClick={() => removeEntry(i)}
            className="absolute top-2 right-2 w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-red-650 hover:bg-red-50 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-[10px] text-slate-400 font-bold">#{i + 1}</p>
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={entry[field.key] || ""}
                  onChange={(e) => updateEntry(i, field.key, e.target.value)}
                  rows={3}
                  className="w-full px-2.5 py-1.5 rounded-md bg-white border border-slate-250 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-y leading-normal"
                />
              ) : (
                <input
                  type="text"
                  value={entry[field.key] || ""}
                  onChange={(e) => updateEntry(i, field.key, e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-white border border-slate-250 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-1.5 text-xs text-brand-primary hover:text-brand-primary/85 font-semibold transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        {addLabel}
      </button>
    </div>
  );
}
