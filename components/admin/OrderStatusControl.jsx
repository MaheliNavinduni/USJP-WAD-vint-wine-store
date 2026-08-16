'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

import SelectInput from '@/components/form/SelectInput';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { ORDER_STATUSES } from '@/data/orders';

/**
 * Lets an admin move an order through its lifecycle.
 * Local state only until the backend exists.
 */
export default function OrderStatusControl({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [draft, setDraft] = useState(initialStatus);
  const [toast, setToast] = useState('');

  function save() {
    setStatus(draft);
    setToast(`${orderId} marked as ${draft}.`);
  }

  return (
    <>
      <div className="vint-panel">
        <div className="vint-panel__header">
          <h2 className="vint-panel__title">Order Status</h2>
          <StatusBadge status={status} />
        </div>

        <div className="vint-panel__body">
          <SelectInput
            label="Update Status"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            options={ORDER_STATUSES.map((option) => ({ value: option, label: option }))}
          />

          <div style={{ marginTop: 'var(--space-md)' }}>
            <Button
              variant="primary"
              square
              block
              size="sm"
              onClick={save}
              disabled={draft === status}
              icon={<Save size={15} />}
            >
              Save Status
            </Button>
          </div>
        </div>
      </div>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
