import assert from "node:assert/strict";
import test from "node:test";
import type { OwnerApprovedLocationIndexationDecision } from "../../data/location-indexation-decisions";
import {
  auditLocationIndexation,
  isActualCalendarDate,
  parseRobotsDirectives,
  validateDecisionRegistry,
  type MeasuredLocationRoute,
} from "../../scripts/lib/location-indexation-audit";

const routes = [
  "/service-areas/synthetic/area/alpha/",
  "/service-areas/synthetic/area/bravo/",
  "/service-areas/synthetic/area/charlie/",
  "/service-areas/synthetic/area/delta/",
];

function measured(
  route: string,
  overrides: Partial<MeasuredLocationRoute> = {},
): MeasuredLocationRoute {
  const canonical = `https://example.invalid${route}`;
  return {
    accessible: true,
    callPath: true,
    canonical,
    expectedCanonical: canonical,
    inSitemap: true,
    quotePath: true,
    redirect: false,
    robotsContent: "index, follow",
    route,
    ...overrides,
  };
}

test("robots parsing never treats nofollow as follow", () => {
  assert.equal(parseRobotsDirectives("index, nofollow").status, "index, nofollow");
});

test("robots parsing rejects contradictory directives", () => {
  const result = parseRobotsDirectives("index, noindex, follow, nofollow");
  assert.equal(result.status, "contradictory");
  assert.equal(result.issues.length, 2);
});

test("calendar dates are validated rather than shape-checked", () => {
  assert.equal(isActualCalendarDate("2026-08-09"), true);
  assert.equal(isActualCalendarDate("2026-02-29"), false);
  assert.equal(isActualCalendarDate("2026-13-01"), false);
});

test("decision validation rejects duplicate and unknown routes", () => {
  const decisions = [
    { decision: "index-ready", decisionDate: "2026-08-09", route: routes[0] },
    { decision: "index-ready", decisionDate: "2026-08-09", route: routes[0] },
    {
      decision: "index-ready",
      decisionDate: "2026-02-29",
      route: "/service-areas/synthetic/area/unknown/",
    },
  ] as OwnerApprovedLocationIndexationDecision[];
  const issues = validateDecisionRegistry(decisions, new Set(routes));
  assert.ok(issues.some((issue) => issue.includes("duplicate route")));
  assert.ok(issues.some((issue) => issue.includes("unknown route")));
  assert.ok(issues.some((issue) => issue.includes("invalid calendar date")));
});

test("baseline mode measures unchanged output rather than hard-coding it", () => {
  const passing = auditLocationIndexation({
    decisions: [],
    expectedRouteCount: routes.length,
    knownRoutes: routes,
    measuredRoutes: routes.map((route) => measured(route)),
    mode: "baseline",
  });
  assert.equal(passing.technicalBaselineResult, "PASS");
  assert.equal(passing.indexationBehaviorChanged, false);
  assert.equal(
    passing.overallLaunchReadiness,
    "BLOCKED — OWNER INDEXATION DECISIONS MISSING",
  );

  const changed = auditLocationIndexation({
    decisions: [],
    expectedRouteCount: routes.length,
    knownRoutes: routes,
    measuredRoutes: routes.map((route, index) =>
      measured(
        route,
        index === 0
          ? { inSitemap: false, robotsContent: "noindex, follow" }
          : {},
      ),
    ),
    mode: "baseline",
  });
  assert.equal(changed.technicalBaselineResult, "FAIL");
  assert.equal(changed.indexationBehaviorChanged, true);
});

test("applied-decision mode validates future behavior with synthetic fixtures", () => {
  const decisions = [
    { decision: "index-ready", decisionDate: "2026-08-09", route: routes[0] },
    {
      decision: "hold-noindex-candidate",
      decisionDate: "2026-08-09",
      route: routes[1],
    },
    {
      decision: "consolidation-review",
      decisionDate: "2026-08-09",
      route: routes[2],
    },
  ] as OwnerApprovedLocationIndexationDecision[];
  const baseline = routes.map((route) => measured(route));
  const applied = routes.map((route, index) =>
    index === 1
      ? measured(route, {
          inSitemap: false,
          robotsContent: "noindex, follow",
        })
      : measured(route),
  );
  const result = auditLocationIndexation({
    baselineRoutes: baseline,
    decisions,
    expectedRouteCount: routes.length,
    knownRoutes: routes,
    measuredRoutes: applied,
    mode: "applied-decision",
  });
  assert.equal(result.technicalAppliedDecisionResult, "PASS");
  assert.equal(result.issues.length, 0);
  assert.equal(result.currentCounts.noindex, 1);
  assert.equal(result.indexationBehaviorChanged, true);
});

test("applied-decision mode rejects nofollow and automatic unreviewed changes", () => {
  const decisions = [
    {
      decision: "hold-noindex-candidate",
      decisionDate: "2026-08-09",
      route: routes[0],
    },
  ] as OwnerApprovedLocationIndexationDecision[];
  const result = auditLocationIndexation({
    baselineRoutes: routes.map((route) => measured(route)),
    decisions,
    expectedRouteCount: routes.length,
    knownRoutes: routes,
    measuredRoutes: routes.map((route, index) =>
      measured(
        route,
        index === 0
          ? { inSitemap: false, robotsContent: "noindex, nofollow" }
          : index === 3
            ? { inSitemap: false }
            : {},
      ),
    ),
    mode: "applied-decision",
  });
  assert.equal(result.technicalAppliedDecisionResult, "FAIL");
  assert.ok(result.issues.some((issue) => issue.includes("noindex, nofollow")));
  assert.ok(result.issues.some((issue) => issue.includes("unreviewed decision changed")));
});
