'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import AdminThumb from '@/components/admin/AdminThumb';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import { formatPrice, products as seedProducts } from '@/data/products';

/**
 * Product management table.
 *
 * Deleting removes the row from local state only — there is no backend yet, so
 * a refresh restores the seed data. Swap `rows` for server data when the API
 * lands.
 */
export default function ProductsTable() {
  const [rows, setRows] = useState(seedProducts);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [toast, setToast] = useState('');

  function confirmDelete() {
    setRows((prev) => prev.filter((product) => product.id !== pendingDelete.id));
    setToast(`${pendingDelete.name} removed from the list.`);
    setPendingDelete(null);
  }

  return (
    <>
      <section className="vint-panel">
        <div className="vint-table-wrap">
          <table className="vint-table">
            <caption className="vint-visually-hidden">
              All VINT wines with price, stock and availability
            </caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Availability</th>
                <th scope="col">
                  <span className="vint-visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="vint-admin-product-cell">
                      <AdminThumb src={product.image} />
                      <div>
                        <span className="vint-table__strong">{product.name}</span>
                        <span className="vint-admin-product-cell__meta vint-table__muted">
                          {product.volume} · {product.alcohol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="vint-table__muted">{product.type}</td>
                  <td className="vint-table__num">{formatPrice(product.price)}</td>
                  <td className="vint-table__num">{product.stock}</td>
                  <td>
                    <StatusBadge status={product.stock > 0 ? 'Confirmed' : 'Cancelled'} />
                  </td>
                  <td>
                    <div className="vint-table__actions">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="vint-icon-btn"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        className="vint-icon-btn vint-icon-btn--danger"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => setPendingDelete(product)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="vint-empty">
            <p>No products left in the list. Refresh to restore the sample data.</p>
          </div>
        )}
      </section>

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Delete product"
      >
        <p style={{ color: 'var(--vint-text-muted)' }}>
          Remove <strong>{pendingDelete?.name}</strong> from the collection? Customers will no longer
          see it on the website.
        </p>
        <div className="vint-admin-actions" style={{ marginTop: 'var(--space-lg)' }}>
          <Button variant="outline" square size="sm" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button variant="primary" square size="sm" onClick={confirmDelete}>
            Delete Product
          </Button>
        </div>
      </Modal>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
