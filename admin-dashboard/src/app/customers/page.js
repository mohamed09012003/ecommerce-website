"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import CustomerViewModal from "@/components/CustomerViewModal";
import { getCustomers, getOrders } from "@/lib/page-data";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      const [customerData, orderData] = await Promise.all([getCustomers(), getOrders()]);
      setCustomers(customerData);
      setOrders(orderData);
      setLoading(false);
    }

    loadCustomers();
  }, []);

  const tableData = customers.map((customer) => ({
    name: `${customer.name.firstname} ${customer.name.lastname}`,
    email: customer.email,
    phone: customer.phone || "N/A",
    orders: orders.filter((order) => order.user?.id === customer.id).length,
    spent: customer.spent ? `$${customer.spent.toFixed(2)}` : "$0.00",
  }));

  const selectedCustomer = selectedIndex !== null ? {
    ...customers[selectedIndex],
    name: `${customers[selectedIndex].name.firstname} ${customers[selectedIndex].name.lastname}`,
    orders: orders.filter((order) => order.user?.id === customers[selectedIndex].id).length,
    spent: customers[selectedIndex].spent ? `$${customers[selectedIndex].spent.toFixed(2)}` : "$0.00",
  } : null;

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter((order) => order.user?.id === selectedCustomer.id);
  }, [selectedCustomer, orders]);

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
        {loading ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center text-slate-600 shadow-sm shadow-slate-800/5">Loading customers...</div>
        ) : (
          <DataTable
            title="Customers"
            description="All customers in your store"
            columns={["Name", "Email", "Phone", "Orders", "Total Spent"]}
            data={tableData}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}
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
