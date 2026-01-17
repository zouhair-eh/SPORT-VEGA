const KEY = 'vega_cart_v1';

export function loadCart() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(cart, item) {
  // item: {id,name,priceMAD,qty,meta?}
  const key = item.key || `${item.id}:${JSON.stringify(item.meta || {})}`;
  const existing = cart.find((x) => x.key === key);
  if (existing) {
    return cart.map((x) => x.key === key ? { ...x, qty: x.qty + (item.qty || 1) } : x);
  }
  return [...cart, { ...item, key, qty: item.qty || 1 }];
}

export function removeFromCart(cart, key) {
  return cart.filter((x) => x.key !== key);
}

export function updateQty(cart, key, qty) {
  const q = Math.max(1, Number(qty || 1));
  return cart.map((x) => x.key === key ? { ...x, qty: q } : x);
}

export function cartTotalMAD(cart) {
  return cart.reduce((sum, x) => sum + (x.priceMAD * x.qty), 0);
}
