'use client';

import { FlaskConical } from 'lucide-react';
import { flavourLabel } from '@/data/products';
import Reveal from '@/components/ui/Reveal';

const ROWS = [
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'acidity', label: 'Acidity' },
  { key: 'body', label: 'Body' },
  { key: 'fruitiness', label: 'Fruitiness' },
];

/**
 * Animated flavour bars.
 *
 * Each bar's width comes straight from the product data as a percentage and is
 * passed down as the `--fill` custom property. The bars sit at 0 until Reveal
 * marks the block visible, then grow to their stored value (see components.css).
 */
export default function FlavourProfile({ flavour }) {
  return (
    <Reveal className="vint-flavour" threshold={0.3}>
      <p className="vint-flavour__title">
        <FlaskConical size={14} aria-hidden="true" />
        Flavour Profile
      </p>

      {ROWS.map(({ key, label }) => {
        const value = flavour[key] ?? 0;
        return (
          <div className="vint-flavour__row" key={key}>
            <span className="vint-flavour__label">{label}</span>
            <div
              className="vint-flavour__track"
              role="meter"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${label}: ${flavourLabel(key, value)}`}
            >
              <span className="vint-flavour__fill" style={{ '--fill': `${value}%` }} />
            </div>
            <span className="vint-flavour__value">{flavourLabel(key, value)}</span>
          </div>
        );
      })}
    </Reveal>
  );
}
