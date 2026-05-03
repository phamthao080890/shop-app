# ShopApp

A React e-commerce storefront powered by the [dummyjson.com](https://dummyjson.com) public API. No backend required.

## 🚀 Live Demo

**Website**: [Deployed on Render](https://dashboard.render.com/web/srv-d7rh4cegkk3c738jvn0g)  

https://shop-app-hlja.onrender.com

---

## Features

- Product listing with **pagination**, **search**, and **sorting** (price ↑↓, discount, rating)
- Full product detail with image gallery, tags, and reviews
- **Add to cart** with a slide-in drawer
- 3-step **checkout** flow: Shipping → Payment → Confirm
- Cart and orders persisted in `localStorage`

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, React Router v6, Axios |
| Data     | [dummyjson.com](https://dummyjson.com) public REST API |
| State    | React Context + `localStorage`      |

---

## Project Structure

```
shop-app/
├── src/
│   ├── api/
│   │   ├── productApi.js     # Fetches products from dummyjson.com
│   │   ├── cartApi.js        # localStorage-backed cart
│   │   └── orderApi.js       # localStorage-backed orders
│   ├── components/
│   │   ├── cart/             # CartDrawer, CartItem
│   │   ├── checkout/         # AddressStep, PaymentStep, ConfirmStep, CheckoutSteps
│   │   ├── layout/           # Header, Footer, Layout
│   │   └── product/          # ProductCard, ProductGrid, SortBar
│   ├── context/
│   │   └── CartContext.jsx   # Global cart state
│   ├── hooks/
│   │   ├── useProducts.js    # Paginated product list hook
│   │   └── useCart.js        # Cart management hook
│   ├── pages/
│   │   ├── ProductListPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── OrderSuccessPage.jsx
│   ├── styles/
│   │   ├── base.css          # Base styles and reset
│   │   ├── cart.css          # Cart-related styles
│   │   ├── checkout.css      # Checkout flow styles
│   │   ├── layout.css        # Header and footer styles
│   │   ├── pages.css         # Page-specific styles
│   │   ├── product.css       # Product display styles
│   │   ├── tokens.css        # Design tokens (colors, spacing, typography)
│   │   └── utilities.css     # Utility classes
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18

### 1. Clone & install

```bash
git clone https://github.com/phamthao080890/shop-app.git
cd shop-app
npm install
```

### 2. Start the dev server

```bash
npm run dev
# App runs at http://localhost:5173
```

---

## Data Source

Products are fetched live from **[dummyjson.com/products](https://dummyjson.com/products)**. No API key or account is required.

### Product query parameters

| Param      | Values                                                             | Default  |
|------------|--------------------------------------------------------------------|----------|
| `page`     | integer ≥ 1                                                        | `1`      |
| `limit`    | 1–100                                                              | `20`     |
| `sort`     | `newest`, `price_asc`, `price_desc`, `discount_desc`, `rating_desc` | `newest` |
| `search`   | free text                                                          | —        |
| `category` | dummyjson category slug                                            | —        |

---

## Cart & Orders

All cart items and placed orders are persisted in the browser's `localStorage` — no backend server needed. Data persists across page refreshes and browser sessions.

| Storage Key  | Purpose                    |
|--------------|----------------------------|
| `shop_cart`  | Active shopping cart items |
| `shop_orders` | Completed order history   |

### Adding Items to Cart

```javascript
// Example cart item structure
{
  productId: 1,
  quantity: 2,
  price: 299.99,
  title: "Product Name"
}
```

### Placing an Order

The checkout flow collects the following information:

```json
{
  "shippingName": "Jane Doe",
  "shippingEmail": "jane@example.com",
  "shippingAddress": "123 Main St",
  "shippingCity": "New York",
  "shippingState": "NY",
  "shippingPostalCode": "10001",
  "shippingCountry": "US",
  "paymentMethod": "cod"
}
```

Orders are saved to `localStorage` upon successful completion.

---

## License

MIT
