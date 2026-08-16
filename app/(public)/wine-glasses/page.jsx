import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import { glassware, glasswareQualities } from '@/data/glassware';
import { formatPrice } from '@/data/products';

export const metadata = {
  title: 'Wine Glass Collection',
  description:
    'Hand-blown glassware designed to elevate every pour — the Sommelier Series, Heritage Crystal Set and Varietal Specific Tasting Set.',
};

export default function WineGlassesPage() {
  const [feature, ...rest] = glasswareQualities;

  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/glasses-hero.png"
        imageAlt="A row of VINT wine glasses arranged on a linen table"
        photo
        eyebrow="Glassware"
        title="Wine Glass Collection"
        subtitle="Designed to elevate every pour. Hand-blown, lead-free and shaped around the wine it is meant to hold."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Banner + collection                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section" id="glass-grid">
        <div className="vint-container">
          <Reveal className="vint-glass-banner">
            <Image
              src="/images/glasses/glassware-banner.png"
              alt="The full VINT glassware collection photographed together"
              width={1280}
              height={1280}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </Reveal>

          <SectionHeading
            eyebrow="Three Sets"
            title="Sip in Style"
            subtitle="Every glass, a different experience. Each set is available to order directly through our team."
            align="center"
          />

          <div className="vint-glass-grid">
            {glassware.map((item, index) => (
              <Reveal key={item.id} delay={index * 90}>
                <article className="vint-glass-card">
                  <div className="vint-glass-card__media">
                    <span className="vint-glass-card__badge">{item.setSize}</span>
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={520}
                      height={390}
                      sizes="(max-width: 900px) 100vw, 380px"
                    />
                  </div>

                  <div className="vint-glass-card__body">
                    <h3>{item.name}</h3>
                    <p className="vint-glass-card__desc">{item.description}</p>

                    <div className="vint-glass-card__footer">
                      <span className="vint-glass-card__price">{formatPrice(item.price)}</span>
                      <Button
                        href={`/order?product=${item.slug}`}
                        variant="outline"
                        size="sm"
                        icon={<ArrowRight size={15} />}
                        aria-label={`Order the ${item.name}`}
                      >
                        Order
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Uncompromising Quality                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section vint-section--band">
        <div className="vint-container">
          <SectionHeading
            eyebrow="The Anatomy of Perfection"
            title="Uncompromising Quality"
            align="center"
          />

          <div className="vint-quality">
            <Reveal className="vint-quality__card vint-quality__card--feature">
              <div>
                <span className="vint-quality__icon">
                  <Icon name={feature.icon} size={20} />
                </span>
                <h3 className="vint-quality__title" style={{ marginTop: 'var(--space-sm)' }}>
                  {feature.title}
                </h3>
                <p className="vint-quality__body" style={{ marginTop: 'var(--space-2xs)' }}>
                  {feature.body}
                </p>
              </div>

              <div className="vint-quality__media">
                <Image
                  src="/images/glasses/glassblowing.jpg"
                  alt="A glassmaker shaping a glowing wine glass by hand with tongs"
                  width={321}
                  height={442}
                  sizes="(max-width: 1040px) 100vw, 280px"
                />
              </div>
            </Reveal>

            <div className="vint-quality__side">
              {rest.map((quality, index) => (
                <Reveal key={quality.id} className="vint-quality__card" delay={(index + 1) * 90}>
                  <span className="vint-quality__icon">
                    <Icon name={quality.icon} size={20} />
                  </span>
                  <h3 className="vint-quality__title">{quality.title}</h3>
                  <p className="vint-quality__body">{quality.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-cta-band">
        <div
          className="vint-cta-band__bg"
          style={{ backgroundImage: 'url(/images/heroes/glasses-cta.svg)' }}
          aria-hidden="true"
        />
        <Reveal>
          <h2 className="vint-cta-band__title">Complete the Experience</h2>
          <p className="vint-cta-band__body">
            The right glass changes the wine in it. Pair a set with one of our four handcrafted
            bottles and taste the difference for yourself.
          </p>
          <div className="vint-cta-band__actions">
            <Button href="/collection" variant="light" size="lg" icon={<ArrowRight size={17} />}>
              Explore Wines
            </Button>
            <Button href="/order" variant="ghost-light" size="lg">
              Place an Order
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
