"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import CustomerViewModal from "@/components/CustomerViewModal";
import { customers as initialCustomers, orders as allOrders } from "@/lib/page-data";

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tableData = customers.map(({ name, email, phone, orders, spent }) => ({
    name,
    email,
    phone,
    orders,
    spent,
  }));

  const selectedCustomer = selectedIndex !== null ? customers[selectedIndex] : null;
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return allOrders.filter((order) => order.customer === selectedCustomer.name);
  }, [selectedCustomer]);

  const handleView = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setCustomers((current) => current.filter((_, idx) => idx !== index));
    if (selectedIndex === index) {
      setModalOpen(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

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
          columns={["Name", "Email", "Phone", "Orders", "Total Spent"]}
          data={tableData}
          onView={handleView}
          onDelete={handleDelete}
        />
        <CustomerViewModal
          open={modalOpen}
          customer={selectedCustomer}
          orders={customerOrders}
          onClose={handleClose}
        />
      </main>
    </div>
  );
}
