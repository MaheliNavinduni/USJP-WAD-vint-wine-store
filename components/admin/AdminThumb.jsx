import Image from 'next/image';

/**
 * The single product thumbnail used everywhere in the admin area — inventory
 * and product tables, the order detail screen, and the image field on the
 * product form.
 *
 * Every thumbnail is a fixed 3:4 box with the picture contained inside it, so
 * a tall bottle and a tall glass both sit centred at the same size instead of
 * each screen picking its own dimensions. The image is absolutely positioned
 * inside a clipped box, so it cannot spill out while the page is loading.
 *
 * @param {'sm'|'lg'} size  sm (48x64) in tables, lg (72x96) on detail screens
 */
export default function AdminThumb({ src, alt = '', size = 'sm' }) {
  const dimensions = size === 'lg' ? { width: 72, height: 96 } : { width: 48, height: 64 };

  return (
    <span className={`vint-thumb vint-thumb--${size}`}>
      <Image src={src} alt={alt} width={dimensions.width} height={dimensions.height} />
    </span>
  );
}
