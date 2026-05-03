const CART_KEY = 'shop_cart';

function load() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function save(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function calcTotal(items) {
  return items.reduce((s, i) => {
    const disc = i.product?.discountPercentage ?? 0;
    return s + i.unitPrice * (1 - disc / 100) * i.quantity;
  }, 0);
}

export function getCart() {
  const items = load();
  return Promise.resolve({ data: { cart: { items }, total: calcTotal(items) } });
}

/** product must be the full product object (needs id, price, title, thumbnail, discountPercentage) */
export function addItem(product, quantity = 1) {
  const items = load();
  const existing = items.find((i) => i.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      id: `${product.id}-${Date.now()}`,
      quantity,
      unitPrice: product.price,
      product: {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        discountPercentage: product.discountPercentage ?? 0,
      },
    });
  }
  save(items);
  return Promise.resolve({ data: {} });
}

export function updateItem(itemId, quantity) {
  save(load().map((i) => i.id === itemId ? { ...i, quantity } : i));
  return Promise.resolve({ data: {} });
}

export function removeItem(itemId) {
  save(load().filter((i) => i.id !== itemId));
  return Promise.resolve({ data: {} });
}

export function clearCart() {
  save([]);
  return Promise.resolve({ data: {} });
}
