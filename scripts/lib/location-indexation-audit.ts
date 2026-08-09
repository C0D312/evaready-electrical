import {
  locationIndexationDecisionStatuses,
  type LocationIndexationDecisionStatus,
  type OwnerApprovedLocationIndexationDecision,
} from "../../data/location-indexation-decisions";

export type RobotsIndexStatus =
  | "index, follow"
  | "index, nofollow"
  | "noindex, follow"
  | "noindex, nofollow"
  | "contradictory"
  | "unknown";

export type MeasuredLocationRoute = {
  accessible: boolean;
  callPath: boolean;
  canonical: string;
  expectedCanonical: string;
  inSitemap: boolean;
  quotePath: boolean;
  redirect: boolean;
  robotsContent: string;
  route: string;
};

export type LocationRouteAudit = MeasuredLocationRoute & {
  decision: LocationIndexationDecisionStatus;
  indexStatus: RobotsIndexStatus;
  robotsTokens: string[];
  selfCanonical: boolean;
};

export type LocationIndexationAuditMode = "applied-decision" | "baseline";

type AuditOptions = {
  baselineRoutes?: readonly MeasuredLocationRoute[];
  decisions: readonly OwnerApprovedLocationIndexationDecision[];
  expectedRouteCount: number;
  knownRoutes: readonly string[];
  measuredRoutes: readonly MeasuredLocationRoute[];
  mode: LocationIndexationAuditMode;
};

export type LocationIndexationAuditResult = {
  currentCounts: {
    callPaths: number;
    indexFollow: number;
    noindex: number;
    quotePaths: number;
    redirects: number;
    selfCanonicals: number;
    sitemapSuburbs: number;
    suburbRoutes: number;
  };
  decisionCounts: Record<LocationIndexationDecisionStatus, number>;
  indexationBehaviorChanged: boolean;
  issues: string[];
  launchDecisionGate: string;
  mode: LocationIndexationAuditMode;
  overallLaunchReadiness: string;
  routeAudits: LocationRouteAudit[];
  technicalAppliedDecisionResult: "NOT RUN" | "PASS" | "FAIL";
  technicalBaselineResult: "NOT RUN" | "PASS" | "FAIL";
};

const indexDirectiveTokens = new Set(["all", "index", "noindex", "none"]);
const followDirectiveTokens = new Set(["all", "follow", "nofollow", "none"]);

export function tokenizeRobotsDirectives(content: string) {
  return content
    .toLowerCase()
    .split(/[\s,;]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function parseRobotsDirectives(content: string) {
  const tokens = tokenizeRobotsDirectives(content);
  const indexTokens = tokens.filter((token) => indexDirectiveTokens.has(token));
  const followTokens = tokens.filter((token) => followDirectiveTokens.has(token));
  const hasIndex = indexTokens.some((token) => token === "all" || token === "index");
  const hasNoindex = indexTokens.some(
    (token) => token === "noindex" || token === "none",
  );
  const hasFollow = followTokens.some(
    (token) => token === "all" || token === "follow",
  );
  const hasNofollow = followTokens.some(
    (token) => token === "nofollow" || token === "none",
  );
  const issues: string[] = [];

  if (hasIndex && hasNoindex) {
    issues.push("robots directives contain both index and noindex");
  }
  if (hasFollow && hasNofollow) {
    issues.push("robots directives contain both follow and nofollow");
  }

  let status: RobotsIndexStatus = "unknown";
  if (issues.length) {
    status = "contradictory";
  } else if (hasIndex && hasFollow) {
    status = "index, follow";
  } else if (hasIndex && hasNofollow) {
    status = "index, nofollow";
  } else if (hasNoindex && hasFollow) {
    status = "noindex, follow";
  } else if (hasNoindex && hasNofollow) {
    status = "noindex, nofollow";
  }

  return { issues, status, tokens };
}

export function isActualCalendarDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function validateDecisionRegistry(
  decisions: readonly OwnerApprovedLocationIndexationDecision[],
  knownRoutes: ReadonlySet<string>,
) {
  const issues: string[] = [];
  const seen = new Set<string>();

  for (const record of decisions) {
    if (!knownRoutes.has(record.route)) {
      issues.push(`Decision registry contains an unknown route: ${record.route}`);
    }
    if (seen.has(record.route)) {
      issues.push(`Decision registry contains a duplicate route: ${record.route}`);
    }
    seen.add(record.route);
    if (!locationIndexationDecisionStatuses.includes(record.decision)) {
      issues.push(
        `Decision registry contains an unsupported decision for ${record.route}: ${record.decision}`,
      );
    }
    if (!isActualCalendarDate(record.decisionDate)) {
      issues.push(
        `Decision registry contains an invalid calendar date for ${record.route}: ${record.decisionDate}`,
      );
    }
  }

  return issues;
}

function decisionForRoute(
  route: string,
  decisions: readonly OwnerApprovedLocationIndexationDecision[],
): LocationIndexationDecisionStatus {
  return decisions.find((record) => record.route === route)?.decision ?? "unreviewed";
}

function behaviorSignature(route: LocationRouteAudit) {
  return JSON.stringify({
    accessible: route.accessible,
    callPath: route.callPath,
    indexStatus: route.indexStatus,
    inSitemap: route.inSitemap,
    quotePath: route.quotePath,
    redirect: route.redirect,
    selfCanonical: route.selfCanonical,
  });
}

function baselineAuditForRoute(route: string): LocationRouteAudit {
  return {
    accessible: true,
    callPath: true,
    canonical: "self",
    decision: "unreviewed",
    expectedCanonical: "self",
    indexStatus: "index, follow",
    inSitemap: true,
    quotePath: true,
    redirect: false,
    robotsContent: "index, follow",
    robotsTokens: ["index", "follow"],
    route,
    selfCanonical: true,
  };
}

function assertCommonRouteRequirements(
  route: LocationRouteAudit,
  issues: string[],
) {
  if (!route.accessible) issues.push(`${route.route} is not accessible`);
  if (!route.selfCanonical) {
    issues.push(`${route.route} does not use its expected self-canonical`);
  }
  if (route.redirect) issues.push(`${route.route} unexpectedly redirects`);
  if (!route.callPath || !route.quotePath) {
    issues.push(`${route.route} is missing its Call or Quote conversion pathway`);
  }
}

function assertAppliedDecision(
  route: LocationRouteAudit,
  baseline: LocationRouteAudit,
  issues: string[],
) {
  assertCommonRouteRequirements(route, issues);

  if (route.decision === "index-ready") {
    if (route.indexStatus !== "index, follow") {
      issues.push(`${route.route} index-ready output is ${route.indexStatus}`);
    }
    if (!route.inSitemap) {
      issues.push(`${route.route} index-ready output is absent from the sitemap`);
    }
    return;
  }

  if (route.decision === "hold-noindex-candidate") {
    if (route.indexStatus !== "noindex, follow") {
      issues.push(
        `${route.route} hold-noindex-candidate output is ${route.indexStatus}`,
      );
    }
    if (route.inSitemap) {
      issues.push(
        `${route.route} hold-noindex-candidate output remains in the sitemap`,
      );
    }
    return;
  }

  if (behaviorSignature(route) !== behaviorSignature(baseline)) {
    issues.push(
      `${route.route} ${route.decision} decision changed public output automatically`,
    );
  }
}

export function auditLocationIndexation(
  options: AuditOptions,
): LocationIndexationAuditResult {
  const issues: string[] = [];
  const knownRouteSet = new Set(options.knownRoutes);
  const measuredByRoute = new Map<string, MeasuredLocationRoute>();
  const baselineByRoute = new Map(
    (options.baselineRoutes ?? []).map((route) => [route.route, route]),
  );

  if (knownRouteSet.size !== options.knownRoutes.length) {
    issues.push("Known suburb route inventory contains duplicates");
  }
  if (knownRouteSet.size !== options.expectedRouteCount) {
    issues.push(
      `Expected ${options.expectedRouteCount} known suburb routes; found ${knownRouteSet.size}`,
    );
  }
  issues.push(...validateDecisionRegistry(options.decisions, knownRouteSet));
  if (options.mode === "baseline" && options.decisions.length !== 0) {
    issues.push("Baseline mode requires an empty owner decision registry");
  }

  for (const measured of options.measuredRoutes) {
    if (!knownRouteSet.has(measured.route)) {
      issues.push(`Measured output contains an unknown route: ${measured.route}`);
    }
    if (measuredByRoute.has(measured.route)) {
      issues.push(`Measured output contains a duplicate route: ${measured.route}`);
    }
    measuredByRoute.set(measured.route, measured);
  }

  const routeAudits = options.knownRoutes.map((route): LocationRouteAudit => {
    const measured = measuredByRoute.get(route);
    if (!measured) {
      issues.push(`Measured output is missing route: ${route}`);
      return {
        accessible: false,
        callPath: false,
        canonical: "",
        decision: decisionForRoute(route, options.decisions),
        expectedCanonical: "",
        indexStatus: "unknown",
        inSitemap: false,
        quotePath: false,
        redirect: false,
        robotsContent: "",
        robotsTokens: [],
        route,
        selfCanonical: false,
      };
    }

    const robots = parseRobotsDirectives(measured.robotsContent);
    robots.issues.forEach((issue) => issues.push(`${route} ${issue}`));
    const audited: LocationRouteAudit = {
      ...measured,
      decision: decisionForRoute(route, options.decisions),
      indexStatus: robots.status,
      robotsTokens: robots.tokens,
      selfCanonical: measured.canonical === measured.expectedCanonical,
    };

    if (options.mode === "baseline") {
      assertCommonRouteRequirements(audited, issues);
      if (audited.indexStatus !== "index, follow") {
        issues.push(`${route} baseline output is ${audited.indexStatus}`);
      }
      if (!audited.inSitemap) {
        issues.push(`${route} baseline output is absent from the sitemap`);
      }
    } else {
      const baselineMeasured = baselineByRoute.get(route);
      if (!baselineMeasured) {
        issues.push(`Applied-decision validation is missing baseline output: ${route}`);
      }
      const baseline = baselineMeasured
        ? toAuditedRoute(baselineMeasured, "unreviewed")
        : baselineAuditForRoute(route);
      assertAppliedDecision(audited, baseline, issues);
    }

    return audited;
  });

  const baselineAudits = options.knownRoutes.map((route) => {
    const supplied = baselineByRoute.get(route);
    return supplied
      ? toAuditedRoute(supplied, "unreviewed")
      : baselineAuditForRoute(route);
  });
  const indexationBehaviorChanged = routeAudits.some(
    (route, index) =>
      behaviorSignature(route) !== behaviorSignature(baselineAudits[index]),
  );

  const decisionCounts = Object.fromEntries(
    locationIndexationDecisionStatuses.map((status) => [
      status,
      routeAudits.filter((route) => route.decision === status).length,
    ]),
  ) as Record<LocationIndexationDecisionStatus, number>;
  const currentCounts = {
    callPaths: routeAudits.filter((route) => route.callPath).length,
    indexFollow: routeAudits.filter(
      (route) => route.indexStatus === "index, follow",
    ).length,
    noindex: routeAudits.filter((route) =>
      route.indexStatus.startsWith("noindex"),
    ).length,
    quotePaths: routeAudits.filter((route) => route.quotePath).length,
    redirects: routeAudits.filter((route) => route.redirect).length,
    selfCanonicals: routeAudits.filter((route) => route.selfCanonical).length,
    sitemapSuburbs: routeAudits.filter((route) => route.inSitemap).length,
    suburbRoutes: routeAudits.length,
  };

  const allUnreviewed = decisionCounts.unreviewed === options.expectedRouteCount;
  if (options.mode === "baseline" && !allUnreviewed) {
    issues.push(
      `Baseline mode expected ${options.expectedRouteCount} unreviewed routes; found ${decisionCounts.unreviewed}`,
    );
  }
  const launchDecisionGate = allUnreviewed
    ? "BLOCKED — OWNER INDEXATION DECISIONS MISSING"
    : "OWNER DECISION REVIEW REQUIRED";
  const technicalResult = issues.length ? "FAIL" : "PASS";

  return {
    currentCounts,
    decisionCounts,
    indexationBehaviorChanged,
    issues,
    launchDecisionGate,
    mode: options.mode,
    overallLaunchReadiness:
      options.mode === "baseline"
        ? launchDecisionGate
        : "NOT EVALUATED - SYNTHETIC APPLIED-DECISION VALIDATION",
    routeAudits,
    technicalAppliedDecisionResult:
      options.mode === "applied-decision" ? technicalResult : "NOT RUN",
    technicalBaselineResult:
      options.mode === "baseline" ? technicalResult : "NOT RUN",
  };
}

function toAuditedRoute(
  route: MeasuredLocationRoute,
  decision: LocationIndexationDecisionStatus,
): LocationRouteAudit {
  const robots = parseRobotsDirectives(route.robotsContent);
  return {
    ...route,
    decision,
    indexStatus: robots.status,
    robotsTokens: robots.tokens,
    selfCanonical: route.canonical === route.expectedCanonical,
  };
}
