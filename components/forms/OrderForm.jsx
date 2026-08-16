'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Info } from 'lucide-react';

import FormInput from '@/components/form/FormInput';
import TextArea from '@/components/form/TextArea';
import Button from '@/components/ui/Button';
import QuantitySelector from '@/components/ui/QuantitySelector';
import OrderSummary from '@/components/order/OrderSummary';
import { getOrderableGroups, getOrderableItem, orderableItems } from '@/data/catalogue';

const EMPTY = { name: '', email: '', phone: '', address: '', notes: '' };

/** Order reference shown on the confirmation page, e.g. VNT-4F92. */
function makeReference() {
  return `VNT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export default function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Product Details links here as /order?product=slug&qty=2, so the customer
  // never has to re-pick what they were already looking at.
  const requestedSlug = searchParams.get('product');
  const requestedQty = Number.parseInt(searchParams.get('qty') ?? '1', 10);

  const [slug, setSlug] = useState(
    getOrderableItem(requestedSlug) ? requestedSlug : orderableItems[0].slug,
  );
  const [quantity, setQuantity] = useState(
    Number.isFinite(requestedQty) && requestedQty > 0 ? Math.min(requestedQty, 99) : 1,
  );
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const item = getOrderableItem(slug);
  const groups = getOrderableGroups();

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (values.phone.replace(/\D/g, '').length < 9) {
      next.phone = 'Please enter a contact number we can reach you on.';
    }
    if (!values.address.trim()) next.address = 'Please enter a delivery address.';
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      document.querySelector('.vint-field--invalid input, .vint-field--invalid textarea')?.focus();
      return;
    }

    setSubmitting(true);

    // No backend and no payment gateway yet. The order is handed to the
    // confirmation page through sessionStorage rather than the URL, so the
    // customer's name, phone and address never end up in a shareable link.
    const order = {
      reference: makeReference(),
      productName: item.name,
      productCategory: item.category,
      productImage: item.image,
      quantity,
      total: item.price * quantity,
      customer: values.name,
      phone: values.phone,
      email: values.email,
      placedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem('vint:last-order', JSON.stringify(order));
    } catch {
      // Private browsing can block sessionStorage — the confirmation page
      // falls back to a generic message, so this is safe to ignore.
    }

    router.push('/order-confirmation');
  }

  return (
    <div className="vint-order-grid">
      <form className="vint-order-form" onSubmit={handleSubmit} noValidate>
        <h2 style={{ marginBottom: 'var(--space-lg)' }}>Order Details</h2>

        <div className="vint-form-grid">
          {/* Native optgroup support means this stays one accessible select. */}
          <div className="vint-field">
            <label className="vint-field__label" htmlFor="order-product">
              Select Product
            </label>
            <div className="vint-select-wrap">
              <select
                id="order-product"
                name="product"
                className="vint-select"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
              >
                {groups.map(({ group, items }) => (
                  <optgroup key={group} label={group}>
                    {items.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.name} — {option.category}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <svg
                className="vint-select-wrap__chevron"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="vint-field">
            <span className="vint-field__label" id="order-qty-label">
              Quantity
            </span>
            <div style={{ paddingTop: '0.35rem' }}>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={item?.maxQuantity ?? 99}
              />
            </div>
          </div>

          <TextArea
            label="Special Notes"
            optional
            rows={3}
            className="vint-form-grid__full"
            name="notes"
            placeholder="Gift wrapping, preferred delivery day, anything else we should know."
            value={values.notes}
            onChange={update('notes')}
          />

          <FormInput
            label="Full Name"
            name="name"
            autoComplete="name"
            className="vint-form-grid__full"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
            required
          />

          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            error={errors.phone}
            required
          />

          <TextArea
            label="Delivery Address"
            name="address"
            rows={3}
            autoComplete="street-address"
            className="vint-form-grid__full"
            value={values.address}
            onChange={update('address')}
            error={errors.address}
            required
          />
        </div>

        <p className="vint-note" style={{ marginTop: 'var(--space-lg)' }}>
          <Info size={18} aria-hidden="true" />
          After submitting your order, our team will contact you to confirm availability, delivery
          details and payment arrangements. No payment is taken on this website.
        </p>

        <div style={{ marginTop: 'var(--space-md)' }}>
          <Button
            type="submit"
            variant="primary"
            square
            block
            disabled={submitting}
            icon={<ArrowRight size={16} />}
          >
            {submitting ? 'Submitting…' : 'Submit Order'}
          </Button>
        </div>
      </form>

      <OrderSummary item={item} quantity={quantity} />
    </div>
  );
}
