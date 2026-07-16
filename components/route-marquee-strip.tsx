import { BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

const trustItems = [
  { label: "Open 24/7", icon: Clock3 },
  { label: "NSW Licence 398937C", icon: ShieldCheck },
  { label: "Level 2 Electrician", icon: BadgeCheck },
] as const;

export function RouteMarqueeStrip() {
  return (
    <section
      className="emergency-issue-marquee ev-static-trust-strip"
      aria-label="Verified business details"
    >
      <div
        id="route-service-highlights"
        className="emergency-issue-marquee__viewport ev-static-trust-strip__inner"
      >
        <div className="emergency-issue-marquee__track ev-static-trust-strip__track">
          <ul className="emergency-issue-marquee__group ev-static-trust-strip__list">
            {trustItems.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="emergency-issue-chip ev-static-trust-strip__item"
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
