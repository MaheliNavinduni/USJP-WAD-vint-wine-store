import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import CollectionGrid from '@/components/wine/CollectionGrid';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export const metadata = {
  title: 'The Wine Collection',
  description:
    'Explore VINT\'s small collection of carefully handcrafted homemade wines — red, white, strawberry and king coconut.',
};

export default function CollectionPage() {
  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/collection-hero.jpg"
        imageAlt="Wine glasses hanging above racked bottles in a dimly lit cellar"
        title="The Wine Collection"
        subtitle="Explore our small collection of carefully handcrafted homemade wines. Four bottles, each made in limited quantity and pressed by hand at the estate."
        scrollTo="wine-grid"
      />

      <section className="vint-section" id="wine-grid">
        <div className="vint-container">
          <CollectionGrid />
        </div>
      </section>

      {/* Cross-link: the other half of the collection. */}
      <section className="vint-section--tight">
        <div className="vint-container">
          <Reveal className="vint-crosslink">
            <div className="vint-crosslink__copy">
              <span className="vint-eyebrow">Glassware</span>
              <h2>Every glass, a different experience</h2>
              <p>
                The right glass changes the wine in it. Our hand-blown glassware is shaped around
                the wine it is meant to hold — from generous bowls for the reds to slender
                silhouettes that keep the whites crisp.
              </p>
              <Button href="/wine-glasses" variant="primary" icon={<ArrowRight size={16} />}>
                Explore Wine Glasses
              </Button>
            </div>

            <div className="vint-crosslink__media">
              <Image
                src="/images/glasses/glassware-banner.png"
                alt="The VINT glassware collection arranged on a linen table"
                width={638}
                height={639}
                sizes="(max-width: 780px) 100vw, 520px"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
