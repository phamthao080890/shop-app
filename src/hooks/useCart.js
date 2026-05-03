import { useCart } from '../context/CartContext.jsx';

/** Thin re-export for convenient hook usage in components. */
export function useCartHook() {
  return useCart();
}
