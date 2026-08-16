'use client';

import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Labelled dropdown.
 * @param {Array<{value: string, label: string}>} options
 */
export default function SelectInput({
  label,
  options = [],
  error,
  placeholder,
  className = '',
  ...rest
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`vint-field${error ? ' vint-field--invalid' : ''} ${className}`.trim()}>
      <label className="vint-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="vint-select-wrap">
        <select
          id={id}
          className="vint-select"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="vint-select-wrap__chevron" size={18} aria-hidden="true" />
      </div>
      {error && (
        <span className="vint-field__error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
