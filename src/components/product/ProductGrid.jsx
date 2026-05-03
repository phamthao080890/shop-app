import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="spinner-wrap">
        <div className="spinner" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--clr-muted)' }}>
        No products found.
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
