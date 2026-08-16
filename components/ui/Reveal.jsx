'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades and lifts its children in the first time they scroll into view.
 *
 * Implemented with IntersectionObserver plus two CSS rules (see base.css)
 * rather than an animation library — it is a fraction of the weight and the
 * `prefers-reduced-motion` block in base.css disables it automatically.
 *
 * @param {number} delay  ms to stagger this element behind its siblings
 * @param {string} as     element to render (section, li, article...)
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  threshold = 0.15,
  className = '',
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Server-rendered content should never stay hidden if the browser has no
    // IntersectionObserver — show it immediately instead.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? 'in' : 'out'}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
