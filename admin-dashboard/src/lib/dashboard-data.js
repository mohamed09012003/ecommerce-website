import * as api from "@/services/fakeStoreApi";

const parseAmount = (value) => {
  const amount = Number(value?.toString().replace(/[^0-9.]/g, ""));
  return Number.isNaN(amount) ? 0 : amount;
};

export async function getDashboardData() {
  const [products, categories, customers, orders] = await Promise.all([
    api.getProducts(),
    api.getCategories(),
    api.getCustomers(),
    api.getOrders(),
  ]);

  const totalSales = orders.reduce((sum, order) => sum + parseAmount(order.total), 0);
  const stockAlerts = products.filter((product) => product.rating?.count < 100).length;
  const topProducts = products
    .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    .slice(0, 3)
    .map((product) => ({
      name: product.title,
      category: product.category,
      stock: product.rating?.count || 0,
      sales: Math.round((product.rating?.rate || 0) * 20),
    }));

  const recentOrders = orders.slice(0, 4).map((order) => {
    const customer = customers.find((user) => user.id === order.userId);
    const name = customer ? `${customer.name.firstname} ${customer.name.lastname}` : `User ${order.userId}`;
    return {
      id: order.id,
      customer: name,
      date: order.date,
      status: order.status,
      total: order.total,
    };
  });

  const shippedOrders = orders.filter((order) => order.status === "Shipped");
  const shippedDates = shippedOrders
    .map((order) => new Date(order.date))
    .filter((date) => !Number.isNaN(date));

  let months = [];
  if (shippedDates.length) {
    const first = new Date(Math.min(...shippedDates.map((date) => date.getTime())));
    const last = new Date(Math.max(...shippedDates.map((date) => date.getTime())));
    const start = new Date(first.getFullYear(), first.getMonth(), 1);
    const end = new Date(last.getFullYear(), last.getMonth(), 1);

    for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + 1)) {
      months.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleString("en-US", { month: "short", year: "numeric" }),
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }
  }

  const monthlySalesMap = new Map();
  months.forEach((m) => monthlySalesMap.set(m.key, { label: m.label, value: 0, orders: 0, month: m.month, year: m.year }));

  // aggregate only shipped orders into the map for the actual chart range
  shippedOrders.forEach((order) => {
    const date = new Date(order.date);
    if (Number.isNaN(date)) return;

    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const value = parseAmount(order.total);

    if (monthlySalesMap.has(key)) {
      const entry = monthlySalesMap.get(key);
      monthlySalesMap.set(key, { ...entry, value: entry.value + value, orders: (entry.orders || 0) + 1 });
    }
  });

  const salesChart = Array.from(monthlySalesMap.values())
    .sort((a, b) => a.year - b.year || a.month - b.month)
    .map(({ label, value, orders }) => ({ label, value, orders }));

  return {
    dashboardStats: [
      {
        label: "Total sales",
        value: `$${totalSales.toFixed(2)}`,
        delta: "+12.4%",
        description: "vs last period",
      },
      {
        label: "New orders",
        value: `${orders.length}`,
        delta: "+8.1%",
        description: "this month",
      },
      {
        label: "Active customers",
        value: `${customers.length}`,
        delta: "+3.6%",
        description: "in the last 30 days",
      },
      {
        label: "Stock alerts",
        value: `${stockAlerts}`,
        delta: "-9.3%",
        description: "low inventory items",
      },
    ],
    recentOrders,
    salesChart,
    topProducts,
    products,
    categories,
    customers,
  };
}
