import { expect, test } from "./support/phase3e2-contained-test";
import { routes, representatives, scales, controlProfiles } from "./support/phase3e2-routes";
import { attach, openRoute, setTextScale, heroQuote, finalQuote, quoteCycle, assertLayout } from "./support/phase3e2-helpers";

test.use({ serviceWorkers: "block" });

// No profile means all 21 routes in every selected Playwright project.
// Representative-only coverage requires an explicit matching project.
const requestedProfile = process.env.EV3E2_PROFILE;
if (requestedProfile !== undefined && !(controlProfiles as readonly string[]).includes(requestedProfile)) {
  throw new Error(`Unsupported EV3E2_PROFILE: ${requestedProfile}`);
}
const allRoutes = requestedProfile === undefined || requestedProfile === "desktop-chromium-1440" || requestedProfile === "mobile-chrome-390";
const cases = allRoutes ? routes : routes.filter(row => representatives.has(row.route));

for (const row of cases) for (const scale of scales) for (const zone of ["hero", "final"] as const) {
  test(`${row.relativeRoute}: natural ${zone} quote root-${scale}`, async ({ page, baseURL }, testInfo) => {
    if (requestedProfile !== undefined) expect(testInfo.project.name).toBe(requestedProfile);
    const errors = await openRoute(page, baseURL, row);
    await setTextScale(page, scale);
    const quote = zone === "hero" ? heroQuote(page) : finalQuote(page);
    let completed = false;
    try {
      await quoteCycle(page, row, quote, "Escape", "keyboard", false);
      await quoteCycle(page, row, quote, "Back", "pointer", true);
      const section = zone === "hero" ? page.locator("main > .brand-internal-hero") : page.locator("main > section:last-of-type");
      await assertLayout(section, `${zone}-after-real-quote-cycles`);
      expect(errors).toEqual([]);
      completed = true;
    } finally {
      await attach("quote-case", { route: row.route, scale, zone, profile: testInfo.project.name, errors,
        pathname: new URL(page.url()).pathname, completed });
    }
  });
}
