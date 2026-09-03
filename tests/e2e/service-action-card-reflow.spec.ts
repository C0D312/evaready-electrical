import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { resolvePreviewUrl } from "./support/preview-url";

const matrixProject = "desktop-chromium-1440";
const matrixWidths = [320, 360, 390, 430, 768, 820, 1024, 1366, 1440, 1920, 2560] as const;
const textScales = [100, 200] as const;
const rewrittenSlugs = [
  "electrical-fault-finding-sydney",
  "hot-power-point-electrician-sydney",
  "smoke-alarm-electrician-sydney",
  "rewiring-electrician-sydney",
  "surge-protection-electrician-sydney",
  "safety-switch-rcd-installation-sydney",
] as const;
const representativeUnchangedSlugs = [
  "residential-electrician-sydney",
  "commercial-electrician-sydney",
] as const;

type TextScale = (typeof textScales)[number];

function discoverAffectedRoutes() {
  const serviceRoot = join(process.cwd(), "out", "services");
  if (!existsSync(serviceRoot)) {
    throw new Error("Build the production export before running the service-card reflow test");
  }

  return readdirSync(serviceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      htmlPath: join(serviceRoot, entry.name, "index.html"),
      route: `services/${entry.name}/`,
      slug: entry.name,
    }))
    .filter(
      ({ htmlPath }) =>
        existsSync(htmlPath) &&
        readFileSync(htmlPath, "utf8").includes(
          "service-action-card__summary--with-end",
        ),
    )
    .sort((first, second) => first.route.localeCompare(second.route));
}

const affectedRoutes = discoverAffectedRoutes();

async function inspectCardLayout(page: Page) {
  return page.evaluate(() => {
    const tolerance = 2;
    const toRect = (rect: DOMRect) => ({
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
    });
    const isOutside = (inner: DOMRect, outer: DOMRect) =>
      inner.left < outer.left - tolerance ||
      inner.right > outer.right + tolerance ||
      inner.top < outer.top - tolerance ||
      inner.bottom > outer.bottom + tolerance;
    const overlaps = (first: DOMRect, second: DOMRect) =>
      Math.min(first.right, second.right) - Math.max(first.left, second.left) >
        tolerance &&
      Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top) >
        tolerance;
    const followsVisually = (first: DOMRect, second: DOMRect) => {
      const verticalOverlap =
        Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top);
      return (
        second.top >= first.bottom - tolerance ||
        (verticalOverlap > tolerance && second.left >= first.right - tolerance)
      );
    };

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".service-action-card--scope"),
    );
    const cardResults = cards.map((card, cardIndex) => {
      const issues: string[] = [];
      const cardRect = card.getBoundingClientRect();
      const summary = card.querySelector<HTMLElement>(
        ".service-action-card__summary--with-end",
      );
      if (!summary) {
        return { cardIndex, issues: ["missing-summary"] };
      }

      const summaryRect = summary.getBoundingClientRect();
      const children = Array.from(summary.children) as HTMLElement[];
      const childRects = children.map((child) => ({
        className: child.getAttribute("class") ?? child.tagName.toLowerCase(),
        raw: child.getBoundingClientRect(),
      }));
      const title = summary.querySelector<HTMLElement>(".service-action-card__title");
      const textRange = document.createRange();
      if (title) textRange.selectNodeContents(title);
      const textRects = title
        ? Array.from(textRange.getClientRects()).filter((rect) => rect.width > 0)
        : [];

      if (card.scrollWidth - card.clientWidth > tolerance) {
        issues.push("card-horizontal-overflow");
      }
      if (card.scrollHeight - card.clientHeight > tolerance) {
        issues.push("card-vertical-clipping");
      }
      if (summary.scrollWidth - summary.clientWidth > tolerance) {
        issues.push("summary-horizontal-overflow");
      }
      if (summary.scrollHeight - summary.clientHeight > tolerance) {
        issues.push("summary-vertical-clipping");
      }
      if (isOutside(summaryRect, cardRect)) issues.push("summary-outside-card");
      if (childRects.some(({ raw }) => isOutside(raw, cardRect))) {
        issues.push("child-outside-card");
      }
      if (textRects.some((rect) => isOutside(rect, cardRect))) {
        issues.push("text-outside-card");
      }
      for (let first = 0; first < childRects.length; first += 1) {
        for (let second = first + 1; second < childRects.length; second += 1) {
          if (overlaps(childRects[first].raw, childRects[second].raw)) {
            issues.push(`child-overlap-${first}-${second}`);
          }
        }
      }

      const [startIcon, titleRect, endIcon] = childRects.map(({ raw }) => raw);
      const logicalVisualOrder = Boolean(
        startIcon &&
          titleRect &&
          endIcon &&
          followsVisually(startIcon, titleRect) &&
          followsVisually(titleRect, endIcon),
      );
      if (!logicalVisualOrder) issues.push("visual-order");

      const expectedDomOrder = Boolean(
        children[0]?.classList.contains("service-action-card__icon") &&
          children[1]?.classList.contains("service-action-card__title") &&
          children[2]?.classList.contains("service-action-card__end-icon"),
      );
      if (!expectedDomOrder) issues.push("dom-order");

      const computed = getComputedStyle(summary);
      return {
        card: {
          clientHeight: card.clientHeight,
          clientWidth: card.clientWidth,
          rect: toRect(cardRect),
          scrollHeight: card.scrollHeight,
          scrollWidth: card.scrollWidth,
        },
        cardIndex,
        childRects: childRects.map(({ className, raw }) => ({
          className,
          rect: toRect(raw),
        })),
        computed: {
          columnGap: computed.columnGap,
          gridTemplateColumns: computed.gridTemplateColumns,
          height: computed.height,
          maxHeight: computed.maxHeight,
          overflow: computed.overflow,
          rowGap: computed.rowGap,
        },
        issues: [...new Set(issues)],
        text: title?.innerText.trim() ?? "",
        textRects: textRects.map(toRect),
      };
    });

    const focusIssues: string[] = [];
    const focusable = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".service-action-card--scope a, .service-action-card--scope button, .service-action-card--scope [tabindex]:not([tabindex='-1'])",
      ),
    );
    for (const element of focusable) {
      element.focus();
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const hasVisibleFocus =
        (style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0) ||
        style.boxShadow !== "none";
      if (!hasVisibleFocus) focusIssues.push("interactive-control-without-visible-focus");
      if (rect.width < 44 || rect.height < 44) {
        focusIssues.push("interactive-control-below-existing-touch-target");
      }
    }

    return {
      cardResults,
      focusableCount: focusable.length,
      focusIssues: [...new Set(focusIssues)],
      pageOverflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function openAndMeasure(
  page: Page,
  baseURL: string | undefined,
  route: string,
  textScale: TextScale,
) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto(resolvePreviewUrl(String(baseURL), route).toString(), {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status(), route).toBe(200);
  expect(new URL(page.url()).pathname, route).toContain("/evaready-electrical/");
  if (textScale === 200) {
    await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
  }
  await page.evaluate(() => document.fonts.ready);

  const measurement = await inspectCardLayout(page);
  expect(measurement.cardResults.length, `${route} card count`).toBeGreaterThan(0);
  expect(measurement.focusIssues, `${route} focus behaviour`).toEqual([]);
  expect(measurement.pageOverflow, `${route} page overflow`).toBeLessThanOrEqual(2);
  for (const card of measurement.cardResults) {
    expect(
      card.issues,
      `${route} at ${page.viewportSize()?.width}px / ${textScale}%: ${JSON.stringify(card)}`,
    ).toEqual([]);
  }
}

test("service-action-card route discovery covers every rendered shared selector", () => {
  expect(affectedRoutes).toHaveLength(46);
  expect(new Set(affectedRoutes.map(({ route }) => route)).size).toBe(46);
});

for (const { route } of affectedRoutes) {
  test(`complete affected-route matrix: ${route}`, async ({ baseURL, page }, testInfo) => {
    test.skip(
      testInfo.project.name !== matrixProject,
      "The complete 46-route/11-width matrix runs once in Chromium.",
    );

    for (const width of matrixWidths) {
      await page.setViewportSize({ width, height: width < 768 ? 1000 : 1080 });
      for (const textScale of textScales) {
        await openAndMeasure(page, baseURL, route, textScale);
      }
    }
  });
}

for (const slug of [...rewrittenSlugs, ...representativeUnchangedSlugs]) {
  test(`cross-browser representative card reflow: ${slug}`, async ({ baseURL, page }) => {
    for (const textScale of textScales) {
      await openAndMeasure(page, baseURL, `services/${slug}/`, textScale);
    }
  });
}
