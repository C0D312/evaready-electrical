import { Zap } from "lucide-react";

const routeHighlights = [
  "Open 24/7 for urgent faults",
  "NSW licensed electrical work",
  "Emergency and Level 2 help",
  "Sydney and surrounding regions",
  "Call first if unsafe",
  "Quote planned work",
  "Photos and job notes",
] as const;

// Two sequences per group keep each half wider than an ultrawide viewport.
// The second identical group is the seamless animation copy.
const marqueeHighlights = [...routeHighlights, ...routeHighlights] as const;

export function RouteMarqueeStrip() {
  return (
    <section
      className="emergency-issue-marquee"
      aria-label="Electrical service highlights"
    >
      <div
        id="route-service-highlights"
        className="emergency-issue-marquee__viewport"
      >
        <div className="emergency-issue-marquee__track">
          {[0, 1].map((groupIndex) => (
            <ul
              key={groupIndex}
              className="emergency-issue-marquee__group"
              aria-hidden={groupIndex === 1 ? "true" : undefined}
            >
              {marqueeHighlights.map((label, highlightIndex) => (
                <li
                  key={`${groupIndex}-${highlightIndex}-${label}`}
                  className="emergency-issue-chip"
                  aria-hidden={groupIndex === 1 || highlightIndex >= routeHighlights.length ? "true" : undefined}
                >
                  <Zap aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
