import { OfferShowcase } from "@/components/offer-showcase";
import type { EvareadyOffer } from "@/data/offers";

type CompactOfferStripProps = {
  offers: readonly EvareadyOffer[];
  heading?: string;
  className?: string;
  id?: string;
};

export function CompactOfferStrip({
  offers,
  heading = "Current offers",
  className = "",
  id,
}: CompactOfferStripProps) {
  if (!offers.length) {
    return null;
  }

  return (
    <section
      id={id}
      className={["ev-compact-offer-strip ev-storm-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={id ? `${id}-heading` : undefined}
      data-compact-offer-strip
    >
      <div className="ev-compact-offer-strip__inner">
        <h2 id={id ? `${id}-heading` : undefined} className="sr-only">
          {heading}
        </h2>
        <OfferShowcase
          offers={offers}
          gridClassName="ev-compact-offer-strip__grid"
        />
      </div>
    </section>
  );
}
