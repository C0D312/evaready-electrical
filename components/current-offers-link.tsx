import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CurrentOffersLinkProps = {
  className?: string;
};

export function CurrentOffersLink({ className = "" }: CurrentOffersLinkProps) {
  return (
    <Link
      href="/#current-electrical-offers"
      data-compact-offers-link="true"
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-300/25 px-4 py-2 text-sm font-black text-cyan-100 transition hover:border-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>View current offers and terms</span>
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </Link>
  );
}
