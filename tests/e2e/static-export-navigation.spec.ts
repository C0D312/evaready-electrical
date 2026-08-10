import { expect, test } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

const routeTransitions = [
  { name: "homepage", source: "", target: "services/" },
  {
    name: "services",
    source: "services/",
    target: "services/residential-electrician-sydney/",
  },
  {
    name: "service",
    source: "services/residential-electrician-sydney/",
    target: "services/",
  },
  {
    name: "fault guide",
    source: "electrical-faults/no-power-in-one-room/",
    target: "electrical-faults/",
  },
  {
    name: "region",
    source: "service-areas/canterbury-bankstown-and-inner-south-west/",
    target:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  },
  {
    name: "area",
    source:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
    target:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
  },
  {
    name: "suburb",
    source:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/panania/",
    target:
      "service-areas/canterbury-bankstown-and-inner-south-west/canterbury-bankstown/",
  },
] as const;

test.beforeEach(({ browserName }, testInfo) => {
  test.skip(
    browserName !== "chromium" || testInfo.project.name !== "desktop-chromium-1440",
    "Static-export navigation runs once in the representative Chromium project.",
  );
});

test("Next Link hover, click, Back and direct navigation work with Pages-like MIME", async ({
  page,
}, testInfo) => {
  const baseUrl = String(testInfo.project.use.baseURL ?? "");
  const expectedBasePath = "/evaready-electrical/";
  const failures: string[] = [];
  const consoleErrors: string[] = [];
  const segmentResponses: Array<{
    contentType: string;
    status: number;
    url: string;
  }> = [];

  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );
  page.on("response", (response) => {
    const url = new URL(response.url());
    const baseOrigin = new URL(baseUrl).origin;
    if (url.origin !== baseOrigin) return;
    if (response.status() >= 400) {
      failures.push(`${response.status()} ${response.url()}`);
    }
    if (url.pathname.endsWith(".txt")) {
      segmentResponses.push({
        contentType: response.headers()["content-type"] ?? "",
        status: response.status(),
        url: response.url(),
      });
    }
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const source = message.location().url;
    if (source && new URL(source).origin === new URL(baseUrl).origin) {
      consoleErrors.push(`${source}: ${message.text()}`);
    }
  });

  for (const transition of routeTransitions) {
    const source = resolvePreviewUrl(baseUrl, transition.source);
    const target = resolvePreviewUrl(baseUrl, transition.target);
    await page.goto(source.href, { waitUntil: "networkidle" });
    expect(new URL(page.url()).pathname, transition.name).toBe(source.pathname);
    expect(new URL(page.url()).pathname, transition.name).toContain(
      expectedBasePath,
    );

    const link = page.locator(`main a[href="${target.pathname}"]`).first();
    await expect(link, `${transition.name} has the intended Next Link`).toBeVisible();
    await link.hover();
    await expect
      .poll(() =>
        segmentResponses.some((item) => {
          const pathname = new URL(item.url).pathname;
          return pathname.startsWith(target.pathname) && item.status === 200;
        }),
      )
      .toBe(true);
    const targetSegmentResponses = segmentResponses.filter((item) =>
      new URL(item.url).pathname.startsWith(target.pathname),
    );
    expect(targetSegmentResponses.length, transition.name).toBeGreaterThan(0);
    for (const response of targetSegmentResponses) {
      expect(response.status, response.url).toBe(200);
      expect(response.contentType, response.url).toContain("text/plain");
    }

    await page.evaluate(() => {
      (window as Window & { __evareadyClientNavigation?: string }).__evareadyClientNavigation =
        "preserved";
    });
    await link.click();
    await expect(page).toHaveURL(target.href);
    expect(
      await page.evaluate(
        () =>
          (window as Window & { __evareadyClientNavigation?: string })
            .__evareadyClientNavigation,
      ),
      `${transition.name} click remained a client transition`,
    ).toBe("preserved");

    await page.goBack({ waitUntil: "networkidle" });
    expect(new URL(page.url()).pathname, `${transition.name} Back`).toBe(
      source.pathname,
    );
    await page.goto(target.href, { waitUntil: "networkidle" });
    expect(new URL(page.url()).pathname, `${transition.name} direct`).toBe(
      target.pathname,
    );
  }

  expect(failures).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(segmentResponses.length).toBeGreaterThan(0);
});
