'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/data/site';
import Button from '@/components/ui/Button';
import VintMark from '@/components/layout/VintMark';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tighten the bar once the hero starts scrolling past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Never leave the mobile drawer hanging open after a navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`vint-nav${scrolled ? ' vint-nav--scrolled' : ''}`}>
      <nav className="vint-container" aria-label="Main navigation">
        <div className="vint-nav__inner">
          <Link href="/" className="vint-nav__brand" aria-label={`${SITE.name} — home`}>
            <span className="vint-nav__mark" aria-hidden="true">
              <VintMark size={24} />
            </span>
            <span className="vint-nav__wordmark">{SITE.name}</span>
          </Link>

          <ul className="vint-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`vint-nav__link${isActive(link.href) ? ' vint-nav__link--active' : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="vint-nav__actions">
            <Button href="/order" variant="outline" size="sm">
              Order
            </Button>

            <button
              type="button"
              className="vint-nav__toggle"
              aria-expanded={open}
              aria-controls="vint-mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="vint-mobile-menu"
          className={`vint-nav__drawer${open ? ' vint-nav__drawer--open' : ''}`}
        >
          <div className="vint-nav__drawer-inner">
            <ul className="vint-nav__drawer-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`vint-nav__drawer-link${isActive(link.href) ? ' vint-nav__drawer-link--active' : ''}`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    tabIndex={open ? 0 : -1}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="vint-nav__drawer-cta">
                <Button href="/order" variant="primary" block tabIndex={open ? 0 : -1}>
                  Order
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
