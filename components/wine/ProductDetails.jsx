'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Thermometer, UtensilsCrossed, Wine } from 'lucide-react';

import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/ui/Accordion';
import QuantitySelector from '@/components/ui/QuantitySelector';
import FlavourProfile from '@/components/wine/FlavourProfile';
import PairingCard from '@/components/wine/PairingCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { formatPrice } from '@/data/products';

/**
 * One component renders all four wine pages — the route at
 * app/(public)/wines/[slug] looks the product up and hands it over.
 */
export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;

  return (
    <>
      {/* Slim atmospheric band: keeps the hero styling family without pushing
          the product itself below the fold. */}
      <div className="vint-product-strip">
        <div className="vint-container">
          <nav className="vint-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/collection">Collection</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="vint-section">
        <div className="vint-container">
          <div className="vint-product">
            {/* ---------- Bottle ---------- */}
            <div className="vint-product__media">
              <Image
                src={product.image}
                alt={product.imageAlt}
                width={420}
                height={980}
                priority
                className="vint-product__image"
                sizes="(max-width: 900px) 70vw, 460px"
              />
            </div>

            {/* ---------- Details ---------- */}
            <div className="vint-product__info">
              <div className="vint-product__badges">
                <span className="vint-badge">{product.type}</span>
                <span className="vint-badge">{product.volume}</span>
              </div>

              <h1 className="vint-product__title">{product.name}</h1>

              <div className="vint-product__pricing">
                <span className="vint-product__price">{formatPrice(product.price)}</span>
              </div>

              <p className="vint-product__desc">{product.description}</p>

              <div className="vint-product__buy">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  max={Math.max(1, product.stock)}
                />

                <Button
                  href={`/order?product=${product.slug}&qty=${quantity}`}
                  variant="primary"
                  square
                  icon={<ShoppingBag size={16} />}
                  aria-disabled={!inStock}
                >
                  Place Order
                </Button>

                <p className="vint-product__stock">
                  {inStock
                    ? `${product.stock} bottles currently available · ${product.availability}`
                    : 'Currently sold out — contact us to be notified.'}
                </p>
              </div>

              <FlavourProfile flavour={product.flavour} />

              <div className="vint-serving">
                <span className="vint-serving__label">
                  <Thermometer size={14} aria-hidden="true" />
                  Serving
                </span>
                <span className="vint-serving__mode">{product.serving.label}</span>
                <span className="vint-serving__temp">{product.serving.tempF}</span>
                <span className="vint-serving__temp-c">({product.serving.tempC})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Accordions                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section--tight">
        <div className="vint-container vint-container--narrow">
          <Accordion title="Ingredients and Origin" defaultOpen>
            <p className="vint-detail-col__label">
              <UtensilsCrossed size={14} aria-hidden="true" />
              Ingredients
            </p>
            <p>{product.ingredients}</p>
          </Accordion>

          <Accordion title="Serving Suggestions" defaultOpen>
            <div className="vint-detail-cols">
              <div>
                <p className="vint-detail-col__label">
                  <UtensilsCrossed size={14} aria-hidden="true" />
                  Food Pairings
                </p>
                <p>{product.servingSuggestions.foodPairings}</p>
              </div>
              <div>
                <p className="vint-detail-col__label">
                  <Thermometer size={14} aria-hidden="true" />
                  Temperature
                </p>
                <p>{product.servingSuggestions.temperature}</p>
              </div>
            </div>
          </Accordion>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Curated pairings                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section vint-section--band">
        <div className="vint-container">
          <SectionHeading
            eyebrow="At the Table"
            title="Curated Pairings"
            subtitle={`What we like to serve alongside ${product.name}.`}
            align="center"
          />

          <div className="vint-pairings-grid">
            {product.pairings.map((pairing, index) => (
              <Reveal key={pairing.name} delay={index * 80}>
                <PairingCard pairing={pairing} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Back to collection                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-section--tight">
        <div className="vint-container" style={{ textAlign: 'center' }}>
          <Button href="/collection" variant="outline" icon={<Wine size={15} />}>
            Back to the Collection
          </Button>
        </div>
      </section>
    </>
  );
}
