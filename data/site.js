/**
 * VINT — site-wide content: navigation, contact details, footer.
 * Change it here once and every page picks it up.
 */

export const SITE = {
  name: 'VINT',
  tagline: 'Crafted with passion. A taste worth sharing.',
  established: '2020',
  email: 'vintwine@gmail.com',
  address: {
    line1: 'D/47, 500 Housing Scheme Road, Kiriwandala',
    line2: 'Puwakpitiya, Avissawella',
    /** Used by the Contact page map embed. */
    query: 'Puwakpitiya, Avissawella, Sri Lanka',
  },
};

/** Main navigation — used by both the desktop navbar and the mobile menu. */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
];

export const FOOTER_LINKS = [
  { label: 'Collection', href: '/collection' },
  { label: 'Wine Glasses', href: '/wine-glasses' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
];

/** Subject options offered by the Contact form. */
export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Product Inquiry',
  'Order Inquiry',
];

/** "Why Choose VINT" — Home page. */
export const VALUE_PROPS = [
  {
    icon: 'award',
    title: 'Premium Quality',
    body: 'Sourced from the finest local produce, ensuring every pour is exceptional.',
  },
  {
    icon: 'heart',
    title: 'Crafted With Passion',
    body: 'Generations of expertise poured into every bottle we make by hand.',
  },
  {
    icon: 'glass',
    title: 'Elegant Experience',
    body: 'Designed to elevate your dining, your gatherings and your celebrations.',
  },
  {
    icon: 'truck',
    title: 'Trusted Service',
    body: 'Secure packaging and reliable delivery, confirmed personally by our team.',
  },
];

/** "Unrivaled Craftsmanship" — Our Story page. */
export const CRAFTSMANSHIP = [
  {
    icon: 'droplet',
    title: 'The Harvest',
    body: 'Hand-picked at the precise moment of ripeness, ensuring the delicate balance of acidity and sugar that defines every VINT bottle.',
  },
  {
    icon: 'tractor',
    title: 'The Soil',
    body: 'Our island earth provides the perfect foundation, offering profound minerality and structure to every batch we press.',
  },
  {
    icon: 'glass',
    title: 'The Cellar',
    body: 'Crafted and carefully matured in Sri Lanka, our wines develop a pleasant aroma, smooth taste, and unique character in every bottle.',
  },
];
