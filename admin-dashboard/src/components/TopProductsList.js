export default function TopProductsList({ products }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
      <div className="flex items-start justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-950">Top products</h2>
          <p className="mt-1 text-sm text-slate-500">Best selling items driving revenue this week.</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="font-medium text-slate-950 truncate overflow-hidden">{product.name}</p>
              <p className="mt-1 text-sm text-slate-500 truncate overflow-hidden">{product.category}</p>
            </div>
            <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 sm:items-center sm:flex-none">
              <div className="min-w-[88px]">
                <p className="text-slate-900 font-semibold">Stock</p>
                <p>{product.stock}</p>
              </div>
              <div className="min-w-[88px]">
                <p className="text-slate-900 font-semibold">Sales</p>
                <p>{product.sales}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
