import Link from 'next/link';

/**
 * The single button used everywhere on the site.
 *
 * Renders a <Link> when given `href`, otherwise a real <button>. That keeps
 * navigation keyboard- and screen-reader-correct without callers thinking
 * about it.
 *
 * @param {'primary'|'outline'|'light'|'ghost-light'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {React.ReactNode} icon  Rendered after the label; slides on hover.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  square = false,
  block = false,
  className = '',
  ...rest
}) {
  const classes = [
    'vint-btn',
    `vint-btn--${variant}`,
    size !== 'md' && `vint-btn--${size}`,
    square && 'vint-btn--square',
    block && 'vint-btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {icon && <span className="vint-btn__icon" aria-hidden="true">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
