/**
 * VINT — glassware collection.
 *
 * NOTE ON PRICING
 * The Figma screens showed these in USD ($145 / $210 / $380) while every wine
 * was priced in Rupees. To keep one currency across the site the same relative
 * pricing has been carried over in Rs. Adjust the `price` values here if the
 * business uses different figures — nothing else needs to change.
 */

export const glassware = [
  {
    id: 'g-001',
    slug: 'sommelier-series',
    name: 'The Sommelier Series',
    setSize: 'Set of 2',
    price: 14500,
    image: '/images/glasses/sommelier-series.png',
    imageAlt: 'Two tall stemmed VINT sommelier wine glasses on a marble surface',
    description:
      'A generous bowl crafted specifically to allow complex reds to breathe, enhancing the aromatic profile of bold vintages.',
  },
  {
    id: 'g-002',
    slug: 'heritage-crystal-set',
    name: 'The Heritage Crystal Set',
    setSize: 'Set of 4',
    price: 21000,
    image: '/images/glasses/heritage-crystal-set.png',
    imageAlt: 'Four slender VINT crystal wine glasses on a linen tablecloth',
    description:
      'Slender silhouettes designed to maintain crisp temperatures and direct delicate white varietals to the ideal tasting zone.',
  },
  {
    id: 'g-003',
    slug: 'varietal-tasting-set',
    name: 'Varietal Specific Tasting Set',
    setSize: 'Set of 6',
    price: 38000,
    image: '/images/glasses/varietal-tasting-set.png',
    imageAlt: 'A grid of six varietal-specific VINT tasting glasses',
    description:
      "The ultimate connoisseur's toolkit. Six distinct geometries meticulously calibrated to highlight the unique characteristics of world-class varietals.",
  },
];

/** The three "Uncompromising Quality" cards below the glassware grid. */
export const glasswareQualities = [
  {
    id: 'q-001',
    icon: 'hand',
    title: 'Artisanal Craftsmanship',
    body: 'Each piece in the VINT collection is meticulously hand-blown by master glassmakers using traditional techniques passed down through generations. This ensures a seamless, ultra-thin rim that allows the wine to flow effortlessly across the palate, removing any barrier between you and the vintage.',
    featured: true,
  },
  {
    id: 'q-002',
    icon: 'wind',
    title: 'Engineered for Aroma',
    body: 'The precise geometry of each bowl is calibrated to capture and direct specific volatile compounds, amplifying the bouquet of fine wines.',
  },
  {
    id: 'q-003',
    icon: 'gem',
    title: 'Enduring Brilliance',
    body: 'Formulated with advanced lead-free crystal, offering extraordinary clarity while maintaining the durability required for dishwasher safety.',
  },
];

export function getGlasswareBySlug(slug) {
  return glassware.find((item) => item.slug === slug) ?? null;
}
