import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="success-page">
      <div className="success-page__icon">🎉</div>
      <h1>Order Placed!</h1>
      {order && (
        <p>
          Order <strong>#{order.id}</strong> — Total <strong>${Number(order.totalAmount).toFixed(2)}</strong>
        </p>
      )}
      <p>Thank you for your purchase. Your order has been saved.</p>
      <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );
}
