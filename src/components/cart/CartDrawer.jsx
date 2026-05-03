import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import CartItemRow from './CartItem.jsx';

export default function CartDrawer({ open, onClose }) {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  const items = cart?.items ?? [];

  function handleCheckout() {
    onClose();
    navigate('/checkout');
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer__header">
          <span className="drawer__title">Your Cart ({items.length})</span>
          <button className="drawer__close" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <p style={{ color: 'var(--clr-muted)', textAlign: 'center', paddingTop: '2rem' }}>
              Your cart is empty.{' '}
              <Link to="/products" onClick={onClose}>Shop now →</Link>
            </p>
          ) : (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__footer">
            {(() => {
              const originalTotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
              const savings = originalTotal - total;
              return savings > 0.005 ? (
                <div className="drawer__savings">
                  <span>Original</span>
                  <span className="drawer__savings-original">${originalTotal.toFixed(2)}</span>
                </div>
              ) : null;
            })()}
            <div className="drawer__total">
              <span>Total</span>
              <span className="drawer__total-amount">${total.toFixed(2)}</span>
            </div>
            {(() => {
              const originalTotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
              const savings = originalTotal - total;
              return savings > 0.005 ? (
                <div className="drawer__savings-badge">🎉 You save ${savings.toFixed(2)}</div>
              ) : null;
            })()}
            <button className="btn btn-primary" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="btn btn-outline" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
