"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import OrderFormModal from "@/components/OrderFormModal";
import { orders as initialOrders } from "@/lib/page-data";

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tableData = orders.map(({ id, customer, date, status, items, total }) => ({
    id,
    customer,
    date,
    status,
    items,
    total,
  }));

  const handleOpenNew = () => {
    setSelectedIndex(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = (order) => {
    setOrders((current) => {
      if (selectedIndex === null) {
        const nextNumber = current.length ? Math.max(...current.map((item) => Number(item.id.replace(/[^0-9]/g, "")))) + 1 : 1;
        const nextId = `#A${nextNumber.toString().padStart(4, "0")}`;
        return [...current, { ...order, id: nextId }];
      }
      return current.map((item, index) => (index === selectedIndex ? { ...item, ...order } : item));
    });

    setModalOpen(false);
  };

  const handleView = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setOrders((current) => current.filter((_, idx) => idx !== index));
    if (selectedIndex === index) {
      setModalOpen(false);
    }
  };

  const selectedOrder = selectedIndex !== null ? orders[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Order Management"
          description="View and manage customer orders. Track order status and fulfillment."
          buttonText="+ New Order"
          buttonOnClick={handleOpenNew}
        />
        <DataTable
          title="Orders"
          description="All orders from your store"
          columns={["Order ID", "Customer", "Date", "Status", "Items", "Total"]}
          data={tableData}
          onView={handleView}
          onDelete={handleDelete}
        />
        <OrderFormModal open={modalOpen} order={selectedOrder} onClose={handleClose} onSave={handleSave} />
      </main>
    </div>
  );
}
