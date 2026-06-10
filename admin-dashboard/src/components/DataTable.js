export default function DataTable({ title, description, columns, data, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm shadow-slate-800/5">
      <div className="px-6 py-5 border-b border-slate-200/80 sm:px-7">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 font-medium">
                  {col}
                </th>
              ))}
              {(onView || onEdit || onDelete) && <th className="px-6 py-4 font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-6 py-4">
                    {typeof value === "string" && value.startsWith("$") ? (
                      <span className="font-medium text-slate-900">{value}</span>
                    ) : value === "Active" || value === "Delivered" || value === "Shipped" ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        {value}
                      </span>
                    ) : value === "Low Stock" || value === "Pending" ? (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                        {value}
                      </span>
                    ) : value === "Processing" ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {onView && (
                        <button onClick={() => onView(idx)} className="text-xs font-medium text-slate-600 hover:text-slate-900">
                          View
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(idx)} className="text-xs font-medium text-slate-600 hover:text-slate-900">
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(idx)} className="text-xs font-medium text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
