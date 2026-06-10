import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { categories } from "@/lib/page-data";

export default function CategoriesPage() {
  const columns = ["Name", "Products", "Created At"];
  const tableData = categories.map(({ id, name, products, createdAt }) => ({
    name,
    products,
    createdAt,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Category Management"
          description="Organize products by categories. Create and manage product categories."
          buttonText="+ Add Category"
        />
        <DataTable
          title="Categories"
          description="All product categories"
          columns={columns}
          data={tableData}
          actions={true}
        />
      </main>
    </div>
  );
}
