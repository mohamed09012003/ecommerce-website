import DashboardTabs from "@/components/DashboardTabs";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function Home() {
  const { dashboardStats, recentOrders, salesChart, topProducts, products, categories } = await getDashboardData();
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

        <DashboardTabs
          dashboardStats={dashboardStats}
          salesChart={salesChart}
          topProducts={topProducts}
          recentOrders={recentOrders}
          categoryCounts={categoryCounts}
        />
      </main>
    </div>
  );
}
