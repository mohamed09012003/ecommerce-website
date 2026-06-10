import StatCard from "@/components/StatCard";
import OrdersTable from "@/components/OrdersTable";
import TopProductsList from "@/components/TopProductsList";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function Home() {
  const { dashboardStats, recentOrders, topProducts, products, categories } = await getDashboardData();
  const categoryCounts = categories.map((category) => ({
    name: category,
    count: products.filter((product) => product.category === category).length,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <section className="rounded-3xl bg-white/90 p-6 shadow-sm shadow-slate-800/5 backdrop-blur sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Here's what's happening with your store today.
            </p>
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
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-950">Category snapshot</h2>
              <p className="mt-1 text-sm text-slate-500">A quick view of inventory and category performance.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {categoryCounts.length ? (
                categoryCounts.slice(0, 3).map((category) => (
                  <div key={category.name} className="rounded-3xl bg-slate-50 p-4 min-h-[120px]">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-600 truncate">{category.name}</p>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <p className="text-2xl font-semibold leading-tight text-slate-950">{category.count}</p>
                      <p className="text-sm font-medium text-slate-600">products</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  No category data available.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
