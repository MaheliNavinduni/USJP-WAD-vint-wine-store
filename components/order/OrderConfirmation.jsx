'use client';

import { useEffect, useState } from 'react';
import { Check, ArrowRight, Mail } from 'lucide-react';

import Button from '@/components/ui/Button';
import { formatPrice } from '@/data/products';
import { SITE } from '@/data/site';

/**
 * Reads the order the OrderForm stashed in sessionStorage. If someone lands
 * here directly (refresh, bookmark, private browsing) the page still renders
 * with a friendly generic message rather than blank fields.
 */
export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('vint:last-order');
      if (stored) setOrder(JSON.parse(stored));
    } catch {
      // Ignore — the fallback copy below covers it.
    }
    setReady(true);
  }, []);

  return (
    <div className="vint-confirm">
      <span className="vint-confirm__check" aria-hidden="true">
        <Check size={44} strokeWidth={2.5} />
      </span>

      <span className="vint-eyebrow">Order Received</span>
      <h1>Thank You</h1>

      <p className="vint-confirm__lede">
        Your order request has been successfully submitted.
      </p>

      {ready && order && (
        <div className="vint-confirm__card">
          <dl className="vint-confirm__list">
            <div className="vint-confirm__row">
              <dt>Order Reference</dt>
              <dd>{order.reference}</dd>
            </div>
            <div className="vint-confirm__row">
              <dt>Wine</dt>
              <dd>{order.productName}</dd>
            </div>
            <div className="vint-confirm__row">
              <dt>Quantity</dt>
              <dd>{order.quantity}</dd>
            </div>
            <div className="vint-confirm__row">
              <dt>Estimated Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
            <div className="vint-confirm__row">
              <dt>Customer Name</dt>
              <dd>{order.customer}</dd>
            </div>
            <div className="vint-confirm__row">
              <dt>Phone</dt>
              <dd>{order.phone}</dd>
            </div>
          </dl>
        </div>
      )}

      {ready && !order && (
        <div className="vint-confirm__card">
          <p style={{ color: 'var(--vint-text-muted)' }}>
            We could not display your order details on this device, but your request has been
            recorded. If you need a copy, email us at{' '}
            <a href={`mailto:${SITE.email}`} style={{ color: 'var(--vint-burgundy)', fontWeight: 600 }}>
              {SITE.email}
            </a>
            .
          </p>
        </div>
      )}

      <p
        style={{
          maxWidth: '54ch',
          marginTop: 'var(--space-lg)',
          color: 'var(--vint-text-muted)',
        }}
      >
        Our team will contact you to confirm availability, delivery details and payment
        arrangements. No payment has been taken on this website.
      </p>

      <div className="vint-confirm__actions">
        <Button href="/collection" variant="primary" icon={<ArrowRight size={16} />}>
          Continue Shopping
        </Button>
        <Button href="/contact" variant="outline" icon={<Mail size={16} />}>
          Contact Us
        </Button>
      </div>
    </div>
  );
}
