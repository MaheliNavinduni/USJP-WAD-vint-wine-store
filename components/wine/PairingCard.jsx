import Image from 'next/image';

/** One tile in the "Curated Pairings" row. Not a product — no link, no price. */
export default function PairingCard({ pairing }) {
  return (
    <figure className="vint-pairing">
      <div className="vint-pairing__media">
        <Image
          src={pairing.image}
          alt=""
          width={400}
          height={300}
          sizes="(max-width: 640px) 45vw, 260px"
        />
      </div>
      <figcaption className="vint-pairing__name">{pairing.name}</figcaption>
    </figure>
  );
}
