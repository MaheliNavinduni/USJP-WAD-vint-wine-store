/**
 * Coloured pill for order and message statuses.
 * Accepts any of: Pending, Confirmed, Preparing, Completed, Cancelled, New, Read.
 */
export default function StatusBadge({ status }) {
  const key = String(status).toLowerCase();
  return <span className={`vint-status vint-status--${key}`}>{status}</span>;
}
