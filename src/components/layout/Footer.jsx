import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">🛍 ShopApp</span>
        <div className="footer__links">
          <a href="https://dummyjson.com" target="_blank" rel="noreferrer">Powered by thaopham</a>
        </div>
        <span>© {new Date().getFullYear()} ShopApp</span>
      </div>
    </footer>
  );
}
