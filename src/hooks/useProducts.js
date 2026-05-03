import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/productApi.js';

/**
 * Hook to fetch paginated + sorted product list.
 * @param {Object} params - { page, limit, sort, category, search, minPrice, maxPrice }
 */
export function useProducts(params = {}) {
  const [products, setProducts]     = useState([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts(params);
      setProducts(res.data.products);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { products, total, totalPages, loading, error, refetch: fetch };
}
