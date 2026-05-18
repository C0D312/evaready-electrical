import Link from "next/link";
import { Bolt, Flame, MapPin, Wrench } from "lucide-react";

const mobileNavItems = [
  {
    href: "/emergency-electrician-sydney",
    label: "Emergency Electrician",
    icon: Flame,
    className: "border-red-200 bg-red-50 text-red-700",
  },
  {
    href: "/level-2-electrician-sydney",
    label: "Level 2 Electrician",
    icon: Bolt,
    className: "border-blue-200 bg-blue-50 text-blue-800",
  },
  {
    href: "/services",
    label: "Electrical Services",
    icon: Wrench,
    className: "border-slate-200 bg-slate-50 text-slate-800",
  },
  {
    href: "/service-areas",
    label: "Service Areas",
    icon: MapPin,
    className: "border-slate-200 bg-slate-50 text-slate-800",
  },
];

export function MobilePrimaryNav() {
  return (
    <nav
      aria-label="Primary mobile services"
      className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white px-3 pb-3 pt-2 lg:hidden"
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-2 text-center text-[13px] font-black leading-tight shadow-sm ${item.className}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
