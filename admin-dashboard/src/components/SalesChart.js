export default function SalesChart({ data = [] }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Shipped sales trend</h2>
          <p className="mt-1 text-sm text-slate-500">Monthly revenue from shipped orders.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Revenue</span>
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl bg-slate-50 p-4">
        {data.length ? (
          <div className="flex items-end gap-4 overflow-x-auto" style={{ minWidth: "100%", height: "300px", whiteSpace: 'nowrap' }}>
            {data.map((item) => {
              const rawPercent = (item.value / maxValue) * 100;
              const minPercent = item.value > 0 ? 6 : 2; // ensure tiny visibility for small values
              const heightPercent = Number.isFinite(rawPercent) ? Math.max(rawPercent, minPercent) : minPercent;
              return (
                <div key={item.label} className="flex-none flex flex-col items-center gap-2 w-20" style={{ display: 'inline-flex' }}>
                  <div className="text-xs font-medium text-slate-600">{item.orders || 0} orders</div>
                  <div className="flex items-end justify-center w-full h-64">
                    <div
                      className="w-12 rounded-t-2xl bg-sky-600 shadow-md hover:bg-sky-700 transition-colors"
                      style={{ height: `${heightPercent}%` }}
                      title={`${item.label}: $${Math.round(item.value)} — ${item.orders || 0} orders`}
                    />
                  </div>
                  <div className="text-xs font-medium text-slate-600">{item.label}</div>
                  <div className="text-xs font-semibold text-slate-900">${Math.round(item.value)}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex h-64 w-full items-center justify-center text-sm text-slate-500">
            No shipped order sales data available.
          </div>
        )}
      </div>
    </div>
  );
}
