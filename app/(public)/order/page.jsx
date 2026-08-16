import { Suspense } from 'react';

import HeroSection from '@/components/sections/HeroSection';
import OrderForm from '@/components/forms/OrderForm';

export const metadata = {
  title: 'Place Your Order',
  description:
    'Request a purchase from VINT. Our team confirms availability, delivery and payment arrangements directly with you — no online payment required.',
};

export default function OrderPage() {
  return (
    <>
      <HeroSection
        variant="compact"
        image="/images/heroes/order-hero.svg"
        eyebrow="Guest Checkout"
        title="Place Your Order"
        subtitle="Enter your details below to request a purchase. Our team will confirm availability, delivery and payment arrangements."
      />

      <section className="vint-section">
        <div className="vint-container">
          {/* useSearchParams needs a Suspense boundary so the rest of the page
              can still be pre-rendered statically. */}
          <Suspense fallback={<p>Loading your order form…</p>}>
            <OrderForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
