import { OfferCard } from "@/components/offer-card";
import type { EvareadyOffer } from "@/data/offers";

type CompactOfferStripProps = {
  offers: readonly EvareadyOffer[];
  heading?: string;
  intro?: string;
  className?: string;
  id?: string;
};

export function CompactOfferStrip({
  offers,
  heading = "Current offers",
  intro = "Eligible offers can be applied where the job scope and terms match. Unsafe or active faults should be handled by phone first.",
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
        <div className="ev-compact-offer-strip__intro">
          <p>Current Evaready offers</p>
          <h2 id={id ? `${id}-heading` : undefined}>{heading}</h2>
          <span>{intro}</span>
        </div>

        <div className="ev-compact-offer-strip__grid">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              variant="compact"
              showImage={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
