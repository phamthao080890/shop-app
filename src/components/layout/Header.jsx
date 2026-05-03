import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import CartDrawer from '../cart/CartDrawer.jsx';

export default function Header() {
  const { itemCount, open, setOpen } = useCart();

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Link to="/products" className="header__logo">🛍 ShopApp</Link>

          <nav className="header__nav">
            <NavLink to="/products">Products</NavLink>

            <button
              className="cart-btn btn"
              onClick={() => setOpen(true)}
              aria-label="Open cart"
            >
              🛒
              {itemCount > 0 && (
                <span className="cart-btn__badge">{itemCount}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
