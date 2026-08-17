import { Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/forms/ContactForm';
import { SITE } from '@/data/site';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with VINT — questions about our homemade wines, orders, or a special occasion. Based in Puwakpitiya, Avissawella, Sri Lanka.',
};

/**
 * Google Maps embed for the estate. No API key required.
 *
 * Prefer coordinates: Google cannot geocode the house number here, so
 * searching the written address returns the surrounding area with no marker.
 * With coordinates it drops a pin on the exact spot and zooms in close.
 * Falling back to the locality at least resolves to the right neighbourhood.
 */
const { coordinates, locality, country } = SITE.address;
const MAP_QUERY = coordinates ?? `${locality}, ${country}`;
const MAP_ZOOM = coordinates ? 17 : 14;
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=${MAP_ZOOM}&output=embed`;

/** Opens the full Google Maps app or site at the estate, for directions. */
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  coordinates ?? `${locality}, ${country}`,
)}`;

export default function ContactPage() {
  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/contact-hero.jpg"
        imageAlt="Red wine being poured into a glass on an evening table strung with warm lights"
        photo
        eyebrow="Contact VINT"
        title="Let's Raise a Glass Together"
        subtitle="We'd love to hear from you. Whether you have a question about our homemade wines, want to know more, or would like to place an order, feel free to get in touch."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Details + form                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section" id="contact-details">
        <div className="vint-container">
          <div className="vint-contact-grid">
            <Reveal className="vint-contact-info">
              <div>
                <span className="vint-eyebrow">Find Us</span>
                <h2 style={{ margin: 'var(--space-2xs) 0 var(--space-lg)' }}>Come say hello</h2>
              </div>

              <div className="vint-contact-item">
                <span className="vint-contact-item__icon">
                  <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <span className="vint-contact-item__label">Address</span>
                  <address className="vint-contact-item__value">
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                  </address>
                </div>
              </div>

              <div className="vint-contact-item">
                <span className="vint-contact-item__icon">
                  <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <span className="vint-contact-item__label">Email</span>
                  <p className="vint-contact-item__value">
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </p>
                </div>
              </div>

              <div className="vint-contact-item">
                <span className="vint-contact-item__icon">
                  <Clock size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <span className="vint-contact-item__label">Response Time</span>
                  <p className="vint-contact-item__value">
                    We reply to every message personally, usually within one working day.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Live map                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section vint-section--band">
        <div className="vint-container">
          <SectionHeading
            eyebrow="The Estate"
            title="Where We Make It"
            subtitle={`${SITE.address.full}.`}
            align="center"
          />

          <Reveal className="vint-map">
            {/* The free Google embed labels a coordinate pin with the raw
                latitude and longitude and offers no way to override it, so the
                address is shown on the map here instead. */}
            <div className="vint-map__card">
              <span className="vint-map__label">
                <MapPin size={13} aria-hidden="true" />
                VINT Estate
              </span>
              <address className="vint-map__address">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </address>
              <a
                className="vint-map__link"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            <iframe
              src={MAP_SRC}
              title={`Map showing the VINT estate at ${SITE.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
