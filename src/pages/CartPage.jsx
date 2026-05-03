import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItemRow from '../components/cart/CartItem.jsx';

export default function CartPage() {
  const { cart, total, clearCart } = useCart();
  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="cart-page__empty">
        <span className="cart-page__empty-icon">🛒</span>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1>Shopping Cart</h1>
        <span style={{ color: 'var(--clr-muted)', fontSize: '.9rem' }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      {items.map((item) => <CartItemRow key={item.id} item={item} />)}

      {(() => {
        const originalTotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
        const savings = originalTotal - total;
        return (
          <div className="cart-page__total">
            <div>
              <div className="cart-page__total-label">Total</div>
              {savings > 0.005 && (
                <div className="cart-page__savings">You save ${savings.toFixed(2)}</div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              {savings > 0.005 && (
                <div className="cart-page__original">${originalTotal.toFixed(2)}</div>
              )}
              <div className="cart-page__total-amount">${total.toFixed(2)}</div>
            </div>
          </div>
        );
      })()}

      <div className="cart-page__actions">
        <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
        <button className="btn btn-outline" onClick={clearCart}>Clear Cart</button>
        <Link to="/products" className="btn btn-ghost">← Continue Shopping</Link>
      </div>
    </div>
  );
}
