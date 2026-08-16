import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/data/products';
import Button from '@/components/ui/Button';

/**
 * Product card used on Home (compact) and Collection (wide).
 *
 * @param {'compact'|'wide'} layout
 * @param {boolean} showDescription  hidden on Home to keep the row tidy
 */
export default function WineCard({ product, layout = 'compact', showDescription = true }) {
  const inStock = product.stock > 0;

  return (
    <article className={`vint-wine-card${layout === 'wide' ? ' vint-wine-card--wide' : ''}`}>
      <div className="vint-wine-card__media">
        <span className="vint-wine-card__badge">
          <span
            className={`vint-wine-card__dot${inStock ? '' : ' vint-wine-card__dot--out'}`}
            aria-hidden="true"
          />
          {inStock ? 'In Stock' : 'Sold Out'}
        </span>

        <Image
          src={product.image}
          alt={product.imageAlt}
          width={220}
          height={520}
          className="vint-wine-card__image"
          sizes="(max-width: 640px) 60vw, 220px"
        />
      </div>

      <div className="vint-wine-card__body">
        <div className="vint-wine-card__row">
          <h3 className="vint-wine-card__name">{product.name}</h3>
          <span className="vint-wine-card__price">{formatPrice(product.price)}</span>
        </div>

        <p className="vint-wine-card__meta">
          {product.type} • {product.volume}
        </p>

        {showDescription && <p className="vint-wine-card__desc">{product.description}</p>}

        <div className="vint-wine-card__footer">
          <Button
            href={`/wines/${product.slug}`}
            variant={layout === 'wide' ? 'primary' : 'outline'}
            size="sm"
            square={layout === 'wide'}
            block={layout === 'compact'}
            icon={<ArrowRight size={15} />}
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
