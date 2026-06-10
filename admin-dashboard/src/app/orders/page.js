"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import OrderFormModal from "@/components/OrderFormModal";
import { getOrders } from "@/lib/page-data";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    }

    loadOrders();
  }, []);

  const tableData = orders.map(({ id, user, date, status, products, total }) => {
    const parsedTotal = typeof total === "number" ? total : Number(total?.toString().replace(/[^0-9.]/g, "")) || 0;
    return {
      id,
      customer: user?.name || "Unknown",
      date: new Date(date).toLocaleDateString(),
      status,
      items: products?.length || 0,
      total: `$${parsedTotal.toFixed(2)}`,
    };
  });

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
        {loading ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center text-slate-600 shadow-sm shadow-slate-800/5">Loading orders...</div>
        ) : (
          <DataTable
            title="Orders"
            description="All orders from your store"
            columns={["Order ID", "Customer", "Date", "Status", "Items", "Total"]}
            data={tableData}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}
        <OrderFormModal open={modalOpen} order={selectedOrder} onClose={handleClose} onSave={handleSave} />
      </main>
    </div>
  );
}
