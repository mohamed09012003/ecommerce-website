import path from 'path';
import { pathToFileURL } from 'url';

const root = path.resolve('d:/projects/ecommerce-website/admin-dashboard');
const api = await import(pathToFileURL(path.join(root, 'src/services/fakeStoreApi.js')).href);
const orders = await api.getOrders();

const parseAmount = (v) => {
  const a = Number((v || '').toString().replace(/[^0-9.]/g, ''));
  return Number.isNaN(a) ? 0 : a;
};

const months = Array.from({ length: 12 }).map((_, i) => {
  const d = new Date();
  d.setMonth(d.getMonth() - (11 - i));
  return {
    key: `${d.getFullYear()}-${d.getMonth()}`,
    label: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    month: d.getMonth(),
    year: d.getFullYear(),
  };
});

const map = new Map();
months.forEach((m) => map.set(m.key, { label: m.label, value: 0, orders: 0, month: m.month, year: m.year }));

orders
  .filter((o) => o.status === 'Shipped')
  .forEach((o) => {
    const d = new Date(o.date);
    if (Number.isNaN(d)) return;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const v = parseAmount(o.total);
    if (map.has(key)) {
      const e = map.get(key);
      map.set(key, { ...e, value: e.value + v, orders: (e.orders || 0) + 1 });
    }
  });

const sales = Array.from(map.values()).sort((a, b) => a.year - b.year || a.month - b.month);
console.log(JSON.stringify(sales, null, 2));
