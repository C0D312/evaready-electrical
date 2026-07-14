import { OfferCard } from "@/components/offer-card";
import type { EvareadyOffer } from "@/data/offers";
import { getOffersForPlacement } from "@/data/offers";

type OffersSectionProps = {
  offers?: readonly EvareadyOffer[];
  id?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  className?: string;
};

export function OffersSection({
  offers = getOffersForPlacement("homepage"),
  id = "current-electrical-offers",
  eyebrow = "Current offers",
  heading = "Current Electrical Offers",
  intro = "Use the offer that matches the job. Call first for unsafe electrical faults, or send details through the quote form for planned work.",
  className = "",
}: OffersSectionProps) {
  return (
    <section
      id={id}
      className={["ev-offers-section ev-storm-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${id}-heading`}
      data-offers-section
    >
      <div className="ev-offers-section__inner">
        <div className="ev-offers-section__intro">
          <p className="ev-offers-section__eyebrow">{eyebrow}</p>
          <h2 id={`${id}-heading`}>{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="ev-offers-grid">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
