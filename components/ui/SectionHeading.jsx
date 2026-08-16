import Reveal from './Reveal';

/**
 * Heading block used above every major section.
 *
 * @param {'left'|'center'|'between'} align  'between' puts `action` on the right
 * @param {React.ReactNode} action           e.g. a "View all wines" button
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
  as: Tag = 'h2',
  id,
}) {
  const classes = ['vint-heading', align !== 'left' && `vint-heading--${align}`]
    .filter(Boolean)
    .join(' ');

  if (align === 'between') {
    return (
      <Reveal className={classes}>
        <div>
          {eyebrow && <span className="vint-eyebrow">{eyebrow}</span>}
          <Tag className="vint-heading__title" id={id}>{title}</Tag>
          {subtitle && <p className="vint-heading__subtitle">{subtitle}</p>}
        </div>
        {action}
      </Reveal>
    );
  }

  return (
    <Reveal className={classes}>
      {eyebrow && <span className="vint-eyebrow">{eyebrow}</span>}
      <Tag className="vint-heading__title" id={id}>{title}</Tag>
      {subtitle && <p className="vint-heading__subtitle">{subtitle}</p>}
      {action}
    </Reveal>
  );
}
