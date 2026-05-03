import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/productApi.js';
import { useCart } from '../context/CartContext.jsx';

function Stars({ rating }) {
  return (
    <span className="product-detail__stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))} {Number(rating).toFixed(1)}
    </span>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty]             = useState(1);
  const [adding, setAdding]       = useState(false);
  const [error, setError]         = useState(null);

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then((res) => setProduct(res.data.product))
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
  if (error || !product) return <p style={{ color: 'var(--clr-danger)' }}>{error || 'Not found'}</p>;

  const allImages = [
    ...(product.thumbnail ? [product.thumbnail] : []),
    ...(product.images?.map((i) => i.url) ?? []),
  ];
  const finalPrice = product.price * (1 - product.discountPercentage / 100);

  async function handleAdd() {
    setAdding(true);
    await addItem(product, qty);
    setAdding(false);
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ marginBottom: '1rem' }}>
        ← Back
      </button>

      <div className="product-detail">
        {/* Gallery */}
        <div className="product-detail__gallery">
          <img
            src={allImages[activeImg] || '/placeholder.png'}
            alt={product.title}
          />
          {allImages.length > 1 && (
            <div className="product-detail__thumb-row">
              {allImages.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className={`product-detail__thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-detail__info">
          {product.category && (
            <p className="product-detail__category">{product.category}</p>
          )}
          <h1 className="product-detail__title">{product.title}</h1>
          <Stars rating={product.rating} />

          <div className="product-detail__price-row">
            <span className="product-detail__price">${finalPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="product-detail__original">${Number(product.price).toFixed(2)}</span>
                <span className="badge badge-red">-{product.discountPercentage}%</span>
              </>
            )}
          </div>

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__qty">
            <label htmlFor="qty">Qty:</label>
            <input
              id="qty" type="number" min={1} max={product.stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '.75rem 2rem', alignSelf: 'flex-start' }}
            onClick={handleAdd}
            disabled={product.stock === 0 || adding}
          >
            {product.stock === 0 ? 'Out of Stock' : adding ? 'Adding…' : 'Add to Cart'}
          </button>

          {/* Meta */}
          <dl className="product-detail__meta">
            <dt>SKU</dt>       <dd>{product.sku}</dd>
            <dt>Stock</dt>     <dd>{product.stock} units</dd>
            {product.warrantyInformation && <><dt>Warranty</dt><dd>{product.warrantyInformation}</dd></>}
            {product.shippingInformation && <><dt>Shipping</dt><dd>{product.shippingInformation}</dd></>}
            {product.returnPolicy        && <><dt>Returns</dt><dd>{product.returnPolicy}</dd></>}
          </dl>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="product-detail__tags">
              {product.tags.map((t) => (
                <span key={t.id || t.name} className="badge badge-blue">{t.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <section className="reviews">
          <h2 className="reviews__title">Customer Reviews</h2>
          <div className="reviews__grid">
            {product.reviews.map((r) => (
              <div key={r.id} className="card review-card">
                <div className="review-card__header">
                  <strong className="review-card__name">{r.reviewerName}</strong>
                  <Stars rating={r.rating} />
                </div>
                <p className="review-card__comment">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
