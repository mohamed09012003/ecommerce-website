import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { products } from "@/lib/page-data";

export default function ProductsPage() {
  const columns = ["Name", "Category", "Price", "Stock", "Status"];
  const tableData = products.map(({ id, name, category, price, stock, status }) => ({
    name,
    category,
    price,
    stock,
    status,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Product Management"
          description="Add, edit, and manage your product catalog. Track inventory and pricing."
          buttonText="+ Add Product"
        />
        <DataTable
          title="Products"
          description="All products in your store"
          columns={columns}
          data={tableData}
          actions={true}
        />
      </main>
    </div>
  );
}
