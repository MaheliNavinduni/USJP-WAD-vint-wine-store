'use client';

import { Minus, Plus } from 'lucide-react';

/**
 * Controlled − 1 + stepper.
 * The live region means screen readers announce the new quantity on change.
 */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
}) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="vint-qty" role="group" aria-label={label}>
      <button
        type="button"
        className="vint-qty__btn"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>

      <span className="vint-qty__value" aria-live="polite">{value}</span>

      <button
        type="button"
        className="vint-qty__btn"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
