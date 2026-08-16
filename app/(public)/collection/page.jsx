import HeroSection from '@/components/sections/HeroSection';
import CollectionGrid from '@/components/wine/CollectionGrid';

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
    </>
  );
}
