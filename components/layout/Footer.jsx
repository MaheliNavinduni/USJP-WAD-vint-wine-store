import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from '@/data/site';
import SocialIcon from '@/components/layout/SocialIcon';

export default function Footer() {
  return (
    <footer className="vint-footer">
      <div className="vint-container">
        <div className="vint-footer__top">
          <div>
            <span className="vint-footer__wordmark">{SITE.name}</span>
            <p className="vint-footer__tagline">{SITE.tagline}</p>
          </div>

          <div>
            <h2 className="vint-footer__heading">Navigation</h2>
            <ul className="vint-footer__list">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="vint-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="vint-footer__heading">Visit &amp; Contact</h2>
            <address className="vint-footer__contact">
              <span style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </span>
              <span style={{ display: 'flex', gap: '0.5rem' }}>
                <Mail size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }} />
                <a href={`mailto:${SITE.email}`} className="vint-footer__link">
                  {SITE.email}
                </a>
              </span>
            </address>
          </div>
        </div>

        <div className="vint-footer__bottom">
          <p className="vint-footer__copy">
            © {SITE.established} {SITE.name} Estate. All rights reserved.
          </p>

          <ul className="vint-footer__socials">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.icon}>
                <a
                  href={social.href}
                  className="vint-footer__social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${social.label}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
