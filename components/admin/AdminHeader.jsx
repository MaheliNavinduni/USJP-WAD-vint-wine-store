import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

/** Page title bar shared by every admin screen. */
export default function AdminHeader({ title, subtitle, action, backHref, backLabel }) {
  return (
    <header className="vint-admin-header">
      <div>
        {backHref && (
          <Link href={backHref} className="vint-admin-back">
            <ChevronLeft size={16} aria-hidden="true" />
            {backLabel ?? 'Back'}
          </Link>
        )}
        <h1 className="vint-admin-header__title">{title}</h1>
        {subtitle && <p className="vint-admin-header__sub">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
