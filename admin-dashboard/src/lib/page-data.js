export const products = [
  { id: 1, name: "Wireless Headphones", category: "Audio", price: "$129.99", stock: 24, status: "Active" },
  { id: 2, name: "Smart Fitness Watch", category: "Wearables", price: "$249.99", stock: 12, status: "Active" },
  { id: 3, name: "Travel Backpack", category: "Accessories", price: "$89.99", stock: 31, status: "Active" },
  { id: 4, name: "USB-C Cable", category: "Cables", price: "$19.99", stock: 5, status: "Low Stock" },
  { id: 5, name: "Phone Stand", category: "Accessories", price: "$24.99", stock: 47, status: "Active" },
];

export const categories = [
  { id: 1, name: "Electronics", products: 54, createdAt: "Jan 15, 2025" },
  { id: 2, name: "Accessories", products: 89, createdAt: "Feb 3, 2025" },
  { id: 3, name: "Wearables", products: 42, createdAt: "Feb 18, 2025" },
  { id: 4, name: "Audio", products: 28, createdAt: "Mar 5, 2025" },
  { id: 5, name: "Cables", products: 15, createdAt: "Mar 12, 2025" },
];

export const customers = [
  { id: 1, name: "Ava Johnson", email: "ava@example.com", phone: "+1-555-0101", orders: 8, spent: "$2,450" },
  { id: 2, name: "Noah Lee", email: "noah@example.com", phone: "+1-555-0102", orders: 3, spent: "$680" },
  { id: 3, name: "Mia Chen", email: "mia@example.com", phone: "+1-555-0103", orders: 12, spent: "$4,920" },
  { id: 4, name: "Leo Smith", email: "leo@example.com", phone: "+1-555-0104", orders: 2, spent: "$390" },
  { id: 5, name: "Emma Wilson", email: "emma@example.com", phone: "+1-555-0105", orders: 6, spent: "$1,850" },
];

export const orders = [
  { id: "#A1234", customer: "Ava Johnson", date: "Jun 8, 2026", status: "Shipped", items: 3, total: "$320.00" },
  { id: "#A1235", customer: "Noah Lee", date: "Jun 9, 2026", status: "Processing", items: 1, total: "$89.99" },
  { id: "#A1236", customer: "Mia Chen", date: "Jun 9, 2026", status: "Delivered", items: 5, total: "$1,688.50" },
  { id: "#A1237", customer: "Leo Smith", date: "Jun 10, 2026", status: "Pending", items: 2, total: "$56.75" },
  { id: "#A1238", customer: "Emma Wilson", date: "Jun 10, 2026", status: "Shipped", items: 4, total: "$445.20" },
];

export const admins = [
  { id: 1, name: "Sarah Admin", email: "sarah@store.com", role: "Super Admin", status: "Active", joinedDate: "Jan 1, 2025" },
  { id: 2, name: "John Manager", email: "john@store.com", role: "Manager", status: "Active", joinedDate: "Feb 15, 2025" },
  { id: 3, name: "Emily Support", email: "emily@store.com", role: "Support", status: "Active", joinedDate: "Mar 10, 2025" },
  { id: 4, name: "David Analyst", email: "david@store.com", role: "Analyst", status: "Inactive", joinedDate: "Apr 5, 2025" },
];
