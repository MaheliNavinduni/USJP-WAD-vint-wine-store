'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Wine } from 'lucide-react';

import WineCard from '@/components/wine/WineCard';
import { WINE_CATEGORIES, products } from '@/data/products';

/**
 * The filterable wine grid.
 *
 * Framer Motion is used here (and only here) because cards need to animate
 * *out* when a filter removes them — something CSS transitions cannot do once
 * the element has already left the DOM.
 */
export default function CollectionGrid() {
  const [active, setActive] = useState('all');
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.typeSlug === active)),
    [active],
  );

  return (
    <>
      <div className="vint-filters" role="group" aria-label="Filter wines by type">
        {WINE_CATEGORIES.map((category) => {
          const isActive = active === category.slug;
          return (
            <button
              key={category.slug}
              type="button"
              className={`vint-filter${isActive ? ' vint-filter--active' : ''}`}
              onClick={() => setActive(category.slug)}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p className="vint-collection-count" aria-live="polite">
        Showing {visible.length} of {products.length} wines
      </p>

      <div className="vint-collection-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.id}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <WineCard product={product} layout="wide" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <div className="vint-empty">
          <Wine size={36} aria-hidden="true" />
          <p>No wines in this category yet — check back soon.</p>
        </div>
      )}
    </>
  );
}
