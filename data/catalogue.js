/**
 * Everything a customer can order, wines and glassware together, in one shape.
 * The order form and order summary both read from here so they can never
 * disagree about a price or a name.
 */

import { products } from '@/data/products';
import { glassware } from '@/data/glassware';

export const orderableItems = [
  ...products.map((product) => ({
    slug: product.slug,
    name: product.name,
    category: product.type,
    price: product.price,
    image: product.image,
    imageAlt: product.imageAlt,
    group: 'Wines',
    maxQuantity: Math.max(1, product.stock),
  })),
  ...glassware.map((item) => ({
    slug: item.slug,
    name: item.name,
    category: item.setSize,
    price: item.price,
    image: item.image,
    imageAlt: item.imageAlt,
    group: 'Glassware',
    maxQuantity: 20,
  })),
];

export function getOrderableItem(slug) {
  return orderableItems.find((item) => item.slug === slug) ?? null;
}

/** Groups items for an <optgroup>-style select. */
export function getOrderableGroups() {
  return ['Wines', 'Glassware'].map((group) => ({
    group,
    items: orderableItems.filter((item) => item.group === group),
  }));
}
