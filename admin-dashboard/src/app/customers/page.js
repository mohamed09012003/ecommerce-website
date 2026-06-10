import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { customers } from "@/lib/page-data";

export default function CustomersPage() {
  const columns = ["Name", "Email", "Phone", "Orders", "Total Spent"];
  const tableData = customers.map(({ id, name, email, phone, orders, spent }) => ({
    name,
    email,
    phone,
    orders,
    spent,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Customer Management"
          description="View and manage customer profiles. Track purchase history and contact information."
          buttonText="+ Add Customer"
        />
        <DataTable
          title="Customers"
          description="All customers in your store"
          columns={columns}
          data={tableData}
          actions={true}
        />
      </main>
    </div>
  );
}
