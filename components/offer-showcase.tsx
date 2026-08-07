import { ArrowRight, Phone } from "lucide-react";
import { GoogleRatingSeal } from "@/components/google-rating-seal";
import { OfferCard } from "@/components/offer-card";
import { offerPolicy, type EvareadyOffer } from "@/data/offers";
import { business } from "@/data/site";

type OfferShowcaseProps = {
  offers: readonly EvareadyOffer[];
  gridClassName: string;
};

export function OfferShowcase({ offers, gridClassName }: OfferShowcaseProps) {
  return (
    <>
      <div className="ev-offers-proof" data-offers-google-proof>
        <GoogleRatingSeal
          compact
          reviewsLinkLabel="Read reviews"
          showLeaveReview={false}
          variant="offers"
        />
      </div>

      <div className={gridClassName}>
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      <div className="ev-offers-actions" aria-label="Offer enquiry options">
        <a
          href={business.phoneHref}
          className="ev-btn ev-btn--call ev-offers-actions__button"
          data-conversion-action="phone-click"
          aria-label={business.callCta}
        >
          <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{business.callCta}</span>
        </a>
        <a
          href={business.bookingUrl}
          className="ev-btn ev-btn--quote ev-offers-actions__button"
          data-conversion-action="quote-click"
          data-quote-trigger="true"
          aria-haspopup="dialog"
          aria-label={`${business.quoteCta} from Evaready Electrical`}
        >
          <span>{business.quoteCta}</span>
          <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
        </a>
      </div>

      <details className="ev-offers-terms">
        <summary>View offer terms</summary>
        <div className="ev-offers-terms__grid">
          {offers.map((offer) => (
            <section
              key={offer.id}
              className="ev-offers-terms__item"
              data-offer-term-id={offer.id}
            >
              <h3>{offer.title}</h3>
              <p>
                <strong>Applies to:</strong> {offer.appliesTo}
              </p>
              <p>{offer.terms}</p>
            </section>
          ))}
        </div>
        <p className="ev-offers-terms__policy">
          <strong>All offers:</strong> {offerPolicy.stacking}
        </p>
      </details>
    </>
  );
}
