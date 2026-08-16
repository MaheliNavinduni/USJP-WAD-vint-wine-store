'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Expand/collapse panel used on the product detail page.
 *
 * The open/close animation uses a `grid-template-rows: 0fr -> 1fr` transition,
 * which animates smoothly without needing to measure the content height.
 */
export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className="vint-accordion">
      <h3>
        <button
          type="button"
          id={triggerId}
          className="vint-accordion__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
        >
          {title}
          <ChevronDown className="vint-accordion__chevron" size={22} aria-hidden="true" />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`vint-accordion__panel${open ? ' vint-accordion__panel--open' : ''}`}
      >
        <div className="vint-accordion__panel-inner">
          <div className="vint-accordion__content">{children}</div>
        </div>
      </div>
    </div>
  );
}
