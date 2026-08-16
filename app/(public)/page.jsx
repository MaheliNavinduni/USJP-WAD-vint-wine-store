import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import WineCard from '@/components/wine/WineCard';
import { getFeaturedProducts } from '@/data/products';
import { VALUE_PROPS } from '@/data/site';

export const metadata = {
  title: 'VINT — Handmade Wine, Crafted With Passion',
  description:
    'A small Sri Lankan estate making homemade wine by hand. Explore four handcrafted wines and our glassware collection.',
};

export default function HomePage() {
  const featured = getFeaturedProducts(3);

  return (
    <>
      <HeroSection
        variant="home"
        image="/images/heroes/home-hero.png"
        imageAlt="A glass of VINT red wine beside a bottle, lit warmly against dark grapes"
        flipImage
        eyebrow="Est. 2020 · Avissawella, Sri Lanka"
        title="Handmade. Crafted with passion."
        subtitle="VINT is a small family cellar making wine the slow way — pressed by hand, fermented in small batches, and bottled only when it is ready. Four wines, made properly, for the moments worth sharing."
        actions={
          <>
            <Button href="/collection" variant="light" size="lg" icon={<ArrowRight size={17} />}>
              Explore Wines
            </Button>
            <Button href="/wine-glasses" variant="ghost-light" size="lg">
              Explore Wine Glasses
            </Button>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Our Finest Selection                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section" id="finest-selection">
        <div className="vint-container">
          <SectionHeading
            eyebrow="The Collection"
            title="Our Finest Selection"
            align="between"
            action={
              <Button href="/collection" variant="outline" size="sm" icon={<ArrowRight size={15} />}>
                View All Wines
              </Button>
            }
          />

          <div className="vint-featured-grid">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 90}>
                <WineCard product={product} showDescription={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Why Choose VINT                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section vint-section--band">
        <div className="vint-container">
          <SectionHeading
            eyebrow="Why VINT"
            title="Why Choose VINT"
            subtitle="Small enough to know every bottle we send out, careful enough to make it worth opening."
            align="center"
          />

          <ul className="vint-values">
            {VALUE_PROPS.map((value, index) => (
              <Reveal key={value.title} as="li" delay={index * 80} className="vint-value">
                <span className="vint-value__icon">
                  <Icon name={value.icon} size={24} />
                </span>
                <h3 className="vint-value__title">{value.title}</h3>
                <p className="vint-value__body">{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* About preview                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section">
        <div className="vint-container">
          <div className="vint-about">
            <Reveal className="vint-about__copy">
              <span className="vint-eyebrow">About Us</span>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>A recipe worth keeping</h2>
              <p>
                We are passionate about creating homemade wines with care, love, and attention to
                every detail — each bottle crafted using quality ingredients and traditional methods.
              </p>
              <p>
                From preparation to bottling, we put our heart into every step, so what reaches you
                is rich, smooth and genuinely enjoyable.
              </p>
              <p>
                Our goal is simple: beautifully crafted homemade wine for celebrations, quiet
                evenings, and the people you love.
              </p>
              <Button
                href="/our-story"
                variant="outline"
                icon={<ArrowRight size={15} />}
                className="vint-about__cta"
              >
                Discover Our Story
              </Button>
            </Reveal>

            <Reveal className="vint-about__media" delay={120}>
              <Image
                src="/images/about/wine-and-grapes.jpg"
                alt="A glass of red wine on a rustic wooden table beside a bunch of red grapes and a bottle"
                width={1000}
                height={1250}
                sizes="(max-width: 820px) 100vw, 520px"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
