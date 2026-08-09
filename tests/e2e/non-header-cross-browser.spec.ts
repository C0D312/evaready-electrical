import { expect, test, type ConsoleMessage, type Response } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

const routes = [
  { label: "homepage", route: "", selector: ".home-brand-hero" },
  {
    label: "emergency",
    route: "emergency-electrician-sydney/",
    selector: ".brand-internal-hero",
  },
  {
    label: "panania",
    route:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    selector: ".brand-internal-hero",
  },
] as const;

test("representative non-header heroes remain functional across browsers", async ({
  page,
}, testInfo) => {
  const baseUrl = String(testInfo.project.use.baseURL ?? "");
  const expectedOrigin = new URL(baseUrl).origin;

  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );
  await page.route("https://maps.googleapis.com/**", (route) => route.abort());

  for (const definition of routes) {
    const firstPartyFailures: string[] = [];
    const firstPartyConsoleErrors: string[] = [];
    const responseHandler = (response: Response) => {
      if (
        response.status() >= 400 &&
        new URL(response.url()).origin === expectedOrigin
      ) {
        firstPartyFailures.push(`${response.status()} ${response.url()}`);
      }
    };
    const consoleHandler = (message: ConsoleMessage) => {
      if (message.type() !== "error") return;
      const source = message.location().url;
      if (source && new URL(source).origin === expectedOrigin) {
        firstPartyConsoleErrors.push(`${source}: ${message.text()}`);
      }
    };

    page.on("response", responseHandler);
    page.on("console", consoleHandler);

    const target = resolvePreviewUrl(baseUrl, definition.route);
    const response = await page.goto(target.href, {
      waitUntil: "networkidle",
    });

    expect(response?.status(), definition.label).toBe(200);
    expect(new URL(page.url()).pathname, definition.label).toContain(
      "/evaready-electrical/",
    );

    const hero = page.locator(definition.selector).first();
    const image = hero.locator(
      "img.brand-hero-image, img.brand-internal-hero-image",
    );
    await expect(hero, `${definition.label} hero`).toBeVisible();
    await expect(image, `${definition.label} hero image`).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const imageElement = element as HTMLImageElement;
          return {
            complete: imageElement.complete,
            naturalHeight: imageElement.naturalHeight,
            naturalWidth: imageElement.naturalWidth,
          };
        }),
      )
      .toMatchObject({ complete: true });
    const naturalSize = await image.evaluate((element) => {
      const imageElement = element as HTMLImageElement;
      return {
        height: imageElement.naturalHeight,
        width: imageElement.naturalWidth,
      };
    });
    expect(naturalSize.width, `${definition.label} image width`).toBeGreaterThan(0);
    expect(naturalSize.height, `${definition.label} image height`).toBeGreaterThan(0);
    expect(
      naturalSize.width / naturalSize.height,
      `${definition.label} image ratio`,
    ).toBeCloseTo(4 / 3, 2);

    const layout = await page.locator("main#main-content").evaluate((main) => {
      const rect = main.getBoundingClientRect();
      return {
        mainRight: rect.right,
        mainScrollWidth: main.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      };
    });
    expect(
      layout.mainScrollWidth - layout.viewportWidth,
      `${definition.label} main-content overflow`,
    ).toBeLessThanOrEqual(2);
    expect(layout.mainRight, `${definition.label} main-content boundary`).toBeLessThanOrEqual(
      layout.viewportWidth + 2,
    );

    await expect(
      page.locator('main#main-content [data-conversion-action="phone-click"]').first(),
      `${definition.label} call conversion`,
    ).toBeAttached();
    await expect(
      page.locator('main#main-content [data-conversion-action="quote-click"]').first(),
      `${definition.label} quote conversion`,
    ).toBeAttached();

    expect(firstPartyFailures, definition.label).toEqual([]);
    expect(firstPartyConsoleErrors, definition.label).toEqual([]);
    page.off("response", responseHandler);
    page.off("console", consoleHandler);
  }
});
