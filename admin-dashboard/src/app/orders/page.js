import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { orders } from "@/lib/page-data";

export default function OrdersPage() {
  const columns = ["Order ID", "Customer", "Date", "Status", "Items", "Total"];
  const tableData = orders.map(({ id, customer, date, status, items, total }) => ({
    id,
    customer,
    date,
    status,
    items,
    total,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Order Management"
          description="View and manage customer orders. Track order status and fulfillment."
          buttonText="+ New Order"
        />
        <DataTable
          title="Orders"
          description="All orders from your store"
          columns={columns}
          data={tableData}
          actions={true}
        />
      </main>
    </div>
  );
}
