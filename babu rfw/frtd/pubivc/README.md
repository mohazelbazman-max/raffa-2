# Nestora storefront demo

Open `index.html` in a modern browser. No build step or local server is required. Google Fonts and the Unsplash image URLs need an internet connection; the layout remains usable if those remote assets are unavailable.

## Project structure

```text
pubivc/
├── index.html
├── README.md
└── src/
	├── app.js
	├── store.js
	├── components/
	│   ├── bakery-page.js
	│   └── product-grid.js
	├── data/
	│   ├── bakery-products.js
	│   └── catalog.js
	├── styles/
	│   ├── bakery.css
	│   └── main.css
	└── utils/
		└── format.js
```

Bakery is part of the same hash-routed application at `#/bakery`. Its theme and shopping bag are isolated from Nestora, and the bakery header links back to the Nestora home route.

## Demo behavior

- The 12 sample products, categories, and collections live in `src/data/catalog.js`.
- Bakery's seven sample products live in `src/data/bakery-products.js`; bakery markup and its demo-only cart/newsletter behavior live in `src/components/bakery-page.js`.
- Bakery cart data uses the separate `bakey-cart` localStorage key.
- Cart and wishlist persistence is isolated in `src/store.js`; shared display formatting lives in `src/utils/format.js`; reusable product cards and grids live in `src/components/product-grid.js`.
- Route rendering and page interactions live in `src/app.js`; design tokens and responsive styles are in `src/styles/main.css`.
- Cart and wishlist are stored in browser `localStorage` under `nestora-cart` and `nestora-wishlist`.
- Shipping is estimated at $6 below $50 and complimentary at or above $50. This is a demo rule, not a configured carrier rate.
- Checkout only displays a local confirmation. It does not charge a payment method, reserve stock, or create an order.
- Account, contact, and newsletter forms do not send or retain submitted personal data.
- Customer counts and testimonials are not shown because no verified customer data was provided.

## Production integration points

Replace the sample catalog with a server-owned product and inventory API. Recalculate price, discounts, tax, and shipping on the server when creating an order. Connect checkout to a payment provider using server-side credentials and verified webhooks. Add an authentication provider before enabling accounts. Connect newsletter and contact forms to approved services, then configure real business policies and contact information before publishing.