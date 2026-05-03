import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Layout from './components/layout/Layout.jsx';
import ProductListPage   from './pages/ProductListPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage          from './pages/CartPage.jsx';
import CheckoutPage      from './pages/CheckoutPage.jsx';
import OrderSuccessPage  from './pages/OrderSuccessPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="/products"        element={<ProductListPage />} />
            <Route path="/products/:id"    element={<ProductDetailPage />} />
            <Route path="/cart"            element={<CartPage />} />
            <Route path="/checkout"        element={<CheckoutPage />} />
            <Route path="/order-success"   element={<OrderSuccessPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
