"use client";

export default function CustomerViewModal({ open, customer, orders, onClose }) {
  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-950">Customer details</p>
              <p className="text-sm text-slate-500">Review the customer profile and recent orders.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:grid-cols-[1fr_1fr] sm:px-8">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Profile</h2>
              <p className="mt-2 text-2xl font-semibold text-slate-950">{customer.name}</p>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="font-medium text-slate-900">Email</p>
                <p>{customer.email}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Phone</p>
                <p>{customer.phone}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Orders</p>
                <p>{customer.orders}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Total spent</p>
                <p>{customer.spent}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Recent activity</h2>
            <p className="text-sm text-slate-700">Latest orders placed by this customer.</p>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="rounded-3xl bg-white p-4 text-sm text-slate-600">No recent orders found.</div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-800/5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{order.id}</p>
                          <p className="text-sm text-slate-500">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span>{order.status}</span>
                          <span className="font-semibold text-slate-900">{order.total}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{order.products?.length ?? 0} products</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
