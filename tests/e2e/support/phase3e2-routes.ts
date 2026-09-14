import { strict as assert } from "node:assert";
import {
  phase3e2ConsolidationPairs,
  phase3e2EvidenceHolds,
  phase3e2SelectedRoutes,
  phase3e2SpecialistRoutes,
} from "../../../scripts/phase3e2-service-review";
import { githubPreviewBasePath } from "./preview-url";

export const widths = [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560] as const;
export const scales = [100, 200] as const;
export type TextScale = (typeof scales)[number];

export function requiredLoopbackBaseURL(configuredBase: string | undefined) {
  const raw = process.env.PLAYWRIGHT_BASE_URL;
  assert.ok(raw, "Set PLAYWRIGHT_BASE_URL explicitly to the approved loopback export");
  const base = new URL(raw);
  assert.equal(base.protocol, "http:", "Only an HTTP loopback export is permitted");
  assert.ok(["127.0.0.1", "localhost"].includes(base.hostname), "External hosts are prohibited");
  assert.equal(base.pathname, githubPreviewBasePath, "Use exactly /evaready-electrical/");
  assert.equal(base.username, "", "Credentials are prohibited");
  assert.equal(base.password, "", "Credentials are prohibited");
  assert.equal(base.search, "", "Base URL query strings are prohibited");
  assert.equal(base.hash, "", "Base URL fragments are prohibited");
  assert.ok(configuredBase, "Playwright baseURL is required");
  assert.equal(new URL(configuredBase).href, base.href, "The fixture and environment base URLs must match");
  return base.href;
}

const selected = [...phase3e2SelectedRoutes].sort();
const overlapRoutes = phase3e2ConsolidationPairs.flatMap(pair => [...pair.routes]);
assert.equal(phase3e2SpecialistRoutes.length, 15);
assert.equal(phase3e2ConsolidationPairs.length, 3);
assert(phase3e2ConsolidationPairs.every(pair => pair.routes.length === 2));
assert.equal(overlapRoutes.length, 6);
assert.equal(selected.length, 21);
assert.equal(new Set(selected).size, 21);
assert.deepEqual(selected, [...phase3e2SpecialistRoutes, ...overlapRoutes].sort());

export const routes = selected.map(route => {
  assert.match(route, /^\/(?:services\/[a-z0-9-]+|level-2-electrician-sydney|solar-batteries)$/);
  const generic = route.startsWith("/services/");
  const renderer = generic ? "app/services/[slug]/page.tsx" : `app${route}/page.tsx`;
  const sourceRecord = generic ? `data/service-pages.ts#${route.split("/").at(-1)}` : renderer;
  return {
    route,
    relativeRoute: `${route.slice(1)}/`,
    pathname: `${githubPreviewBasePath.slice(0, -1)}${route}/`,
    frameworkRoute: generic ? "/services/[slug]" : route,
    renderer,
    sourceRecord,
    sourceFile: sourceRecord.split("#")[0],
    hold: (phase3e2SpecialistRoutes as readonly string[]).includes(route) ? "credential" : "overlap",
    evidenceHolds: phase3e2EvidenceHolds(route),
    mainClass: generic ? "generated-storm-service" : route === "/solar-batteries" ? "core-storm-solar" : "core-storm-level2",
  };
});
export type RouteCase = (typeof routes)[number];
assert.equal(routes.filter(row => row.frameworkRoute === "/services/[slug]").length, 19);
assert.equal(new Set(routes.map(row => row.renderer)).size, 3);

// Exercise optional renderer branches and both members of every overlap pair.
export const representatives = new Set<string>([
  "/level-2-electrician-sydney", "/solar-batteries",
  "/services/consumer-mains-sydney", "/services/defect-notice-repairs-sydney",
  "/services/overhead-service-lines-sydney", "/services/smart-meter-electrician-sydney",
  "/services/split-system-air-conditioning-sydney",
  "/services/cctv-security-camera-installation-sydney", "/services/data-cabling-electrician-sydney",
  ...overlapRoutes,
]);
assert.equal(representatives.size, 15);
for (const route of representatives) assert((selected as readonly string[]).includes(route));

export const controlProfiles = [
  "desktop-chromium-1440", "desktop-firefox-1440", "desktop-webkit-1440",
  "mobile-chrome-390", "mobile-safari-390", "ipad-768", "ipad-pro-1024",
] as const;
