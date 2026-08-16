'use client';

import { useId } from 'react';

/** Labelled multi-line input, matching FormInput's API. */
export default function TextArea({
  label,
  optional = false,
  error,
  rows = 4,
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
      <textarea
        id={id}
        rows={rows}
        className="vint-textarea"
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
