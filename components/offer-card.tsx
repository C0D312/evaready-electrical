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
        <Image
          src={assetPath(offer.image)}
          alt={offer.alt}
          width={offer.imageWidth}
          height={offer.imageHeight}
          sizes="(max-width: 1180px) 46vw, 300px"
          loading="lazy"
          className="ev-offer-card__image"
        />
      </div>
    </article>
  );
}
