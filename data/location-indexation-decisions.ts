export const locationIndexationDecisionStatuses = [
  "index-ready",
  "hold-noindex-candidate",
  "consolidation-review",
  "unreviewed",
] as const;

export type LocationIndexationDecisionStatus =
  (typeof locationIndexationDecisionStatuses)[number];

export type OwnerApprovedLocationIndexationDecision = {
  decision: Exclude<LocationIndexationDecisionStatus, "unreviewed">;
  decisionDate: `${number}-${number}-${number}`;
  route: `/service-areas/${string}/`;
};

// Only explicit, route-specific owner decisions belong here. An empty registry
// deliberately leaves metadata, robots, sitemap, canonicals and routes unchanged.
export const locationIndexationDecisionRegistry: readonly OwnerApprovedLocationIndexationDecision[] =
  [];

export function getLocationIndexationDecision(
  route: `/service-areas/${string}/`,
): LocationIndexationDecisionStatus {
  return (
    locationIndexationDecisionRegistry.find(
      (record) => record.route === route,
    )?.decision ?? "unreviewed"
  );
}
