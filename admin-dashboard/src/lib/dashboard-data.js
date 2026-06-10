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
    topProducts,
    products,
    categories,
    customers,
  };
}
