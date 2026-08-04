import { OfferShowcase } from "@/components/offer-showcase";
import type { EvareadyOffer } from "@/data/offers";
import { getOffersForPlacement } from "@/data/offers";

type OffersSectionProps = {
  offers?: readonly EvareadyOffer[];
  id?: string;
  heading?: string;
  className?: string;
};

export function OffersSection({
  offers = getOffersForPlacement("homepage"),
  id = "current-electrical-offers",
  heading = "Current Electrical Offers",
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
        <h2 id={`${id}-heading`} className="sr-only">
          {heading}
        </h2>
        <OfferShowcase offers={offers} gridClassName="ev-offers-grid" />
      </div>
    </section>
  );
}
