const ORDERS_KEY = 'shop_orders';
const CART_KEY   = 'shop_cart';

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function calcTotal(items) {
  return items.reduce((s, i) => {
    const disc = i.product?.discountPercentage ?? 0;
    return s + i.unitPrice * (1 - disc / 100) * i.quantity;
  }, 0);
}

export function createOrder(data) {
  const items = loadCart();
  const order = {
    id: Date.now(),
    ...data,
    items,
    totalAmount: calcTotal(items),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  // Clear the cart after placing the order
  localStorage.removeItem(CART_KEY);
  return Promise.resolve({ data: { order } });
}

export function getOrders() {
  return Promise.resolve({ data: { orders: loadOrders() } });
}

export function getOrder(id) {
  const order = loadOrders().find((o) => String(o.id) === String(id));
  if (!order) return Promise.reject(Object.assign(new Error('Order not found'), { response: { data: { message: 'Order not found' } } }));
  return Promise.resolve({ data: { order } });
}
