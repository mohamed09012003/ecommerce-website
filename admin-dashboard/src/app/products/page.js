"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import ProductFormModal from "@/components/ProductFormModal";
import { getProducts } from "@/lib/page-data";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  const tableData = products.map(({ title, category, price, rating, image }) => ({
    product: (
      <div className="flex items-center gap-3 min-w-0">
        <img src={image} alt={title} className="h-10 w-10 flex-shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">{title}</p>
          <p className="text-xs text-slate-500 truncate">{category}</p>
        </div>
      </div>
    ),
    price: `$${price.toFixed(2)}`,
    stock: rating?.count || 0,
    status: rating?.count < 100 ? "Low Stock" : "Active",
  }));

  const handleOpenNew = () => {
    setSelectedIndex(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = (product) => {
    setProducts((current) => {
      if (selectedIndex === null) {
        const nextId = current.length ? Math.max(...current.map((item) => item.id)) + 1 : 1;
        return [...current, { ...product, id: nextId }];
      }

      return current.map((item, idx) => (idx === selectedIndex ? { ...item, ...product } : item));
    });

    setModalOpen(false);
  };

  const handleEdit = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setProducts((current) => current.filter((_, idx) => idx !== index));
    if (selectedIndex === index) {
      setModalOpen(false);
    }
  };

  const selectedProduct = selectedIndex !== null ? products[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Product Management"
          description="Add, edit, and manage your product catalog. Track inventory and pricing."
          buttonText="+ Add Product"
          buttonOnClick={handleOpenNew}
        />
        {loading ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center text-slate-600 shadow-sm shadow-slate-800/5">Loading products...</div>
        ) : (
          <DataTable
            title="Products"
            description="All products in your store"
            columns={["Product", "Price", "Stock", "Status"]}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        <ProductFormModal
          open={modalOpen}
          product={selectedProduct}
          onClose={handleClose}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}
