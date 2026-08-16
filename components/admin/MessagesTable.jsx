'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { messages as seedMessages } from '@/data/messages';

/**
 * Contact Us submissions.
 * Opening a message marks it Read in local state — wire this to the backend
 * when one exists.
 */
export default function MessagesTable() {
  const [rows, setRows] = useState(seedMessages);
  const [selected, setSelected] = useState(null);

  function open(message) {
    setSelected(message);
    setRows((prev) =>
      prev.map((entry) => (entry.id === message.id ? { ...entry, status: 'Read' } : entry)),
    );
  }

  return (
    <>
      <section className="vint-panel">
        <div className="vint-table-wrap">
          <table className="vint-table">
            <caption className="vint-visually-hidden">Messages submitted through Contact Us</caption>
            <thead>
              <tr>
                <th scope="col">Customer</th>
                <th scope="col">Subject</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="vint-visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((message) => (
                <tr key={message.id}>
                  <td>
                    <span className="vint-table__strong">{message.name}</span>
                    <span className="vint-table__muted" style={{ display: 'block' }}>
                      {message.email}
                    </span>
                  </td>
                  <td>{message.subject}</td>
                  <td className="vint-table__num vint-table__muted">{message.date}</td>
                  <td>
                    <StatusBadge status={message.status} />
                  </td>
                  <td>
                    <div className="vint-table__actions">
                      <button
                        type="button"
                        className="vint-icon-btn"
                        onClick={() => open(message)}
                        aria-label={`Read message from ${message.name}`}
                      >
                        <Eye size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.subject} — ${selected.name}` : ''}
      >
        {selected && (
          <>
            <dl className="vint-dl" style={{ marginBottom: 'var(--space-md)' }}>
              <div className="vint-dl__row">
                <dt>From</dt>
                <dd>{selected.name}</dd>
              </div>
              <div className="vint-dl__row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${selected.email}`} style={{ color: 'var(--vint-burgundy)' }}>
                    {selected.email}
                  </a>
                </dd>
              </div>
              <div className="vint-dl__row">
                <dt>Phone</dt>
                <dd>{selected.phone}</dd>
              </div>
              <div className="vint-dl__row">
                <dt>Received</dt>
                <dd>{selected.date}</dd>
              </div>
            </dl>

            <p
              style={{
                padding: 'var(--space-md)',
                background: 'var(--vint-cream-deep)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--vint-text)',
              }}
            >
              {selected.body}
            </p>

            <div className="vint-admin-actions" style={{ marginTop: 'var(--space-lg)' }}>
              <Button variant="outline" square size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
                variant="primary"
                square
                size="sm"
              >
                Reply by Email
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
