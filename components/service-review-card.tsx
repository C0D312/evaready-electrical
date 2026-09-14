import Link from "next/link";
import type { ReactNode } from "react";

export function ServiceReviewCard({ enabled = true, href, className, children }: {
  enabled?: boolean; href: string; className: string; children: ReactNode;
}) {
  return enabled ? (
    <article className={`${className} service-review-card`} data-service-review-card>
      {children}
    </article>
  ) : <Link href={href} className={className}>{children}</Link>;
}

export function ServiceReviewCardAction({ href, label, action, className = "", children }: {
  href: string; label: string; action: string; className?: string; children: ReactNode;
}) {
  return (
    <Link href={href} aria-label={`${action}: ${label}`}
      className={`service-review-card__action ${className}`}>
      {children}
    </Link>
  );
}
