"use client";

import { useState } from "react";
import StatCard from "@/components/StatCard";
import OrdersTable from "@/components/OrdersTable";
import SalesChart from "@/components/SalesChart";
import TopProductsList from "@/components/TopProductsList";

const tabLabels = [
  { title: "All", description: "Overview" },
  { title: "Sales", description: "Shipped sales trend" },
  { title: "Orders", description: "Recent orders + categories" },
];

export default function DashboardTabs({ dashboardStats, salesChart, topProducts, recentOrders, categoryCounts }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center justify-center gap-3 rounded-full bg-slate-100/80 px-3 py-2">
          {tabLabels.map((tab, index) => (
            <button
              key={tab.title}
              type="button"
              onClick={() => setSelectedTab(index)}
              className={`h-3.5 w-3.5 rounded-full transition ${
                selectedTab === index ? "bg-slate-950" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`${tab.title} tab`}
            />
          ))}
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {tabLabels[selectedTab].title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {selectedTab === 0
              ? "Here's what's happening with your store today."
              : selectedTab === 1
              ? "Monthly shipped order revenue for your store."
              : "Recent orders and category snapshot for quick review."}
          </p>
        </div>
      </div>

      <div className="mt-8">
        {selectedTab === 0 && (
          <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Top products</h3>
              <TopProductsList products={topProducts} />
            </div>
          </div>
        )}

        {selectedTab === 1 && (
          <div className="space-y-6">
            <SalesChart data={salesChart} />
          </div>
        )}

        {selectedTab === 2 && (
          <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <OrdersTable orders={recentOrders} />
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-800/5 sm:p-7">
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
          </div>
        )}
      </div>
    </div>
  );
}
