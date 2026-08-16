/** Metric tile on the admin dashboard. */
export default function StatCard({ icon, label, value, hint }) {
  return (
    <div className="vint-stat">
      <span className="vint-stat__icon">{icon}</span>
      <div>
        <span className="vint-stat__label">{label}</span>
        <p className="vint-stat__value">{value}</p>
        {hint && <span className="vint-stat__hint">{hint}</span>}
      </div>
    </div>
  );
}
