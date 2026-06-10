"use client";

import { useEffect, useState } from "react";

export default function CategoryFormModal({ open, category, onClose, onSave }) {
  const [formState, setFormState] = useState({
    name: "",
    products: "0",
    createdAt: "",
  });

  useEffect(() => {
    if (!open) return;

    if (category) {
      setFormState({
        name: category.name || "",
        products: category.products?.toString() || "0",
        createdAt: category.createdAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
    } else {
      setFormState({
        name: "",
        products: "0",
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
    }
  }, [open, category]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...category,
      name: formState.name,
      products: Number(formState.products),
      createdAt: formState.createdAt,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-950">{category ? "Edit category" : "Add category"}</p>
              <p className="text-sm text-slate-500">Manage category details before saving.</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
              Cancel
            </button>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:px-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Category name</label>
            <input
              type="text"
              value={formState.name}
              onChange={handleChange("name")}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Product count</label>
            <input
              type="number"
              min="0"
              value={formState.products}
              onChange={handleChange("products")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Created at</label>
            <input
              type="text"
              value={formState.createdAt}
              onChange={handleChange("createdAt")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button type="button" onClick={onClose} className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800">
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}
