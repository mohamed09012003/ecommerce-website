"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import CategoryFormModal from "@/components/CategoryFormModal";
import { categories as initialCategories } from "@/lib/page-data";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tableData = categories.map(({ name, products, createdAt }) => ({
    name,
    products,
    createdAt,
  }));

  const handleOpenNew = () => {
    setSelectedIndex(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = (category) => {
    setCategories((current) => {
      if (selectedIndex === null) {
        const nextId = current.length ? Math.max(...current.map((item) => item.id)) + 1 : 1;
        return [...current, { ...category, id: nextId }];
      }
      return current.map((item, index) => (index === selectedIndex ? { ...item, ...category } : item));
    });

    setModalOpen(false);
  };

  const handleEdit = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setCategories((current) => current.filter((_, idx) => idx !== index));
    if (selectedIndex === index) {
      setModalOpen(false);
    }
  };

  const selectedCategory = selectedIndex !== null ? categories[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Category Management"
          description="Organize products by categories. Create and manage product categories."
          buttonText="+ Add Category"
          buttonOnClick={handleOpenNew}
        />
        <DataTable
          title="Categories"
          description="All product categories"
          columns={["Name", "Products", "Created At"]}
          data={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CategoryFormModal
          open={modalOpen}
          category={selectedCategory}
          onClose={handleClose}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}
