import React, { useState, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts.js';
import SortBar      from '../components/product/SortBar.jsx';
import ProductGrid  from '../components/product/ProductGrid.jsx';

export default function ProductListPage() {
  const [page,   setPage]   = useState(1);
  const [sort,   setSort]   = useState('newest');
  const [search, setSearch] = useState('');

  const { products, total, totalPages, loading, error } = useProducts({
    page, limit: 20, sort, search: search || undefined,
  });

  const handleSort = useCallback((val) => { setSort(val); setPage(1); }, []);
  const handleSearch = useCallback((val) => { setSearch(val); setPage(1); }, []);

  return (
    <div>
      <SortBar
        sort={sort}
        onSortChange={handleSort}
        total={total}
        search={search}
        onSearchChange={handleSearch}
      />

      {error && (
        <p style={{ color: 'var(--clr-danger)', marginBottom: '1rem' }}>{error}</p>
      )}

      <ProductGrid products={products} loading={loading} />

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={p === page ? 'active' : ''}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
        </div>
      )}
    </div>
  );
}
