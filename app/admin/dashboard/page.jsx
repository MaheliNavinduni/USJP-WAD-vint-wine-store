import Link from 'next/link';
import { Boxes, ClipboardList, Clock, Package } from 'lucide-react';

import AdminHeader from '@/components/admin/AdminHeader';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
import AdminThumb from '@/components/admin/AdminThumb';
import Button from '@/components/ui/Button';
import { formatPrice, products } from '@/data/products';
import { getOrderStats, orders } from '@/data/orders';
import { messages } from '@/data/messages';

export const metadata = { title: 'Dashboard' };

export default function AdminDashboardPage() {
  const stats = getOrderStats();
  const bottlesInStock = products.reduce((sum, product) => sum + product.stock, 0);
  const recentOrders = orders.slice(0, 4);
  const unreadMessages = messages.filter((message) => message.status === 'New').length;

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="A snapshot of the estate — orders, stock and customer messages."
        action={
          <Button href="/admin/products/new" variant="primary" size="sm" square>
            Add Product
          </Button>
        }
      />

      <div className="vint-stats">
        <StatCard
          icon={<Package size={22} strokeWidth={1.6} />}
          label="Total Products"
          value={products.length}
          hint="Four wines in the collection"
        />
        <StatCard
          icon={<Clock size={22} strokeWidth={1.6} />}
          label="Pending Orders"
          value={stats.pending}
          hint="Awaiting confirmation"
        />
        <StatCard
          icon={<ClipboardList size={22} strokeWidth={1.6} />}
          label="Total Orders"
          value={stats.total}
          hint={`${stats.completed} completed`}
        />
        <StatCard
          icon={<Boxes size={22} strokeWidth={1.6} />}
          label="Bottles In Stock"
          value={bottlesInStock}
          hint="Across all four wines"
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Recent orders                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-panel">
        <div className="vint-panel__header">
          <h2 className="vint-panel__title">Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--vint-burgundy)' }}>
            View all orders
          </Link>
        </div>

        <div className="vint-table-wrap">
          <table className="vint-table">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Product</th>
                <th scope="col">Qty</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link href={`/admin/orders/${order.id}`} className="vint-table__strong">
                      {order.id}
                    </Link>
                  </td>
                  <td>
                    {order.customer}
                    <span className="vint-table__muted" style={{ display: 'block' }}>
                      {order.date}
                    </span>
                  </td>
                  <td>{order.productName}</td>
                  <td className="vint-table__num">{order.quantity}</td>
                  <td className="vint-table__num">{formatPrice(order.total)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Inventory overview                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="vint-panel">
        <div className="vint-panel__header">
          <h2 className="vint-panel__title">Inventory Overview</h2>
          <Link href="/admin/products" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--vint-burgundy)' }}>
            Manage products
          </Link>
        </div>

        <div className="vint-table-wrap">
          <table className="vint-table">
            <thead>
              <tr>
                <th scope="col">Wine</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Availability</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="vint-admin-product-cell">
                      <AdminThumb src={product.image} />
                      <span className="vint-table__strong">{product.name}</span>
                    </div>
                  </td>
                  <td className="vint-table__muted">{product.type}</td>
                  <td className="vint-table__num">{formatPrice(product.price)}</td>
                  <td className="vint-table__num">{product.stock}</td>
                  <td>
                    <StatusBadge status={product.stock > 0 ? 'Confirmed' : 'Cancelled'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {unreadMessages > 0 && (
        <section className="vint-panel">
          <div className="vint-panel__body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <p>
              <strong>{unreadMessages} new customer {unreadMessages === 1 ? 'message' : 'messages'}</strong>{' '}
              waiting for a reply.
            </p>
            <Button href="/admin/messages" variant="outline" size="sm" square>
              Read Messages
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
