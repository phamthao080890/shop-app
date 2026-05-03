import React from 'react';
import { useCart } from '../../context/CartContext.jsx';

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}

const METHOD_LABEL = {
  cod: 'Cash on Delivery',
  paypal: 'PayPal',
  credit_card: 'Credit / Debit Card',
};

export default function ConfirmStep({ shipping, paymentMethod, onPlace, onBack, loading }) {
  const { cart, total } = useCart();
  const items = cart?.items ?? [];

  return (
    <div className="checkout-card">
      <h2 className="checkout-card__title">Review Your Order</h2>

      <div className="confirm-sections">
        {/* Shipping */}
        <div className="confirm-card">
          <p className="confirm-card__title">Shipping to</p>
          <p>
            <strong>{shipping.shippingName}</strong><br />
            {shipping.shippingEmail}<br />
            {shipping.shippingPhone && <>{shipping.shippingPhone}<br /></>}
            {shipping.shippingAddress}{shipping.shippingCity ? `, ${shipping.shippingCity}` : ''}<br />
            {[shipping.shippingState, shipping.shippingPostalCode, shipping.shippingCountry].filter(Boolean).join(', ')}
          </p>
        </div>

        {/* Payment */}
        <div className="confirm-card">
          <p className="confirm-card__title">Payment method</p>
          <p>{METHOD_LABEL[paymentMethod] ?? paymentMethod}</p>
        </div>

        {/* Items */}
        <div className="confirm-card">
          <p className="confirm-card__title">Items ({items.length})</p>
          {items.map((item) => {
            const disc = item.product?.discountPercentage ?? 0;
            const finalUnit = item.unitPrice * (1 - disc / 100);
            const lineTotal = finalUnit * item.quantity;
            const lineOriginal = item.unitPrice * item.quantity;
            return (
              <div key={item.id} className="confirm-item">
                <span className="confirm-item__name">{item.product?.title} × {item.quantity}</span>
                <span className="confirm-item__price-col">
                  {disc > 0 && (
                    <span className="confirm-item__original">${lineOriginal.toFixed(2)}</span>
                  )}
                  <span className="confirm-item__price">${lineTotal.toFixed(2)}</span>
                </span>
              </div>
            );
          })}
          {(() => {
            const originalTotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
            const savings = originalTotal - total;
            return (
              <>
                {savings > 0.005 && (
                  <div className="confirm-savings">🎉 You save ${savings.toFixed(2)}</div>
                )}
                <div className="confirm-total">
                  <span>Total</span>
                  <span className="confirm-total__amount">${total.toFixed(2)}</span>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <div className="checkout-actions">
        <button className="btn btn-outline" onClick={onBack} disabled={loading}>← Back</button>
        <button className="btn btn-primary" onClick={onPlace} disabled={loading}>
          {loading ? 'Placing Order…' : <><CartIcon /> Place Order</>}
        </button>
      </div>
    </div>
  );
}
