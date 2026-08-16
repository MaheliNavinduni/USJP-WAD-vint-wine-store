import HeroSection from '@/components/sections/HeroSection';
import CollectionGrid from '@/components/wine/CollectionGrid';
import { products } from '@/data/products';

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
        image="/images/heroes/collection-hero.svg"
        eyebrow="The Cellar"
        title="The Wine Collection"
        subtitle="Explore our small collection of carefully handcrafted homemade wines. Four bottles, each made in limited quantity and pressed by hand at the estate."
        chips={[
          { value: products.length, label: 'wines available' },
          { value: '750ml', label: 'every bottle' },
        ]}
        scrollTo="wine-grid"
      />

      <section className="vint-section" id="wine-grid">
        <div className="vint-container">
          <CollectionGrid />
        </div>
      </section>
    </>
  );
}
