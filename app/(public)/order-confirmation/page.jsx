import OrderConfirmation from '@/components/order/OrderConfirmation';

export const metadata = {
  title: 'Order Received',
  description: 'Your VINT order request has been submitted. Our team will be in touch shortly.',
  robots: { index: false },
};

export default function OrderConfirmationPage() {
  return (
    <section className="vint-confirm-page">
      <div
        className="vint-confirm-page__bg"
        style={{ backgroundImage: 'url(/images/heroes/confirmation-hero.svg)' }}
        aria-hidden="true"
      />
      <div className="vint-container vint-container--narrow vint-confirm-page__inner">
        <OrderConfirmation />
      </div>
    </section>
  );
}
