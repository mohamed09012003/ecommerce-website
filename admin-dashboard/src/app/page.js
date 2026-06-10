import StatCard from "@/components/StatCard";
import OrdersTable from "@/components/OrdersTable";
import TopProductsList from "@/components/TopProductsList";
import { dashboardStats, recentOrders, topProducts } from "@/lib/dashboard-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-white/90 p-6 shadow-sm shadow-slate-800/5 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Admin dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Ecommerce operations overview
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Monitor sales, orders, customers, and inventory from a single dashboard built for fast product and order management.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
              <button className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                Add product
              </button>
              <button className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50">
                View reports
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            {dashboardStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <TopProductsList products={topProducts} />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <OrdersTable orders={recentOrders} />
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Category snapshot</h2>
              <p className="mt-1 text-sm text-slate-500">A quick view of inventory and category performance.</p>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">Electronics</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">54 products</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">Apparel</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">81 products</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">Home goods</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">29 products</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
