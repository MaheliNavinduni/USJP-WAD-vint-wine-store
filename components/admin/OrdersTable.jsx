'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import { formatPrice } from '@/data/products';
import { ORDER_STATUSES, orders } from '@/data/orders';

const FILTERS = ['All', ...ORDER_STATUSES];

export default function OrdersTable() {
  const [filter, setFilter] = useState('All');

  const rows = useMemo(
    () => (filter === 'All' ? orders : orders.filter((order) => order.status === filter)),
    [filter],
  );

  return (
    <>
      <div className="vint-filters" role="group" aria-label="Filter orders by status">
        {FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            className={`vint-filter${filter === status ? ' vint-filter--active' : ''}`}
            onClick={() => setFilter(status)}
            aria-pressed={filter === status}
          >
            {status}
          </button>
        ))}
      </div>

      <section className="vint-panel">
        <div className="vint-table-wrap">
          <table className="vint-table">
            <caption className="vint-visually-hidden">Customer orders</caption>
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Product</th>
                <th scope="col">Qty</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="vint-visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => (
                <tr key={order.id}>
                  <td className="vint-table__strong">{order.id}</td>
                  <td>
                    {order.customer}
                    <span className="vint-table__muted" style={{ display: 'block' }}>
                      {order.phone}
                    </span>
                  </td>
                  <td>
                    {order.productName}
                    <span className="vint-table__muted" style={{ display: 'block' }}>
                      {order.productType}
                    </span>
                  </td>
                  <td className="vint-table__num">{order.quantity}</td>
                  <td className="vint-table__num vint-table__muted">{order.date}</td>
                  <td className="vint-table__num">{formatPrice(order.total)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>
                    <div className="vint-table__actions">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="vint-icon-btn"
                        aria-label={`View order ${order.id}`}
                      >
                        <Eye size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="vint-empty">
            <p>No {filter.toLowerCase()} orders right now.</p>
          </div>
        )}
      </section>
    </>
  );
}
