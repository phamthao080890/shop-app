import React from 'react';
import { useCart } from '../../context/CartContext.jsx';

export default function CartItemRow({ item }) {
  const { updateItem, removeItem } = useCart();
  const { id, quantity, unitPrice, product } = item;
  const disc = product?.discountPercentage ?? 0;
  const finalPrice = unitPrice * (1 - disc / 100);
  const hasDiscount = disc > 0;

  return (
    <div className="cart-item">
      <img
        className="cart-item__img"
        src={product?.thumbnail || '/placeholder.png'}
        alt={product?.title}
      />
      <div className="cart-item__info">
        <p className="cart-item__title">{product?.title}</p>
        <div className="cart-item__price-row">
          <span className="cart-item__price">${finalPrice.toFixed(2)} each</span>
          {hasDiscount && (
            <>
              <span className="cart-item__original">${unitPrice.toFixed(2)}</span>
              <span className="cart-item__discount-badge">-{disc}%</span>
            </>
          )}
        </div>
        {hasDiscount && (
          <p className="cart-item__savings">You save ${((unitPrice - finalPrice) * quantity).toFixed(2)}</p>
        )}

        <div className="cart-item__qty">
          <button onClick={() => quantity > 1 ? updateItem(id, quantity - 1) : removeItem(id)}>−</button>
          <span>{quantity}</span>
          <button onClick={() => updateItem(id, quantity + 1)}>+</button>
        </div>

        <button className="cart-item__remove" onClick={() => removeItem(id)}>Remove</button>
      </div>
    </div>
  );
}
