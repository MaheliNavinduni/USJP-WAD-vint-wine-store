/**
 * Generates the placeholder artwork VINT uses wherever real photography has
 * not been supplied yet: hero backgrounds, curated-pairing tiles and the Our
 * Story gallery.
 *
 * They are SVGs drawn in the brand palette, so the site never shows a broken
 * image and nothing depends on an external CDN. Replace any of them with a real
 * photo at the same path (a .jpg works too — just update the path in the page).
 *
 * Run with:  node scripts/generate-placeholders.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PALETTE = {
  cream: '#f6f5d8',
  creamDeep: '#ededcf',
  ivory: '#f7f1e3',
  tan: '#ded2b8',
  burgundy: '#430005',
  burgundyMid: '#5b0b10',
  burgundyBright: '#7a1520',
  black: '#0d0d0d',
  gold: '#b08d34',
};

function write(relativePath, contents) {
  const target = resolve(ROOT, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents.trim(), 'utf8');
  console.log('  ✓', relativePath);
}

/* ------------------------------------------------------------------ */
/* Hero backgrounds — atmospheric burgundy light studies                */
/* ------------------------------------------------------------------ */

/**
 * Layered radial "light blooms" over a dark gradient. Sitting behind the hero's
 * burgundy overlay these read as depth and glow rather than as flat colour.
 */
function heroSvg({ id, blooms, silhouette }) {
  const bloomDefs = blooms
    .map(
      (bloom, index) => `
    <radialGradient id="${id}-bloom-${index}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${bloom.color}" stop-opacity="${bloom.opacity}" />
      <stop offset="100%" stop-color="${bloom.color}" stop-opacity="0" />
    </radialGradient>`,
    )
    .join('');

  const bloomShapes = blooms
    .map(
      (bloom, index) =>
        `<ellipse cx="${bloom.x}" cy="${bloom.y}" rx="${bloom.rx}" ry="${bloom.ry}" fill="url(#${id}-bloom-${index})" />`,
    )
    .join('\n    ');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img">
  <defs>
    <linearGradient id="${id}-base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.burgundy}" />
      <stop offset="55%" stop-color="${PALETTE.burgundyMid}" />
      <stop offset="100%" stop-color="${PALETTE.black}" />
    </linearGradient>${bloomDefs}
    <filter id="${id}-soft" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="42" />
    </filter>
    <filter id="${id}-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#${id}-base)" />

  <g filter="url(#${id}-soft)">
    ${bloomShapes}
  </g>

  <g opacity="0.16" fill="none" stroke="${PALETTE.gold}" stroke-width="2">
    ${silhouette}
  </g>

  <rect width="1600" height="900" filter="url(#${id}-grain)" opacity="0.05" />
</svg>`;
}

/** Simple bottle-and-glass outlines used as background silhouettes. */
const BOTTLE = (x, y, scale = 1) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-26 0h52v190a26 26 0 0 1-26 26 26 26 0 0 1-26-26Z" />
      <path d="M-9 0v-58a9 9 0 0 1 4-8h10a9 9 0 0 1 4 8V0Z" />
      <path d="M-26 96h52" />
    </g>`;

const GLASS = (x, y, scale = 1) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-34 0h68l-8 62a26 26 0 0 1-52 0Z" />
      <path d="M0 88v70" />
      <path d="M-26 158h52" />
    </g>`;

const HEROES = {
  'contact-hero': {
    blooms: [
      { x: 1080, y: 420, rx: 520, ry: 420, color: PALETTE.burgundyBright, opacity: 0.72 },
      { x: 260, y: 220, rx: 380, ry: 320, color: PALETTE.gold, opacity: 0.26 },
      { x: 700, y: 760, rx: 420, ry: 260, color: '#a03040', opacity: 0.3 },
    ],
    silhouette: [GLASS(1120, 360, 1.3), GLASS(1300, 400, 1.05), BOTTLE(960, 300, 1.05)].join(''),
  },
  'order-hero': {
    blooms: [
      { x: 820, y: 300, rx: 560, ry: 400, color: PALETTE.burgundyBright, opacity: 0.7 },
      { x: 1360, y: 700, rx: 380, ry: 300, color: PALETTE.gold, opacity: 0.3 },
    ],
    silhouette: [BOTTLE(1240, 340, 1.2), GLASS(1420, 440, 0.95)].join(''),
  },
  'confirmation-hero': {
    blooms: [
      { x: 800, y: 380, rx: 620, ry: 440, color: PALETTE.burgundyBright, opacity: 0.68 },
      { x: 400, y: 720, rx: 400, ry: 300, color: PALETTE.gold, opacity: 0.34 },
      { x: 1220, y: 200, rx: 340, ry: 300, color: '#c0392b', opacity: 0.26 },
    ],
    silhouette: [GLASS(700, 340, 1.35), GLASS(900, 340, 1.35)].join(''),
  },
  'glasses-cta': {
    blooms: [
      { x: 500, y: 400, rx: 520, ry: 420, color: PALETTE.burgundyBright, opacity: 0.8 },
      { x: 1200, y: 520, rx: 480, ry: 380, color: '#7d1d2a', opacity: 0.6 },
      { x: 900, y: 160, rx: 320, ry: 240, color: PALETTE.gold, opacity: 0.24 },
    ],
    silhouette: [GLASS(1180, 330, 1.4), GLASS(1380, 380, 1.1), BOTTLE(1000, 300, 1)].join(''),
  },
};

/* ------------------------------------------------------------------ */
/* Pairing tiles — warm illustrated food cards                          */
/* ------------------------------------------------------------------ */

const PAIRING_ART = {
  steak: `
    <path d="M-52 -26c22-18 62-22 86-6 26 17 26 47 6 62-22 17-64 18-88 3-22-14-22-44-4-59Z" />
    <path d="M-30 -12c14-9 38-11 52-3" />
    <path d="M-34 4c16-9 42-11 58-2" />
    <path d="M-30 20c14-8 36-10 50-3" />`,
  'roast-chicken': `
    <path d="M-16 -34a34 34 0 1 1 42 46l-30 34a20 20 0 0 1-32-4 20 20 0 0 1 6-28Z" />
    <path d="M-38 34c-10 8-24 8-30 0" />
    <path d="M-24 46c-8 10-22 12-30 6" />`,
  'dark-chocolate': `
    <rect x="-58" y="-38" width="116" height="76" rx="6" />
    <path d="M-20 -38v76M20 -38v76M-58 0h116" />`,
  'aged-gouda': `
    <path d="M-58 26 8-40h48v66Z" />
    <circle cx="12" cy="4" r="7" />
    <circle cx="-18" cy="14" r="5" />
    <circle cx="32" cy="-14" r="4" />`,
  'fresh-berries': `
    <circle cx="-22" cy="8" r="24" />
    <circle cx="22" cy="14" r="20" />
    <circle cx="2" cy="-24" r="18" />
    <path d="M2 -42c8-10 22-12 30-6" />`,
  seafood: `
    <path d="M-58 0c22-30 62-30 84 0-22 30-62 30-84 0Z" />
    <path d="M26 0c10-14 26-22 34-20-6 8-6 32 0 40-8 2-24-6-34-20Z" />
    <circle cx="-28" cy="-6" r="4" fill="currentColor" stroke="none" />`,
  'soft-cheese': `
    <path d="M-54 24 6-32l48 22-16 34Z" />
    <path d="M6 -32v28l32 18" />
    <circle cx="-16" cy="14" r="5" />`,
  'tropical-fruit': `
    <circle cx="0" cy="14" r="34" />
    <path d="M0 -20c-4-20 8-34 26-38-2 20-10 32-26 38Z" />
    <path d="M0 -20c4-18-8-30-26-33 2 18 10 28 26 33Z" />`,
  'spiced-curry': `
    <path d="M-56 -4h112a56 56 0 0 1-112 0Z" />
    <path d="M-56 -4h112" />
    <path d="M-22 -30c-8-10 8-16 0-28M10 -30c-8-10 8-16 0-28" />`,
  'berry-tart': `
    <path d="M-58 6h116a10 10 0 0 1-10 24H-48a10 10 0 0 1-10-24Z" />
    <circle cx="-26" cy="-10" r="12" />
    <circle cx="2" cy="-16" r="12" />
    <circle cx="30" cy="-8" r="12" />`,
};

function pairingSvg(key, label) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${key}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.ivory}" />
      <stop offset="100%" stop-color="${PALETTE.tan}" />
    </linearGradient>
    <radialGradient id="${key}-glow" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="300" fill="url(#${key}-bg)" />
  <rect width="400" height="300" fill="url(#${key}-glow)" />

  <g transform="translate(200 128)" fill="none" stroke="${PALETTE.burgundy}"
     stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.72"
     color="${PALETTE.burgundy}">
    ${PAIRING_ART[key]}
  </g>

  <text x="200" y="248" text-anchor="middle" font-family="Georgia, serif" font-size="21"
        fill="${PALETTE.burgundy}" opacity="0.85">${label}</text>
  <rect x="150" y="262" width="100" height="1.5" fill="${PALETTE.gold}" opacity="0.6" />
</svg>`;
}

const PAIRINGS = {
  steak: 'Perfectly Cooked Steak',
  'roast-chicken': 'Roast Chicken',
  'dark-chocolate': 'Dark Chocolate',
  'aged-gouda': 'Aged Gouda',
  'fresh-berries': 'Fresh Berries',
  seafood: 'Grilled Seafood',
  'soft-cheese': 'Soft Cheeses',
  'tropical-fruit': 'Tropical Fruit',
  'spiced-curry': 'Spiced Curry',
  'berry-tart': 'Berry Tart',
};

/* ------------------------------------------------------------------ */
/* Our Story gallery                                                    */
/* ------------------------------------------------------------------ */

function storySvg({ id, width, height, label, art, tint }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="${tint[0]}" />
      <stop offset="100%" stop-color="${tint[1]}" />
    </linearGradient>
    <radialGradient id="${id}-glow" cx="42%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${PALETTE.gold}" stop-opacity="0.42" />
      <stop offset="100%" stop-color="${PALETTE.gold}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#${id}-bg)" />
  <rect width="${width}" height="${height}" fill="url(#${id}-glow)" />

  <g transform="translate(${width / 2} ${height / 2})" fill="none" stroke="${PALETTE.ivory}"
     stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    ${art}
  </g>
</svg>`;
}

const STORY = [
  {
    id: 'story-1',
    width: 600,
    height: 800,
    label: 'Two glasses of wine on a table',
    tint: [PALETTE.burgundyMid, PALETTE.black],
    art: `${GLASS(-70, -110, 1.1)}${GLASS(70, -90, 1.25)}`,
  },
  {
    id: 'story-2',
    width: 900,
    height: 520,
    label: 'A toast between friends',
    tint: [PALETTE.burgundyBright, PALETTE.burgundy],
    art: `<g transform="rotate(-16)">${GLASS(-90, -130, 1.05)}</g><g transform="rotate(16)">${GLASS(90, -130, 1.05)}</g>`,
  },
  {
    id: 'story-3',
    width: 900,
    height: 520,
    label: 'Wine being poured from a bottle',
    tint: [PALETTE.black, PALETTE.burgundyMid],
    art: `<g transform="rotate(-28) translate(-120 -60)">${BOTTLE(0, -110, 1)}</g>${GLASS(120, -60, 1.15)}<path d="M-40 -70 60 -40" stroke-dasharray="6 10" />`,
  },
];

/* ------------------------------------------------------------------ */

console.log('Generating VINT placeholder artwork…');

Object.entries(HEROES).forEach(([name, config]) => {
  write(`public/images/heroes/${name}.svg`, heroSvg({ id: name, ...config }));
});

Object.entries(PAIRINGS).forEach(([key, label]) => {
  write(`public/images/pairings/${key}.svg`, pairingSvg(key, label));
});

STORY.forEach((entry) => {
  write(`public/images/story/${entry.id}.svg`, storySvg(entry));
});

console.log('Done. Replace any of these with real photography at the same path.');
