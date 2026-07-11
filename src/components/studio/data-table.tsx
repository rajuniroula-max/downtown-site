"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, Trash2, Eye, EyeOff, Pencil } from "lucide-react";
import { togglePublished, deleteRow } from "@/lib/supabase/admin-actions";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

const RESOURCE_COLUMNS: Record<string, Column[]> = {
  destinations: [
    {
      key: "country",
      label: "Country",
      render: (val: string, row: any) => (
        <span className="font-semibold text-slate-900">{row.flag_icon} {val}</span>
      ),
    },
    { key: "slug", label: "Slug" },
    { key: "universities_count", label: "Universities" },
    { key: "order_index", label: "Order" },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
  universities: [
    {
      key: "name",
      label: "Name",
      render: (val: string) => <span className="font-semibold text-slate-900">{val}</span>,
    },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    {
      key: "is_featured",
      label: "Featured",
      render: (val: boolean) => (val ? "⭐" : "—"),
    },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
  services: [
    {
      key: "title",
      label: "Title",
      render: (v: string) => <span className="font-semibold text-slate-900">{v}</span>,
    },
    { key: "slug", label: "Slug" },
    { key: "order_index", label: "Order" },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
  "test-prep": [
    {
      key: "name",
      label: "Program",
      render: (v: string) => <span className="font-semibold text-slate-900">{v}</span>,
    },
    { key: "slug", label: "Slug" },
    { key: "duration", label: "Duration" },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
  team: [
    {
      key: "name",
      label: "Name",
      render: (v: string) => <span className="font-semibold text-slate-900">{v}</span>,
    },
    { key: "role", label: "Role" },
    { key: "order_index", label: "Order" },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
  branches: [
    {
      key: "name",
      label: "Name",
      render: (v: string) => <span className="font-semibold text-slate-900">{v}</span>,
    },
    { key: "address", label: "Address" },
    { key: "phone", label: "Phone" },
    { key: "order_index", label: "Order" },
  ],
  testimonials: [
    {
      key: "name",
      label: "Name",
      render: (v: string) => <span className="font-semibold text-slate-900">{v}</span>,
    },
    { key: "destination", label: "Destination" },
    {
      key: "rating",
      label: "Rating",
      render: (v: number) => "⭐".repeat(v),
    },
    {
      key: "featured",
      label: "Featured",
      render: (v: boolean) => (v ? "Yes" : "—"),
    },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
  blog: [
    {
      key: "title",
      label: "Title",
      render: (v: string) => (
        <span className="font-semibold text-slate-900 truncate max-w-[200px] block" title={v}>
          {v}
        </span>
      ),
    },
    { key: "category", label: "Category" },
    { key: "author", label: "Author" },
    { key: "date", label: "Date" },
    {
      key: "published",
      label: "Status",
      render: (val: boolean) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${val ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-slate-100 text-slate-600 border border-slate-200/50"}`}>
          {val ? "Published" : "Draft"}
        </span>
      ),
    },
  ],
};

interface DataTableProps {
  title: string;
  data: any[];
  resourceType: keyof typeof RESOURCE_COLUMNS;
  tableName: string;
  basePath: string;
  searchKey?: string;
  hasPublish?: boolean;
}

export function AdminDataTable({
  title,
  data,
  resourceType,
  tableName,
  basePath,
  searchKey = "name",
  hasPublish = true,
}: DataTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const columns = RESOURCE_COLUMNS[resourceType] || [];

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) => {
      const val = row[searchKey];
      return val && String(val).toLowerCase().includes(q);
    });
  }, [data, search, searchKey]);

  async function handleToggle(id: string, current: boolean) {
    setLoading(id);
    await togglePublished(tableName, id, !current);
    router.refresh();
    setLoading(null);
  }

  async function handleDelete(id: string) {
    setLoading(id);
    await deleteRow(tableName, id);
    setDeleteId(null);
    router.refresh();
    setLoading(null);
  }

  return (
    <div className="p-6 space-y-4 bg-slate-50/50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <Link
          href={`${basePath}/new`}
          className="h-9 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create New
        </Link>
      </div>

      {/* Search */}
      <div className="relative w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm text-slate-400">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-xs text-slate-600">
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {hasPublish && (
                        <button
                          onClick={() => handleToggle(row.id, row.published)}
                          disabled={loading === row.id}
                          title={row.published ? "Unpublish" : "Publish"}
                          className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                            row.published
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {row.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      <Link
                        href={`${basePath}/${row.id}`}
                        className="w-7 h-7 rounded flex items-center justify-center text-slate-500 hover:text-brand-primary hover:bg-slate-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(row.id)}
                        className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-600 mb-5">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={loading === deleteId}
                className="h-8 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
