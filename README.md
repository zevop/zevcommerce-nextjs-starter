# ZevCommerce Next.js Starter

A production-ready ecommerce storefront built with **Next.js 16**, **Tailwind CSS v4**, and the **ZevCommerce Storefront SDK**. Designed for fashion & lifestyle brands — works out of the box with demo data, and connects seamlessly to your ZevCommerce backend when you're ready.

## Features

- **Demo mode** — Browse the full storefront with built-in mock data, no backend required
- **Live mode** — Connect your ZevCommerce store with a single env variable
- **22 pages** — Home, products, collections, cart, checkout, auth, account dashboard, blog, CMS pages, search, 404
- **Mobile-first** — Responsive layouts, touch-friendly controls, slide-out drawers
- **Full customer account** — Orders, addresses, profile, change password
- **Multi-step checkout** — Address → shipping rates → payment methods → confirmation
- **Headless payments** — Bank transfer, cash, ZevPay — displays payment instructions from your API
- **Search** — Products, collections, pages, and articles
- **Cart drawer** — Slide-out cart accessible from any page

## Quick Start

```bash
# Clone the repository
git clone https://github.com/IntechNG/zevcommerce-nextjs-starter.git
cd zevcommerce-nextjs-starter

# Install dependencies
npm install

# Start the dev server (demo mode by default)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the full storefront running with demo data.

## Connect Your Store

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Add your credentials in `.env.local`:

```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_ZEV_STOREFRONT_KEY=your_public_key_here
NEXT_PUBLIC_ZEV_ENDPOINT=https://your-store.zevcommerce.com/graphql/v1
NEXT_PUBLIC_STORE_ORIGIN=https://www.your-storefront.com
```

3. Restart the dev server — the storefront now fetches live data from your ZevCommerce backend.

### Where to find your credentials

| Variable | Location |
|---|---|
| `NEXT_PUBLIC_ZEV_STOREFRONT_KEY` | Dashboard → Settings → Headless / API → Keys |
| `NEXT_PUBLIC_ZEV_ENDPOINT` | Dashboard → Settings → Headless / API → Endpoint URL |
| `NEXT_PUBLIC_STORE_ORIGIN` | The origin URL you configured for your public key |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── products/           # Product listing & detail
│   ├── collections/        # Collection listing & detail
│   ├── cart/               # Cart page
│   ├── checkout/           # Multi-step checkout
│   ├── auth/               # Login, register, forgot/reset password
│   ├── account/            # Customer dashboard (orders, addresses, profile, security)
│   ├── search/             # Search results
│   ├── blog/               # Blog listing & article detail
│   └── pages/              # CMS content pages
├── components/
│   ├── analytics/          # LiveTracker (real-time visitor tracking)
│   ├── layout/             # Header, Footer, MobileNav, DemoBanner
│   ├── product/            # ProductCard, ImageGallery, VariantSelector, etc.
│   ├── collection/         # CollectionCard, CollectionGrid
│   ├── cart/               # CartDrawer, CartItem, CartSummary, DiscountCode
│   ├── checkout/           # CheckoutSteps, AddressForm
│   ├── account/            # OrderCard, AddressCard, ProfileForm
│   ├── home/               # HeroSection, FeaturedProducts, ValueProps
│   └── ui/                 # Button, Input, Badge, Modal, Toast, Skeleton, etc.
├── contexts/               # React Context providers (Cart, Auth, Store, Toast)
├── lib/
│   ├── api/                # Data access layer (demo fallback + live SDK calls)
│   ├── zev-client.ts       # SDK client initialization
│   ├── demo-mode.ts        # isDemoMode() utility
│   ├── utils.ts            # formatPrice, formatDate, cn()
│   └── constants.ts        # Route paths, storage keys
└── data/mock/              # Static demo data (products, collections, orders, etc.)
```

## Architecture

### Demo Mode vs Live Mode

Every data-fetching function in `src/lib/api/` follows this pattern:

```typescript
export async function getProducts() {
    if (isDemoMode()) return mockProducts;
    return zevClient.products.list();
}
```

- **Demo mode** (`NEXT_PUBLIC_DEMO_MODE=true`): Returns static mock data — no network requests
- **Live mode**: Calls the ZevCommerce Storefront SDK which hits your backend API

### Server vs Client Components

- **Server components**: Product pages, collection pages, blog, CMS pages — data fetched at the page level
- **Client components**: Cart, checkout, auth forms, account dashboard — interactive, state-managed

### State Management

| State | Storage | Provider |
|---|---|---|
| Cart | localStorage (`zev_cart_id`, `zev_cart_token`) | `CartContext` |
| Auth | localStorage (`zev_customer_token`) | `AuthContext` |
| Store config | Fetched once in root layout | `StoreContext` |
| Toast notifications | In-memory | `ToastContext` |

## SDK Methods Used

This starter uses all modules from `@zevcommerce/storefront`:

| Module | Methods | Pages |
|---|---|---|
| Products | `list`, `getBySlug` | Products listing, product detail |
| Collections | `list`, `getByHandle` | Collections listing, collection detail |
| Cart | `create`, `get`, `addItem`, `updateItem`, `removeItem` | Cart, cart drawer |
| Checkout | `cartCheckout`, `cartQuote`, `validateDiscount` | Checkout |
| Auth | `login`, `register`, `forgotPassword`, `resetPassword` | Auth pages |
| Customer | `getProfile`, `updateProfile`, `getOrders`, `getAddresses`, `addAddress`, `updateAddress`, `deleteAddress`, `changePassword` | Account dashboard |
| Search | `search` | Search page |
| Content | `getPages`, `getPage`, `getBlogs`, `getArticles` | CMS pages, blog |
| Storefront | `getConfig`, `getShippingRates`, `getPaymentMethods` | Layout, checkout |
| Analytics | `startPageTracking`, `stopHeartbeat`, `trackPageView` | All pages (via LiveTracker) |

## Analytics (Live View)

This starter includes built-in real-time analytics tracking powered by the SDK's `analytics` module. When connected to a live ZevCommerce backend, every page view is tracked and visible in the dashboard under **Analytics → Live View**.

### How it works

The `<LiveTracker />` component in `src/components/analytics/LiveTracker.tsx` is included in the root layout. It:

1. Sends a page view event on every route change
2. Sends a 30-second heartbeat to keep the session alive
3. Automatically stops when the user leaves the page
4. Does nothing in demo mode

### No configuration needed

Analytics tracking uses the same API key and endpoint you already configured for the storefront. The tracking endpoint lives on the same domain as the GraphQL API — no additional env variables required.

### Disabling analytics

Remove the `<LiveTracker />` component from `src/app/layout.tsx` to disable tracking entirely.

## Customization

### Theme Colors

Edit the CSS custom properties in `src/app/globals.css` under `@theme`:

```css
@theme {
    --color-brand: #0f172a;        /* Primary brand color */
    --color-brand-50: #f8fafc;     /* Light brand tint */
    --color-surface: #ffffff;       /* Page background */
    --color-text-primary: #0f172a;  /* Main text */
    --color-text-secondary: #64748b; /* Muted text */
}
```

### Currency

Default currency is NGN. Change it in `src/lib/utils.ts`:

```typescript
export function formatPrice(amount: number, currency: string = 'USD') {
```

### Demo Data

Edit the mock data files in `src/data/mock/` to match your brand — products, collections, blog articles, pages.

## Deployment

### Vercel (recommended)

```bash
npm run build   # Verify the build passes
vercel deploy    # Deploy to Vercel
```

Set your environment variables in the Vercel dashboard under Project Settings → Environment Variables.

### Other platforms

Any platform that supports Node.js 18+ and Next.js works. Set the same environment variables from `.env.example`.

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [@zevcommerce/storefront](https://www.npmjs.com/package/@zevcommerce/storefront) — ZevCommerce Storefront SDK
- [lucide-react](https://lucide.dev/) — Icons
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) — Class utilities
- TypeScript strict mode

## License

MIT
