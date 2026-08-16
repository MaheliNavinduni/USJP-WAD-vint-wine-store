# VINT — Homemade Wine Ordering Web Application

VINT is a small Sri Lankan estate that makes homemade wine by hand. This repository holds the
**frontend** of the VINT web application: the public storefront and the admin management screens.

Built with **Next.js (App Router) + React + plain CSS**.

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (run this before pushing — it catches errors) |
| `npm run start` | Serve the production build locally |

---

## What is in scope

There is **no login, no registration, no customer account and no online payment gateway**. This is
deliberate — it is how the business actually operates.

Customers order as guests. The flow is:

```
Home → Collection → Product Details → Place Order → Order Confirmation
```

The team then contacts the customer directly to confirm availability, delivery and payment.

---

## Routes

### Public

| Route | Page |
| --- | --- |
| `/` | Home |
| `/collection` | Wine collection with working category filters |
| `/wines/[slug]` | Product details — one component, four wines |
| `/wine-glasses` | Wine glass collection |
| `/our-story` | Our story |
| `/contact` | Contact us, with a live map of the estate |
| `/order` | Place your order (accepts `?product=slug&qty=n`) |
| `/order-confirmation` | Order received |

### Admin

| Route | Page |
| --- | --- |
| `/admin/dashboard` | Metrics, recent orders, inventory overview |
| `/admin/products` | Product management |
| `/admin/products/new` | Add product |
| `/admin/products/[id]/edit` | Edit product |
| `/admin/orders` | Orders table with status filters |
| `/admin/orders/[id]` | Order details, with status update |
| `/admin/messages` | Contact Us submissions |

> The admin screens are frontend only. They read from `data/orders.js` and `data/messages.js` and
> keep changes in local React state, so a refresh restores the sample rows. Swap those imports for
> API calls when the backend exists — no component needs to change.

---

## Project structure

```
app/
  layout.js               Root layout: fonts + global stylesheets
  not-found.jsx           404 page
  (public)/               Route group — shares the navbar + footer
    layout.jsx
    page.jsx              Home
    collection/
    wines/[slug]/
    wine-glasses/
    our-story/
    contact/
    order/
    order-confirmation/
  admin/                  Route group — dark sidebar shell instead
    layout.jsx
    dashboard/  products/  orders/  messages/

components/
  layout/                 Navbar, Footer, VintMark, SocialIcon
  sections/               HeroSection
  ui/                     Button, Reveal, Accordion, Modal, Toast, …
  form/                   FormInput, SelectInput, TextArea
  forms/                  ContactForm, OrderForm
  wine/                   WineCard, CollectionGrid, ProductDetails, FlavourProfile
  order/                  OrderSummary, OrderConfirmation
  admin/                  AdminSidebar, tables, ProductForm

data/                     ← all content lives here
styles/                   ← all CSS lives here
public/images/            wines, glasses, heroes, pairings, story
scripts/                  placeholder-artwork generator
```

`(public)` and `admin` are **Next.js route groups** — the brackets are not part of any URL. They
exist so the public pages and the admin pages can use two completely different layouts.

---

## Where to change things

**Content, prices, product info** → `data/`. Nothing about a wine is typed into a component.

| File | Holds |
| --- | --- |
| `data/products.js` | The four wines: prices, flavour percentages, ingredients, pairings |
| `data/glassware.js` | The three glass sets and the quality cards |
| `data/site.js` | Navigation, address, email, socials, value props |
| `data/catalogue.js` | Wines + glassware merged, used by the order form |
| `data/orders.js` | Sample admin orders |
| `data/messages.js` | Sample contact submissions |

**Colours, spacing, fonts** → `styles/tokens.css`. Every value on the site is a CSS variable there.
Change `--vint-burgundy` once and it updates everywhere.

| File | Holds |
| --- | --- |
| `styles/tokens.css` | Colours, spacing, radii, shadows, type scale, motion |
| `styles/base.css` | Reset, typography, containers, accessibility, reduced motion |
| `styles/layout.css` | Navbar + footer |
| `styles/hero.css` | The shared hero section |
| `styles/components.css` | Buttons, cards, forms, badges, accordion, modal, toast |
| `styles/pages.css` | Page-specific layouts |
| `styles/admin.css` | Admin area |

---

## Two decisions worth knowing about

**1. Wine categories follow the ingredients.**
The design files disagreed with each other about which wine belonged to which category. The mapping
in `data/products.js` follows the ingredients text on each product, which lines the four wines up
exactly with the four category pills:

| Wine | Category | Price |
| --- | --- | --- |
| Heritage Red | Strawberry Wine | Rs. 2,800 |
| Classic Blanc | White Wine | Rs. 2,900 |
| Estate Grape | Red Wine | Rs. 2,500 |
| Island King | King Coconut Wine | Rs. 3,200 |

If the business disagrees, change `type` and `typeSlug` in `data/products.js` — the filters, badges
and admin tables all follow automatically.

**2. Glassware is priced in Rupees.**
The designs showed glassware in USD while every wine was in Rupees. `data/glassware.js` carries the
same relative pricing over in Rs so the site uses one currency. Adjust the `price` values there if
the real figures differ.

---

## Images

Real product photography is already in place for all four bottles and all three glass sets.

Everything below is a **generated placeholder** — on-brand, but not a photograph. Drop a real image
in at the same path to replace it (a `.jpg` is fine, just update the path in the page):

```
public/images/heroes/collection-hero.svg
public/images/heroes/story-hero.svg
public/images/heroes/contact-hero.svg
public/images/heroes/order-hero.svg
public/images/heroes/confirmation-hero.svg
public/images/heroes/glasses-cta.svg
public/images/pairings/*.svg          (10 food pairing tiles)
public/images/story/story-{1,2,3}.svg (Our Story gallery)
```

Regenerate them any time with:

```bash
node scripts/generate-placeholders.mjs
```

The two supplied hero photographs (`heroes/home-hero.png`, `heroes/glasses-hero.png`) are real.
The home hero photo is mirrored in the original file, so the hero flips it back with CSS —
that is what `flipImage` does on the home page.

---

## Accessibility

The site is built to be usable without a mouse and without sight:

- semantic landmarks, one `<h1>` per page, skip-to-content link
- every form control has a real `<label>`; errors are announced via `aria-describedby`
- visible focus rings on keyboard navigation only
- the modal traps Escape, locks scroll and restores focus
- all motion is disabled under `prefers-reduced-motion`

Please keep these when adding features.

---

## Working as a team

The `main` branch should always build. Work on a branch, then open a pull request.

```bash
git checkout main
git pull
git checkout -b feature/your-name-what-you-are-doing
```

Commit as you go:

```bash
git add .
git commit -m "feat: short description of what you did"
```

Push and open a pull request:

```bash
git push -u origin feature/your-name-what-you-are-doing
```

Before you push, always run:

```bash
npm run build
```

If it fails, fix it first — that keeps `main` healthy for everyone else.

---

## Tech notes

- **Next.js 16** App Router, React 19
- **Plain CSS** with custom properties — no Tailwind, no CSS-in-JS
- **lucide-react** for icons (brand marks are drawn inline; lucide v1 removed them)
- **framer-motion** used in exactly one place: `components/wine/CollectionGrid.jsx`, where filtered
  cards need to animate *out*. Everything else is CSS transitions plus a small IntersectionObserver
  helper (`components/ui/Reveal.jsx`), which is far lighter.
