import Image from 'next/image';
import { Info } from 'lucide-react';

import { formatPrice } from '@/data/products';

/**
 * Right-hand summary on the order page.
 * There is no payment gateway — this shows an estimate only, and says so.
 */
export default function OrderSummary({ item, quantity }) {
  const subtotal = item ? item.price * quantity : 0;

  return (
    <aside className="vint-summary" aria-label="Order summary">
      <h2 className="vint-summary__title">Order Summary</h2>

      {item ? (
        <>
          <div className="vint-summary__item">
            <div className="vint-summary__thumb">
              <Image src={item.image} alt={item.imageAlt} width={96} height={120} />
            </div>

            <div>
              <span className="vint-summary__type">{item.category}</span>
              <p className="vint-summary__name">{item.name}</p>
              <span className="vint-summary__qty">
                {formatPrice(item.price)} × {quantity}
              </span>
            </div>
          </div>

          <dl className="vint-summary__totals">
            <div className="vint-summary__row">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="vint-summary__row">
              <dt>Delivery</dt>
              <dd>Confirmed by our team</dd>
            </div>
            <div className="vint-summary__row vint-summary__row--total">
              <dt>Estimated Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <p className="vint-note vint-summary__note">
            <Info size={18} aria-hidden="true" />
            Payment arrangements will be confirmed by our team when they contact you.
          </p>
        </>
      ) : (
        <p style={{ color: 'var(--vint-text-muted)' }}>
          Choose a product on the left and your summary will appear here.
        </p>
      )}
    </aside>
  );
}
