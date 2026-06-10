export default function OrdersTable({ orders }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm shadow-slate-800/5">
      <div className="px-6 py-5 border-b border-slate-200/80 sm:px-7">
        <h2 className="text-lg font-semibold text-slate-950">Recent orders</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track order status and latest sales activity.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/70">
                <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 text-slate-600">{order.status}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
