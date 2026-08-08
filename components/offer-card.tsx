import Image from "next/image";
import type { EvareadyOffer } from "@/data/offers";
import { assetPath } from "@/data/site";

type OfferCardProps = {
  offer: EvareadyOffer;
  className?: string;
};

export function OfferCard({
  offer,
  className = "",
}: OfferCardProps) {
  const isEmergency = offer.ctaType === "call";
  const imagePath = assetPath(offer.image);
  const image360Path = assetPath(
    offer.image.replace(/\.webp$/, "-360.webp"),
  );
  const image480Path = assetPath(
    offer.image.replace(/\.webp$/, "-480.webp"),
  );
  const image720Path = assetPath(
    offer.image.replace(/\.webp$/, "-720.webp"),
  );

  return (
    <article
      className={[
        "ev-offer-card",
        isEmergency ? "ev-offer-card--emergency" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-offer-card
      data-offer-id={offer.id}
    >
      <div className="ev-offer-card__media">
        <picture className="ev-offer-card__picture">
          <source
            type="image/webp"
            srcSet={`${image360Path} 360w, ${image480Path} 480w, ${image720Path} 720w, ${imagePath} ${offer.imageWidth}w`}
            sizes="(max-width: 1180px) 46vw, 300px"
          />
          <Image
            src={imagePath}
            alt={offer.alt}
            width={offer.imageWidth}
            height={offer.imageHeight}
            sizes="(max-width: 1180px) 46vw, 300px"
            loading="lazy"
            className="ev-offer-card__image"
          />
        </picture>
      </div>
    </article>
  );
}
