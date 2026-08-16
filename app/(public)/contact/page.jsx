import { Mail, MapPin, Clock } from 'lucide-react';

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

/** Google Maps embed for the real estate address. No API key required. */
const MAP_QUERY = `${SITE.address.line1}, ${SITE.address.line2}, Sri Lanka`;
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;

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
            subtitle={`${SITE.address.line1}, ${SITE.address.line2}.`}
            align="center"
          />

          <Reveal className="vint-map">
            <iframe
              src={MAP_SRC}
              title={`Map showing the VINT estate at ${MAP_QUERY}`}
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
