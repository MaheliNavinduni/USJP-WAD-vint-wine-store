import { Star } from 'lucide-react';

/** Five stars plus the numeric score and review count. */
export default function Rating({ value, reviews }) {
  const rounded = Math.round(value);

  return (
    <span className="vint-rating">
      <span className="vint-rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            fill={star <= rounded ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span>
        {value.toFixed(1)}
        {typeof reviews === 'number' && ` (${reviews} Reviews)`}
      </span>
      <span className="vint-visually-hidden">
        Rated {value} out of 5{typeof reviews === 'number' && ` from ${reviews} reviews`}
      </span>
    </span>
  );
}
