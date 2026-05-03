import React from 'react';

const SORT_OPTIONS = [
  { value: 'newest',       label: 'Newest' },
  { value: 'price_asc',    label: 'Price: Low to High' },
  { value: 'price_desc',   label: 'Price: High to Low' },
  { value: 'discount_desc',label: 'Biggest Discount' },
  { value: 'rating_desc',  label: 'Top Rated' },
];

export default function SortBar({ sort, onSortChange, total, search, onSearchChange }) {
  return (
    <div className="sort-bar">
      <label className="sort-bar__label" htmlFor="search">Search:</label>
      <input
        id="search"
        type="search"
        placeholder="Search products…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: '.4rem .75rem', borderRadius: '8px', border: '1.5px solid var(--clr-border)', font: 'inherit', fontSize: '.875rem' }}
      />

      <label className="sort-bar__label" htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <span className="sort-bar__count">{total} product{total !== 1 ? 's' : ''}</span>
    </div>
  );
}
