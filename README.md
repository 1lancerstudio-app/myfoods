# MY Foods — demo storefront

Premium health-food e-commerce UI for **MY Foods** (millet muesli, granola, honey mixes). Built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **React Router**. All data is **local-only** (no backend): cart, catalog overrides, orders, reviews, and sessions persist in `localStorage`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Demo admin login

- **Email:** `admin@myfoods.com`
- **Password:** `myfoodsadmin`

**Important:** This is a client-side demo. Do not reuse this pattern for production admin access.

## Checkout / OTP (demo)

- Enter any 10-digit phone number.
- OTP is always **`1234`** (shown on the checkout page).
- “Send OTP on WhatsApp” is a **visual flow only** — no real WhatsApp API.

## `localStorage` keys

| Key | Purpose |
|-----|---------|
| `myfoods_cart_v1` | Cart line items |
| `myfoods_products_v1` | Full product list (admin CRUD + seed fallback) |
| `myfoods_orders_v1` | Placed orders |
| `myfoods_reviews_v1` | Customer reviews (including hidden flags) |
| `myfoods_auth_v1` | Last verified customer phone (after OTP) |
| `myfoods_admin_session_v1` | Admin session flag |

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/shop` | Shop grid + filters |
| `/shop/:slug` | Product detail |
| `/cart` | Cart |
| `/checkout` | OTP → address → place order |
| `/track` | Order lookup by phone |
| `/admin/login` | Admin sign-in |
| `/admin` | Dashboard (protected) |
| `/admin/products` | Product CRUD |
| `/admin/orders` | Orders + status updates |
| `/admin/reviews` | Reviews hide/show |

## Reviews after delivery

After **admin** marks an order **Delivered**, customers who have **verified their phone** (checkout OTP flow) can submit a **text + star review** on the matching product detail page.
