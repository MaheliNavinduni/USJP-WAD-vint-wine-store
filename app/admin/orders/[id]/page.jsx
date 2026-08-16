import { notFound } from 'next/navigation';
import Image from 'next/image';

import AdminHeader from '@/components/admin/AdminHeader';
import OrderStatusControl from '@/components/admin/OrderStatusControl';
import { getOrderById, orders } from '@/data/orders';
import { formatPrice, getProductBySlug } from '@/data/products';

export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Order ${id}` };
}

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) notFound();

  const product = getProductBySlug(order.productSlug);

  return (
    <>
      <AdminHeader
        title={`Order ${order.id}`}
        subtitle={`Placed on ${order.date}`}
        backHref="/admin/orders"
        backLabel="Back to orders"
      />

      <div className="vint-admin-cols">
        <div>
          {/* ---------- Customer ---------- */}
          <section className="vint-panel">
            <div className="vint-panel__header">
              <h2 className="vint-panel__title">Customer</h2>
            </div>
            <div className="vint-panel__body">
              <dl className="vint-dl">
                <div className="vint-dl__row">
                  <dt>Name</dt>
                  <dd>{order.customer}</dd>
                </div>
                <div className="vint-dl__row">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${order.email}`} style={{ color: 'var(--vint-burgundy)' }}>
                      {order.email}
                    </a>
                  </dd>
                </div>
                <div className="vint-dl__row">
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${order.phone.replace(/\s/g, '')}`} style={{ color: 'var(--vint-burgundy)' }}>
                      {order.phone}
                    </a>
                  </dd>
                </div>
                <div className="vint-dl__row">
                  <dt>Delivery Address</dt>
                  <dd>{order.address}</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* ---------- Items ---------- */}
          <section className="vint-panel">
            <div className="vint-panel__header">
              <h2 className="vint-panel__title">Order</h2>
            </div>
            <div className="vint-panel__body">
              <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                {product && (
                  <span className="vint-table__thumb" style={{ width: 64, height: 80 }}>
                    <Image src={product.image} alt="" width={64} height={80} />
                  </span>
                )}
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--vint-burgundy)' }}>
                    {order.productName}
                  </p>
                  <span className="vint-table__muted">{order.productType}</span>
                </div>
              </div>

              <dl className="vint-dl">
                <div className="vint-dl__row">
                  <dt>Unit Price</dt>
                  <dd>{formatPrice(order.unitPrice)}</dd>
                </div>
                <div className="vint-dl__row">
                  <dt>Quantity</dt>
                  <dd>{order.quantity}</dd>
                </div>
                <div className="vint-dl__row">
                  <dt>Total</dt>
                  <dd style={{ fontWeight: 700, color: 'var(--vint-burgundy)' }}>
                    {formatPrice(order.total)}
                  </dd>
                </div>
                <div className="vint-dl__row">
                  <dt>Order Notes</dt>
                  <dd>{order.notes || <span className="vint-table__muted">No notes</span>}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>

        <OrderStatusControl orderId={order.id} initialStatus={order.status} />
      </div>
    </>
  );
}
