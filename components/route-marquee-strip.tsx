import {
  BadgeCheck,
  Camera,
  Clock3,
  FileText,
  MapPin,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

const routeHighlights = [
  { label: "Open 24/7 for urgent faults", icon: Clock3 },
  { label: "NSW licensed electrical work", icon: ShieldCheck },
  { label: "Emergency and Level 2 help", icon: BadgeCheck },
  { label: "Sydney and surrounding regions", icon: MapPin },
  { label: "Call first if unsafe", icon: PhoneCall },
  { label: "Quote planned work", icon: FileText },
  { label: "Photos and job notes", icon: Camera },
] as const;

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
              {routeHighlights.map(({ label, icon: Icon }) => (
                <li key={`${groupIndex}-${label}`} className="emergency-issue-chip">
                  <Icon aria-hidden="true" />
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
