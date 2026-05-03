import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

function discountedPrice(price, pct) {
  return price * (1 - pct / 100);
}

function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const stars = Array.from({ length: 5 }, (_, i) => (i < full ? '★' : '☆'));
  return <span className="product-detail__stars" style={{ fontSize: '.85rem' }}>{stars.join('')} {rating.toFixed(1)}</span>;
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage > 0;

  async function handleAddToCart(e) {
    e.preventDefault();
    await addItem(product, 1);
  }

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <article className="card product-card">
        <img
          className="product-card__img"
          src={product.thumbnail || product.images?.[0]?.url || '/placeholder.png'}
          alt={product.title}
          loading="lazy"
        />
        <div className="product-card__body">
          {product.brand && <p className="product-card__brand">{product.brand}</p>}
          <h3 className="product-card__title">{product.title}</h3>

          <StarRating rating={Number(product.rating)} />

          {hasDiscount && (
            <span className="badge badge-red">-{product.discountPercentage}%</span>
          )}

          <div className="product-card__price-row">
            <span className="product-card__price">${finalPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="product-card__original">${Number(product.price).toFixed(2)}</span>
            )}
          </div>

          <button
            className="btn btn-primary product-card__add"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </article>
    </Link>
  );
}
