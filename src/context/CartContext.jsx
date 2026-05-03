import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as cartApi from '../api/cartApi.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart]   = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const [open, setOpen]   = useState(false); // controls CartDrawer

  const fetchCart = useCallback(async () => {
    try {
      const res = await cartApi.getCart();
      setCart(res.data.cart);
      setTotal(res.data.total || 0);
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  /** @param {object} product - full product object from the API */
  const addItem = useCallback(async (product, quantity = 1) => {
    await cartApi.addItem(product, quantity);
    await fetchCart();
    setOpen(true);
  }, [fetchCart]);

  const updateItem = useCallback(async (itemId, quantity) => {
    await cartApi.updateItem(itemId, quantity);
    await fetchCart();
  }, [fetchCart]);

  const removeItem = useCallback(async (itemId) => {
    await cartApi.removeItem(itemId);
    await fetchCart();
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    await cartApi.clearCart();
    setCart({ items: [] });
    setTotal(0);
  }, []);

  const itemCount = cart.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{
      cart, total, itemCount, open,
      setOpen, addItem, updateItem, removeItem, clearCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
