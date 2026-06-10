"use client";

import { useEffect, useState } from "react";

const statusOptions = ["Active", "Low Stock", "Out of Stock"];

export default function ProductFormModal({ open, product, onClose, onSave }) {
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    description: "",
    images: [],
  });

  useEffect(() => {
    if (!open) return;

    if (product) {
      const imagesFromProduct = Array.isArray(product.images)
        ? product.images.map((image) => ({ name: image.name || image, url: image.url || "" }))
        : product.image
        ? [{ name: "Main image", url: product.image }]
        : [];

      setFormState({
        name: product.title || product.name || "",
        category: product.category || "",
        price: product.price ?? "",
        stock: (product.stock ?? product.rating?.count ?? "").toString(),
        status: product.status || "Active",
        description: product.description || "",
        images: imagesFromProduct,
      });
    } else {
      setFormState({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "Active",
        description: "",
        images: [],
      });
    }
  }, [open, product]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    const uploaded = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setFormState((prev) => ({
      ...prev,
      images: [...prev.images, ...uploaded],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormState((prev) => {
      const images = [...prev.images];
      const removed = images.splice(index, 1)[0];
      if (removed?.url) {
        URL.revokeObjectURL(removed.url);
      }
      return { ...prev, images };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...product,
      title: formState.name,
      name: formState.name,
      category: formState.category,
      price: Number(formState.price),
      stock: Number(formState.stock),
      status: formState.status,
      description: formState.description,
      image: formState.images[0]?.url || product?.image,
      images: formState.images.map((item) => ({ name: item.name, url: item.url })),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-950">
                {product ? "Edit product" : "Add new product"}
              </p>
              <p className="text-sm text-slate-500">
                Fill in product details and upload images before saving.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-20rem)] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-600">Product name</label>
              <input
                type="text"
                value={formState.name}
                onChange={handleChange("name")}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-600">Category</label>
              <input
                type="text"
                value={formState.category}
                onChange={handleChange("category")}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-600">Price</label>
              <input
                type="text"
                value={formState.price}
                onChange={handleChange("price")}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-600">Stock</label>
              <input
                type="number"
                min="0"
                value={formState.stock}
                onChange={handleChange("stock")}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-4 sm:col-span-2">
              <label className="block text-sm font-medium text-slate-600">Status</label>
              <select
                value={formState.status}
                onChange={handleChange("status")}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 sm:col-span-2">
              <label className="block text-sm font-medium text-slate-600">Description</label>
              <textarea
                value={formState.description}
                onChange={handleChange("description")}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div className="space-y-4 sm:col-span-2">
              <label className="block text-sm font-medium text-slate-600">Product images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {formState.images.map((image, index) => (
                  <div key={`${image.name}-${index}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                    {image.url ? (
                      <img src={image.url} alt={image.name} className="h-32 w-full object-cover" />
                    ) : (
                      <div className="flex h-32 items-center justify-center text-sm text-slate-500">{image.name}</div>
                    )}
                    <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-slate-600">
                      <span className="truncate">{image.name}</span>
                      <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
