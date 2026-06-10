"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import CategoryFormModal from "@/components/CategoryFormModal";
import { getCategories, getProducts } from "@/lib/page-data";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [categoryData, productData] = await Promise.all([getCategories(), getProducts()]);
      setCategories(categoryData);
      setProducts(productData);
      setLoading(false);
    }

    loadData();
  }, []);

  const tableData = categories.map((category) => ({
    name: category,
    products: products.filter((product) => product.category === category).length,
    createdAt: "N/A",
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
        return [...current, category.name];
      }
      return current.map((item, index) => (index === selectedIndex ? category.name : item));
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

  const selectedCategory = selectedIndex !== null ? { name: categories[selectedIndex], products: products.filter((product) => product.category === categories[selectedIndex]).length, createdAt: "N/A" } : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Category Management"
          description="Organize products by categories. Create and manage product categories."
          buttonText="+ Add Category"
          buttonOnClick={handleOpenNew}
        />
        {loading ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center text-slate-600 shadow-sm shadow-slate-800/5">Loading categories...</div>
        ) : (
          <DataTable
            title="Categories"
            description="All product categories"
            columns={["Name", "Products", "Created At"]}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
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
