"use client";

import { useEffect, useMemo, useState } from "react";

const statusOptions = ["Processing", "Pending", "Shipped", "Delivered", "Cancelled"];

const formatCurrency = (value) => {
  const number = Number(value.toString().replace(/[^0-9.]/g, ""));
  return isNaN(number) ? "$0.00" : `$${number.toFixed(2)}`;
};

export default function OrderFormModal({ open, order, onClose, onSave }) {
  const [formState, setFormState] = useState({
    customer: "",
    date: "",
    status: "Processing",
    products: [],
  });

  useEffect(() => {
    if (!open) return;

    if (order) {
      setFormState({
        customer: order.customer || "",
        date: order.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: order.status || "Processing",
        products: order.products?.map((product) => ({
          name: product.name || "",
          quantity: product.quantity?.toString() || "1",
          price: product.price || "$0.00",
        })) || [],
      });
    } else {
      setFormState({
        customer: "",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Processing",
        products: [{ name: "", quantity: "1", price: "$0.00" }],
      });
    }
  }, [open, order]);

  const total = useMemo(() => {
    return formState.products.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price.replace(/[^0-9.]/g, "")) || 0;
      return sum + qty * price;
    }, 0);
  }, [formState.products]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const updateProduct = (index, field) => (event) => {
    setFormState((prev) => {
      const products = [...prev.products];
      products[index] = { ...products[index], [field]: event.target.value };
      return { ...prev, products };
    });
  };

  const addProductLine = () => {
    setFormState((prev) => ({
      ...prev,
      products: [...prev.products, { name: "", quantity: "1", price: "$0.00" }],
    }));
  };

  const removeProductLine = (index) => {
    setFormState((prev) => ({
      ...prev,
      products: prev.products.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...order,
      customer: formState.customer,
      date: formState.date,
      status: formState.status,
      items: formState.products.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
      total: formatCurrency(total),
      products: formState.products.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity) || 0,
        price: formatCurrency(item.price),
      })),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-950">{order ? "View order" : "Create new order"}</p>
              <p className="text-sm text-slate-500">Review order details and update the product list before saving.</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
              Close
            </button>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Customer</label>
            <input
              type="text"
              value={formState.customer}
              onChange={handleChange("customer")}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Date</label>
            <input
              type="text"
              value={formState.date}
              onChange={handleChange("date")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-sm font-medium text-slate-600">Order status</label>
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
        </div>

        <div className="px-6 pb-6 sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Order products</h2>
              <p className="mt-1 text-sm text-slate-500">Edit quantity and price for each product in the order.</p>
            </div>
            <button type="button" onClick={addProductLine} className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800">
              + Add line
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {formState.products.map((item, index) => (
              <div key={index} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
                <div>
                  <label className="block text-sm font-medium text-slate-600">Product</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={updateProduct(index, "name")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={updateProduct(index, "quantity")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Price</label>
                  <input
                    type="text"
                    value={item.price}
                    onChange={updateProduct(index, "price")}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex items-end justify-end">
                  <button type="button" onClick={() => removeProductLine(index)} className="text-sm font-semibold text-red-600 transition hover:text-red-800">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-100 px-5 py-4">
            <p className="text-sm font-medium text-slate-700">Estimated order total</p>
            <p className="text-lg font-semibold text-slate-950">{formatCurrency(total)}</p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button type="button" onClick={onClose} className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50">
            Close
          </button>
          <button type="submit" className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800">
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
}
