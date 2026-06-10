import path from 'path';
import { pathToFileURL } from 'url';

const root = path.resolve('d:/projects/ecommerce-website/admin-dashboard');
const api = await import(pathToFileURL(path.join(root, 'src/services/fakeStoreApi.js')).href);
const orders = await api.getOrders();
const shipped = orders.filter((order) => order.status === 'Shipped');

const shippedDates = shipped
  .map((order) => new Date(order.date))
  .filter((date) => !Number.isNaN(date));

if (!shippedDates.length) {
  console.log('no shipped orders');
  process.exit(0);
}

const first = new Date(Math.min(...shippedDates.map((date) => date.getTime())));
const last = new Date(Math.max(...shippedDates.map((date) => date.getTime())));
const months = [];
for (let date = new Date(first.getFullYear(), first.getMonth(), 1); date <= new Date(last.getFullYear(), last.getMonth(), 1); date.setMonth(date.getMonth() + 1)) {
  months.push({
    key: `${date.getFullYear()}-${date.getMonth()}`,
    label: date.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    month: date.getMonth(),
    year: date.getFullYear(),
  });
}

console.log('shipped count:', shipped.length);
console.log('chart months:', JSON.stringify(months, null, 2));
console.log('sample shipped:', shipped.slice(0, 5).map((o) => ({ id: o.id, date: o.date, status: o.status, total: o.total })));
