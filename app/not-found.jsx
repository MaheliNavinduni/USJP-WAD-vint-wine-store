import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Button from '@/components/ui/Button';
import VintMark from '@/components/layout/VintMark';

export const metadata = {
  title: 'Page not found',
};

/**
 * Root 404. It lives outside the (public) group, so it renders its own minimal
 * chrome rather than the full navbar and footer.
 */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--space-lg)',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-sm)' }}>
        <Link
          href="/"
          aria-label="VINT — home"
          style={{ color: 'var(--vint-burgundy)', marginBottom: 'var(--space-2xs)' }}
        >
          <VintMark size={40} />
        </Link>

        <span className="vint-eyebrow">Error 404</span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>This bottle is not in our cellar</h1>
        <p style={{ maxWidth: '46ch', color: 'var(--vint-text-muted)', fontSize: 'var(--text-lg)' }}>
          The page you were looking for does not exist. It may have moved, or the link may have been
          mistyped.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--space-sm)' }}>
          <Button href="/" variant="primary" icon={<ArrowRight size={16} />}>
            Back to Home
          </Button>
          <Button href="/collection" variant="outline">
            View the Collection
          </Button>
        </div>
      </div>
    </main>
  );
}
