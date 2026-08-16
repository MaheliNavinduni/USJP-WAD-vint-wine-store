import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import { getProductBySlug } from '@/data/products';
import { CRAFTSMANSHIP, SITE } from '@/data/site';

export const metadata = {
  title: 'Our Story',
  description:
    'From a treasured homemade recipe passed down through generations to every bottle we share — the story of VINT, established 2020 in Avissawella, Sri Lanka.',
};

const GALLERY = [
  {
    src: '/images/story/story-1.svg',
    alt: 'Two glasses of VINT wine poured on a table',
    modifier: 'tall',
    width: 600,
    height: 800,
  },
  {
    src: '/images/story/story-2.svg',
    alt: 'Friends raising their glasses in a toast',
    modifier: 'wide',
    width: 900,
    height: 520,
  },
  {
    src: '/images/story/story-3.svg',
    alt: 'Wine being poured from a VINT bottle into a glass',
    modifier: 'wide',
    width: 900,
    height: 520,
  },
];

export default function OurStoryPage() {
  const heroBottle = getProductBySlug('heritage-red');

  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/story-hero.svg"
        eyebrow={`Established ${SITE.established}`}
        title="Our Story"
        subtitle="From a treasured homemade recipe to every bottle we share."
        actions={
          <Button href="/collection" variant="light" icon={<ArrowRight size={16} />}>
            See What We Make
          </Button>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* The VINT Legacy                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section" id="legacy">
        <div className="vint-container">
          <div className="vint-legacy">
            <Reveal className="vint-legacy__copy">
              <span className="vint-eyebrow">The Beginning</span>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>The VINT Legacy</h2>

              <p>
                Our wine story began in {SITE.established}, inspired by a treasured homemade wine
                recipe passed down through generations. The recipe carries the warmth of family
                tradition, carefully preserved over the years and enjoyed for its pleasant taste and
                unique character. What began as a simple homemade habit soon became a passion for
                making wine that brings people together.
              </p>

              <p>
                Every bottle is made with care, inspired by that original family recipe while keeping
                the spirit of its tradition alive. From the first homemade batch to today, our
                journey has always been about preserving our heritage, sharing our passion, and
                creating a wine experience that feels special with every sip.
              </p>

              <span className="vint-badge">Est. {SITE.established}</span>
            </Reveal>

            <Reveal className="vint-legacy__media" delay={120}>
              <Image
                src={heroBottle.image}
                alt={heroBottle.imageAlt}
                width={320}
                height={760}
                sizes="(max-width: 820px) 70vw, 420px"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Unrivaled Craftsmanship                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section vint-section--band">
        <div className="vint-container">
          <SectionHeading
            eyebrow="How It Is Made"
            title="Unrivaled Craftsmanship"
            subtitle="From the careful picking of ripe fruit to the quiet months of maturing, our process is a small, patient, entirely hands-on one."
            align="center"
          />

          <div className="vint-craft-grid">
            {CRAFTSMANSHIP.map((step, index) => (
              <Reveal key={step.title} className="vint-craft-card" delay={index * 90}>
                <span className="vint-craft-card__icon">
                  <Icon name={step.icon} size={26} />
                </span>
                <h3 className="vint-craft-card__title">{step.title}</h3>
                <p className="vint-craft-card__body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Gallery                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section">
        <div className="vint-container">
          <SectionHeading
            eyebrow="Moments"
            title="Made to Be Shared"
            subtitle="The reason we do this: the evenings our wine ends up in the middle of."
            align="center"
          />

          <div className="vint-gallery">
            {GALLERY.map((item, index) => (
              <Reveal
                key={item.src}
                className={`vint-gallery__item vint-gallery__item--${item.modifier}`}
                delay={index * 100}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 820px) 100vw, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section--tight">
        <div className="vint-container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>Taste the tradition</h2>
            <p
              style={{
                maxWidth: '50ch',
                margin: '0 auto var(--space-lg)',
                color: 'var(--vint-text-muted)',
                fontSize: 'var(--text-lg)',
              }}
            >
              Four wines, made in small batches at our estate in {SITE.address.line2}.
            </p>
            <Button href="/collection" variant="primary" size="lg" icon={<ArrowRight size={17} />}>
              Explore the Collection
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
