import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, Phone, ShieldCheck } from "lucide-react";
import type { EvareadyOffer } from "@/data/offers";
import { assetPath } from "@/data/site";

type OfferCardProps = {
  offer: EvareadyOffer;
  variant?: "feature" | "compact";
  showImage?: boolean;
  className?: string;
};

function OfferCta({ offer }: { offer: EvareadyOffer }) {
  const isCall = offer.ctaType === "call";
  const isQuote = offer.ctaType === "quote";
  const ctaClassName = `ev-btn ${
    isCall ? "ev-btn--call" : "ev-btn--quote"
  } ev-offer-card__cta`;

  if (offer.ctaType === "service") {
    return (
      <Link href={offer.href} className="ev-btn ev-btn--secondary ev-offer-card__cta">
        <span>{offer.ctaLabel}</span>
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a
      href={offer.href}
      className={ctaClassName}
      data-conversion-action={isCall ? "phone-click" : "quote-click"}
      data-quote-trigger={isQuote ? "true" : undefined}
      aria-haspopup={isQuote ? "dialog" : undefined}
      aria-label={`${offer.ctaLabel} for ${offer.title}`}
    >
      {isCall ? (
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <BadgePercent className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span>{offer.ctaLabel}</span>
      {!isCall ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
    </a>
  );
}

export function OfferCard({
  offer,
  variant = "feature",
  showImage = variant === "feature",
  className = "",
}: OfferCardProps) {
  const isEmergency = offer.ctaType === "call";

  return (
    <article
      className={[
        "ev-offer-card",
        `ev-offer-card--${variant}`,
        isEmergency ? "ev-offer-card--emergency" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-offer-card
      data-offer-id={offer.id}
    >
      {showImage ? (
        <div className="ev-offer-card__media">
          <Image
            src={assetPath(offer.image)}
            alt={offer.alt}
            width={960}
            height={720}
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 45vw, 290px"
            loading="lazy"
            className="ev-offer-card__image"
          />
        </div>
      ) : null}

      <div className="ev-offer-card__body">
        <div className="ev-offer-card__label">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{offer.shortTitle}</span>
        </div>
        <h3>{offer.title}</h3>
        <p className="ev-offer-card__description">{offer.description}</p>
        <p className="ev-offer-card__applies">
          <strong>Applies to:</strong> {offer.appliesTo}
        </p>
        <p className="ev-offer-card__terms">
          <strong>Offer terms:</strong> {offer.terms}
        </p>
        <OfferCta offer={offer} />
      </div>
    </article>
  );
}
