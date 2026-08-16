import Image from 'next/image';

/**
 * The premium hero used at the top of every public page.
 *
 * Structure follows the HomeHero reference: a full-bleed photograph, a dark
 * brand-coloured gradient over it, and a frosted translucent panel holding the
 * copy — restyled in VINT's burgundy/cream palette.
 *
 * @param {'home'|'page'|'compact'} variant   controls height
 * @param {string}  image      background photograph
 * @param {boolean} flipImage  mirrors the background (the supplied home photo
 *                             is reversed, which renders the label backwards)
 * @param {object}  bottle     { src, alt } floating product image, home only
 * @param {Array}   chips      [{ label, value }] small trust pills
 */
export default function HeroSection({
  variant = 'page',
  image,
  imageAlt = '',
  flipImage = false,
  eyebrow,
  title,
  subtitle,
  actions,
  chips,
  bottle,
  centered = false,
}) {
  const classes = [
    'vint-hero',
    `vint-hero--${variant}`,
    centered && 'vint-hero--centered',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes}>
      {image && (
        <div
          className={`vint-hero__bg${flipImage ? ' vint-hero__bg--flip' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
          role={imageAlt ? 'img' : 'presentation'}
          aria-label={imageAlt || undefined}
        />
      )}
      <div className="vint-hero__overlay" aria-hidden="true" />

      <div className="vint-container vint-hero__inner">
        <div className={`vint-hero__grid${bottle ? '' : ' vint-hero__grid--single'}`}>
          <div className="vint-hero__panel">
            {eyebrow && <span className="vint-eyebrow vint-eyebrow--light">{eyebrow}</span>}

            <h1 className="vint-hero__title">{title}</h1>

            {subtitle && <p className="vint-hero__subtitle">{subtitle}</p>}

            {actions && <div className="vint-hero__actions">{actions}</div>}

            {chips?.length > 0 && (
              <ul className="vint-hero__chips">
                {chips.map((chip) => (
                  <li key={chip.label} className="vint-hero__chip">
                    <strong>{chip.value}</strong> {chip.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {bottle && (
            <div className="vint-hero__visual">
              <Image
                src={bottle.src}
                alt={bottle.alt}
                width={340}
                height={800}
                priority
                className="vint-hero__bottle"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
