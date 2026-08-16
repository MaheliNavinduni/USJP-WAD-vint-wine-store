'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Package, ClipboardList, ExternalLink } from 'lucide-react';

import { SITE } from '@/data/site';
import VintMark from '@/components/layout/VintMark';

const LINKS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ClipboardList },
  { label: 'Customer Messages', href: '/admin/messages', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="vint-admin-sidebar">
      <div className="vint-admin-sidebar__brand">
        <span className="vint-admin-sidebar__mark" aria-hidden="true">
          <VintMark size={38} />
        </span>
        <div>
          <span className="vint-admin-sidebar__wordmark">{SITE.name}</span>
          <span className="vint-admin-sidebar__tag">Estate Admin</span>
        </div>
      </div>

      <nav className="vint-admin-sidebar__nav" aria-label="Admin navigation">
        {LINKS.map(({ label, href, icon: LinkIcon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`vint-admin-sidebar__link${active ? ' vint-admin-sidebar__link--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <LinkIcon size={18} strokeWidth={1.6} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="vint-admin-sidebar__footer">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <ExternalLink size={14} aria-hidden="true" />
          View public site
        </Link>
      </div>
    </aside>
  );
}
