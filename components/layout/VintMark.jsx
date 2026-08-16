/**
 * The small wine-glass logo mark that sits inside the navbar's circle.
 * Inline SVG so it inherits `currentColor` and never needs a network request.
 */
export default function VintMark({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 3h10l-1 6a4 4 0 0 1-8 0Z" />
      <path d="M12 13v6" />
      <path d="M8.5 21h7" />
      <path d="M7.6 6.6h8.8" fill="none" />
    </svg>
  );
}
