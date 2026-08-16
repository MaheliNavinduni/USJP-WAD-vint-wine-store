'use client';

import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

/** Brief confirmation message; disappears on its own after `duration`. */
export default function Toast({ message, variant = 'success', duration = 3200, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className={`vint-toast vint-toast--${variant}`} role="status" aria-live="polite">
      <CheckCircle2 size={18} aria-hidden="true" />
      {message}
    </div>
  );
}
