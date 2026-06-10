"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import ProductFormModal from "@/components/ProductFormModal";
import { products as initialProducts } from "@/lib/page-data";

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tableData = products.map(({ name, category, price, stock, status }) => ({
    name,
    category,
    price,
    stock,
    status,
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
        <DataTable
          title="Products"
          description="All products in your store"
          columns={["Name", "Category", "Price", "Stock", "Status"]}
          data={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
