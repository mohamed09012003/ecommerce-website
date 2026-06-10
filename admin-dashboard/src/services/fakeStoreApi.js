import axios from "axios";

const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export async function getProducts() {
  const response = await fakeStoreApi.get("/products");
  return response.data;
}

export async function getProductById(id) {
  const response = await fakeStoreApi.get(`/products/${id}`);
  return response.data;
}

export async function getCategories() {
  const response = await fakeStoreApi.get("/products/categories");
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await fakeStoreApi.get(`/products/category/${encodeURIComponent(category)}`);
  return response.data;
}

export async function getCustomers() {
  const response = await fakeStoreApi.get("/users");
  return response.data;
}

export async function getCustomerById(id) {
  const response = await fakeStoreApi.get(`/users/${id}`);
  return response.data;
}

export async function getCarts() {
  const response = await fakeStoreApi.get("/carts");
  return response.data;
}

const orderStatuses = ["Processing", "Pending", "Shipped", "Delivered", "Cancelled"];

export async function getOrders() {
  const [carts, products] = await Promise.all([getCarts(), getProducts()]);
  const productMap = new Map(products.map((product) => [product.id, product]));

  return carts.map((cart) => {
    const productsWithDetails = cart.products.map((item) => {
      const product = productMap.get(item.productId);
      const price = product?.price ?? 0;
      return {
        id: item.productId,
        name: product?.title || `Product ${item.productId}`,
        quantity: item.quantity,
        price: `$${Number(price).toFixed(2)}`,
      };
    });

    const total = productsWithDetails.reduce(
      (sum, item) => sum + item.quantity * Number(item.price.replace(/[^0-9.]/g, "")),
      0,
    );

    return {
      id: `#A${cart.id.toString().padStart(4, "0")}`,
      userId: cart.userId,
      date: new Date(cart.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: orderStatuses[cart.id % orderStatuses.length],
      items: cart.products.reduce((sum, item) => sum + item.quantity, 0),
      total: `$${total.toFixed(2)}`,
      products: productsWithDetails,
    };
  });
}

export async function getOrdersByUserId(userId) {
  const orders = await getOrders();
  return orders.filter((order) => order.userId === userId);
}

export default fakeStoreApi;
