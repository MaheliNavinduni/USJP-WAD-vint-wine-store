import { Playfair_Display, Manrope } from 'next/font/google';

// Stylesheets are imported here, in the root layout, because Next.js only
// allows global CSS at the top of the tree. Order matters: tokens first, then
// base, then everything that builds on them.
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/layout.css';
import '@/styles/hero.css';
import '@/styles/components.css';
import '@/styles/pages.css';
import '@/styles/admin.css';

/** Luxury editorial serif — hero headings, page titles, product names. */
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
});

/** Clean sans — navigation, forms, buttons, labels, body copy. */
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL('https://vint-wine.example'),
  title: {
    default: 'VINT — Handmade Wine, Crafted With Passion',
    template: '%s | VINT',
  },
  description:
    'VINT is a small Sri Lankan estate making homemade wine by hand. Explore our collection of four handcrafted wines and our glassware, and place an order directly with our team.',
  keywords: ['homemade wine', 'Sri Lanka wine', 'king coconut wine', 'VINT', 'Avissawella'],
  openGraph: {
    title: 'VINT — Handmade Wine, Crafted With Passion',
    description: 'A small curated collection of homemade wines, made by hand in Avissawella, Sri Lanka.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#430005',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
