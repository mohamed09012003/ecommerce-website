export default function StatCard({ label, value, delta, description }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 sm:p-7">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{delta}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
