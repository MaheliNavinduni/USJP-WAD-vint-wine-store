'use client';

import { useId } from 'react';

/**
 * Labelled text input. Every field on the site goes through this so labels,
 * required markers, error text and aria wiring stay consistent.
 */
export default function FormInput({
  label,
  optional = false,
  error,
  type = 'text',
  className = '',
  ...rest
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`vint-field${error ? ' vint-field--invalid' : ''} ${className}`.trim()}>
      <label className="vint-field__label" htmlFor={id}>
        {label}
        {optional && <span className="vint-field__optional"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        className="vint-input"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <span className="vint-field__error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
