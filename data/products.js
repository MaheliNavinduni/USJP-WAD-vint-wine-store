/**
 * VINT — central product data source.
 *
 * Every page (Home, Collection, Product Details, Order, Admin) reads from this
 * file. Nothing about a wine should ever be typed into a component directly.
 *
 * NOTE ON CATEGORIES
 * The Figma screens disagreed with each other about which wine belonged to which
 * category. The mapping below follows the *ingredients* text on each detail
 * screen, which lines the four wines up exactly with the four category pills:
 *   - Heritage Red  -> made with fresh strawberries -> Strawberry Wine
 *   - Classic Blanc -> made from white grapes       -> White Wine
 *   - Estate Grape  -> made from red grapes         -> Red Wine
 *   - Island King   -> made from king coconut water -> King Coconut Wine
 * If the business disagrees, change `type`/`typeSlug` here and the whole site
 * (filters, badges, admin tables) follows automatically.
 */

export const CURRENCY = 'Rs.';

/** Category pills used by the Collection page filter bar. */
export const WINE_CATEGORIES = [
  { label: 'All', slug: 'all' },
  { label: 'Red Wine', slug: 'red-wine' },
  { label: 'White Wine', slug: 'white-wine' },
  { label: 'Strawberry Wine', slug: 'strawberry-wine' },
  { label: 'King Coconut Wine', slug: 'king-coconut-wine' },
];

/** Shared pairing tiles. Swap the `image` paths for real photography later. */
const PAIRING = {
  steak: { name: 'Perfectly Cooked Steak', image: '/images/pairings/steak.svg' },
  roastChicken: { name: 'Roast Chicken', image: '/images/pairings/roast-chicken.svg' },
  darkChocolate: { name: 'Dark Chocolate', image: '/images/pairings/dark-chocolate.svg' },
  agedGouda: { name: 'Aged Gouda', image: '/images/pairings/aged-gouda.svg' },
  freshBerries: { name: 'Fresh Berries', image: '/images/pairings/fresh-berries.svg' },
  seafood: { name: 'Grilled Seafood', image: '/images/pairings/seafood.svg' },
  softCheese: { name: 'Soft Cheeses', image: '/images/pairings/soft-cheese.svg' },
  tropicalFruit: { name: 'Tropical Fruit', image: '/images/pairings/tropical-fruit.svg' },
  spicedCurry: { name: 'Spiced Curry', image: '/images/pairings/spiced-curry.svg' },
  darkBerryTart: { name: 'Berry Tart', image: '/images/pairings/berry-tart.svg' },
};

export const products = [
  {
    id: 'w-001',
    slug: 'heritage-red',
    name: 'Heritage Red',
    type: 'Strawberry Wine',
    typeSlug: 'strawberry-wine',
    price: 2800,
    volume: '750ml',
    alcohol: '12.5%',
    vintage: '2023',
    origin: 'Avissawella, Sri Lanka',
    stock: 24,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/heritage-red.png',
    imageAlt: 'VINT Heritage Red bottle with a black and gold label',
    tagline: 'Rich strawberry notes with a smooth, refreshing finish.',
    description:
      'Rich strawberry notes with a smooth and refreshing finish. An elegant expression of our finest fruit, pressed at the peak of the season.',
    longDescription:
      'Our Heritage Red is built from strawberries picked at full ripeness and fermented slowly in small batches. The result is a wine that keeps the brightness of fresh fruit while gaining the depth and roundness of a proper table red — generous on the nose, soft through the middle, and clean on the finish.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made with fresh strawberries, sugar, water, and yeast. Strawberry wine is a fruit-based wine enjoyed around the world, inspired by traditional fruit-winemaking practices carried through generations of home cellars.',
    servingSuggestions: {
      foodPairings:
        'Beautiful alongside desserts and soft cheeses. Ideal with berry tarts, dark chocolate, or a simple plate of fresh fruit after dinner.',
      temperature:
        'Serve at 60-65°F (15-18°C). Give it a short rest after opening to let the fruit come forward.',
    },
    pairings: [PAIRING.darkChocolate, PAIRING.freshBerries, PAIRING.softCheese, PAIRING.darkBerryTart],
  },
  {
    id: 'w-002',
    slug: 'classic-blanc',
    name: 'Classic Blanc',
    type: 'White Wine',
    typeSlug: 'white-wine',
    price: 2900,
    volume: '750ml',
    alcohol: '11.5%',
    vintage: '2023',
    origin: 'Avissawella, Sri Lanka',
    stock: 18,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/classic-blanc.png',
    imageAlt: 'VINT Classic Blanc white wine bottle with a cream label',
    tagline: 'Bright and aromatic, with zesty citrus and white floral notes.',
    description:
      'Bright and aromatic with zesty citrus and delicate white floral aromas. A crisp, mineral-driven palate that refreshes the soul.',
    longDescription:
      'Classic Blanc is our lightest expression — pressed gently, fermented cool, and bottled early to hold on to its aromatics. Expect lime zest and orange blossom on the nose, a taut and clean palate, and a dry finish that makes it an easy partner for food.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made from white grapes, sugar, water, and yeast. White wine has a long history in European winemaking regions, especially France, Italy, and Germany, and remains the most food-friendly style in any cellar.',
    servingSuggestions: {
      foodPairings:
        'A natural match for lighter dishes. Excellent with grilled seafood, roast chicken, fresh salads, or young, creamy cheeses.',
      temperature:
        'Serve at 60-65°F (15-18°C). No decanting needed — this wine is at its best shortly after it is poured.',
    },
    pairings: [PAIRING.seafood, PAIRING.roastChicken, PAIRING.softCheese, PAIRING.tropicalFruit],
  },
  {
    id: 'w-003',
    slug: 'estate-grape',
    name: 'Estate Grape',
    type: 'Red Wine',
    typeSlug: 'red-wine',
    price: 2500,
    volume: '750ml',
    alcohol: '13.0%',
    vintage: '2022',
    origin: 'Avissawella, Sri Lanka',
    stock: 31,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/estate-grape.png',
    imageAlt: 'VINT Estate Grape wine bottle with a deep plum label',
    tagline: 'Deep crimson, with dark cherry, cedar and a velvety finish.',
    description:
      'Deep crimson with profound layers of dark cherry, cedar, and subtle spice. A robust and velvety finish that rewards a slow evening.',
    longDescription:
      'Rich, bold, and full of character, Estate Grape offers a smooth blend of fruity flavours with a warm, satisfying finish. It is the most structured wine we make — fermented on the skins for colour and grip, then rested until the tannins soften. Perfect for relaxing evenings, special occasions, or pairing with your favourite meals.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made from red grapes, sugar, water, and yeast. Red wine has its origins in ancient winemaking traditions, particularly in European regions such as France, Italy, and Spain, where skin contact gives the wine its colour and structure.',
    servingSuggestions: {
      foodPairings:
        'Perfectly complements rich, savoury dishes. Ideal with roasted lamb, aged gouda, grilled steak, or dark chocolate desserts.',
      temperature:
        'Serve at 60-65°F (15-18°C). Decant for at least 30 minutes before serving to allow the complex aromas to open fully.',
    },
    pairings: [PAIRING.steak, PAIRING.roastChicken, PAIRING.darkChocolate, PAIRING.agedGouda],
  },
  {
    id: 'w-004',
    slug: 'island-king',
    name: 'Island King',
    type: 'King Coconut Wine',
    typeSlug: 'king-coconut-wine',
    price: 3200,
    volume: '750ml',
    alcohol: '10.5%',
    vintage: '2023',
    origin: 'Avissawella, Sri Lanka',
    stock: 12,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/island-king.png',
    imageAlt: 'VINT Island King coconut wine bottle with a golden hue',
    tagline: 'A tropical expression — crisp, lightly sweet, unmistakably Sri Lankan.',
    description:
      'A unique tropical expression. Crisp and lightly sweet with vibrant notes of fresh king coconut and a clean, cooling finish.',
    longDescription:
      'Island King is the wine we are proudest of. Made from Sri Lankan king coconut water, it is inspired by the tropical heritage of the island and offers a naturally refreshing, fruity character you will not find anywhere else. Delicate, golden, and best shared on a warm evening.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made from Sri Lankan king coconut water, sugar, and yeast. King coconut wine is inspired by the tropical heritage of Sri Lanka and offers a naturally refreshing and fruity character unique to the island.',
    servingSuggestions: {
      foodPairings:
        'Made for island food. Try it with spiced curries, grilled seafood, tropical fruit, or simply on its own over ice on a warm evening.',
      temperature:
        'Serve at 60-65°F (15-18°C). Best enjoyed within a day of opening while the aromatics are at their brightest.',
    },
    pairings: [PAIRING.spicedCurry, PAIRING.seafood, PAIRING.tropicalFruit, PAIRING.freshBerries],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getFeaturedProducts(limit = 3) {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return products;
  return products.filter((product) => product.typeSlug === categorySlug);
}

/** Formats 2800 as "Rs. 2,800". */
export function formatPrice(value) {
  return `${CURRENCY} ${Number(value).toLocaleString('en-LK')}`;
}

/**
 * Turns a 0-100 flavour value into the word shown beside the bar.
 *
 * Body uses the proper wine vocabulary (Light through Full) rather than the
 * Low/High scale the other three attributes use — "Full body" is the term the
 * designs use and the one a wine drinker expects.
 */
const INTENSITY_SCALE = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High'];
const BODY_SCALE = ['Light', 'Medium-Light', 'Medium', 'Medium-Full', 'Full'];

function band(value) {
  if (value >= 80) return 4;
  if (value >= 62) return 3;
  if (value >= 45) return 2;
  if (value >= 28) return 1;
  return 0;
}

export function flavourLabel(key, value) {
  const scale = key === 'body' ? BODY_SCALE : INTENSITY_SCALE;
  return scale[band(value)];
}
