import axios from 'axios';

const dummyJson = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

// Map app sort values to dummyjson query params
const SORT_MAP = {
  newest:        {},
  price_asc:     { sortBy: 'price',                 order: 'asc'  },
  price_desc:    { sortBy: 'price',                 order: 'desc' },
  discount_desc: { sortBy: 'discountPercentage',    order: 'desc' },
  rating_desc:   { sortBy: 'rating',                order: 'desc' },
};

// Normalize a dummyjson product to the shape the UI expects
function normalizeProduct(p) {
  return {
    ...p,
    // dummyjson returns images as plain strings; UI expects [{ url }]
    images: (p.images || []).map((img) =>
      typeof img === 'string' ? { url: img } : img
    ),
    // dummyjson returns tags as plain strings; UI expects [{ name }]
    tags: (p.tags || []).map((t, i) =>
      typeof t === 'string' ? { id: i, name: t } : t
    ),
    // dummyjson reviews have no id; add a stable index-based one
    reviews: (p.reviews || []).map((r, i) =>
      r.id !== undefined ? r : { ...r, id: i }
    ),
  };
}

/**
 * @param {Object} params - page, limit, sort, category, search, minPrice, maxPrice
 */
export async function getProducts({ page = 1, limit = 20, sort = 'newest', search, category } = {}) {
  const skip = (page - 1) * limit;
  const sortParams = SORT_MAP[sort] || {};

  let res;
  if (search) {
    res = await dummyJson.get('/products/search', { params: { q: search, limit, skip, ...sortParams } });
  } else if (category) {
    res = await dummyJson.get(`/products/category/${encodeURIComponent(category)}`, { params: { limit, skip, ...sortParams } });
  } else {
    res = await dummyJson.get('/products', { params: { limit, skip, ...sortParams } });
  }

  const { products, total } = res.data;
  return {
    data: {
      products: products.map(normalizeProduct),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProduct(id) {
  const res = await dummyJson.get(`/products/${id}`);
  return { data: { product: normalizeProduct(res.data) } };
}
