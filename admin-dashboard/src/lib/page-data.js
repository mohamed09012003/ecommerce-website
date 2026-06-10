import * as api from "@/services/fakeStoreApi";

export async function getProducts() {
  return api.getProducts();
}

export async function getCategories() {
  return api.getCategories();
}

export async function getCustomers() {
  return api.getCustomers();
}

export async function getOrders() {
  return api.getOrders();
}

export async function getOrdersByUserId(userId) {
  return api.getOrdersByUserId(userId);
}

export const admins = [
  { id: 1, name: "Sarah Admin", email: "sarah@store.com", role: "Super Admin", status: "Active", joinedDate: "Jan 1, 2025" },
  { id: 2, name: "John Manager", email: "john@store.com", role: "Manager", status: "Active", joinedDate: "Feb 15, 2025" },
  { id: 3, name: "Emily Support", email: "emily@store.com", role: "Support", status: "Active", joinedDate: "Mar 10, 2025" },
  { id: 4, name: "David Analyst", email: "david@store.com", role: "Analyst", status: "Inactive", joinedDate: "Apr 5, 2025" },
];
