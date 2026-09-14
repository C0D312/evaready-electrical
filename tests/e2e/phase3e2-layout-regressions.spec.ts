import { createHash } from "node:crypto";
import { expect, test, type Page } from "./support/phase3e2-contained-test";
import { attach, inspectLayout, inspectTargets, inspectControlHits, unobscured, settle, focusVisible } from "./support/phase3e2-helpers";
import { requiredLoopbackBaseURL } from "./support/phase3e2-routes";

test.use({ serviceWorkers: "block", viewport: { width: 320, height: 240 } });

test.beforeEach(async ({ baseURL }) => {
  requiredLoopbackBaseURL(baseURL);
});

async function fixture(page: Page, markup: string) {
  const baseURL = requiredLoopbackBaseURL(test.info().project.use.baseURL);
  const source = new URL("__phase3e2-layout-fixture__/", baseURL).href;
  const csp = "default-src 'none'; style-src 'unsafe-inline'; img-src data:";
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    `<meta http-equiv="Content-Security-Policy" content="${csp}">` +
    '<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN2kAAAAASUVORK5CYII=">' +
    '<style>html{font-size:16px}body{margin:0;font:16px/24px monospace}' +
    'main,p,h2{margin:0;padding:0}main{width:300px}.clip{width:80px;overflow:hidden}</style>' +
    '</head><body><main id="fixture">' + markup + '</main></body></html>';
  const delivered: string[] = [];
  // A real local-origin document navigation installs the actual containment
  // observers. The exact synthetic response is reconciled separately from forwards.
  await page.route(source, async route => {
    delivered.push(route.request().url());
    await route.fulfill({ status: 200, contentType: "text/html", body: html,
      headers: { "content-length": String(Buffer.byteLength(html)), "content-security-policy": csp } });
  });
  const response = await page.goto(source, { waitUntil: "load" });
  expect(response?.status()).toBe(200);
  const received = await response!.body();
  const viewport = await page.evaluate(() => ({ width: innerWidth, clientWidth: document.documentElement.clientWidth,
    scale: visualViewport?.scale ?? 1 }));
  await attach("layout-fixture-viewport", viewport);
  const expectedWidth = page.viewportSize()!.width;
  expect(viewport).toEqual({ width: expectedWidth, clientWidth: expectedWidth, scale: 1 });
  const ready = await page.evaluate(() => {
    const state = window as unknown as { __evNativeFetchActivity?: unknown;
      __evDrainFetchEvidence?: unknown; __evDrainResourceEvidence?: unknown };
    return { fetch: !!state.__evNativeFetchActivity, fetchDrain: typeof state.__evDrainFetchEvidence === "function",
      resourceDrain: typeof state.__evDrainResourceEvidence === "function" };
  });
  expect(ready).toEqual({ fetch: true, fetchDrain: true, resourceDrain: true });
  await attach("layout-fixture-document", { source, delivered, html, bytes: Buffer.byteLength(html),
    sha256: createHash("sha256").update(html).digest("hex"),
    receivedSha256: createHash("sha256").update(received).digest("hex"),
    responseCsp: response!.headers()["content-security-policy"], ready });
  await settle(page);
}

async function circularFixture(page: Page, left = 140.0833, top = 64.2667, size = 46) {
  await page.setViewportSize({ width: 900, height: 240 });
  await fixture(page, `<button id="round" type="button" aria-label="Synthetic circular control" ` +
    `style="position:fixed;left:${left}px;top:${top}px;width:${size}px;height:${size}px;box-sizing:border-box;` +
    'padding:0;border:2px solid #00aaff;border-radius:50%;background:#06142f;color:white">+</button>');
  return page.locator("#round");
}

for (const [left, top, size] of [[259.0833, 64.2667, 46], [369.0833, 82.5833, 46], [706.0833, 60.6167, 48]]) {
  test(`circular hit sampling handles fractional geometry ${left}-${top}-${size}`, async ({ page }) => {
    const control = await circularFixture(page, left, top, size);
    const hits = await inspectControlHits(control);
    expect(hits.shape).toBe("circle");
    expect(hits.hits).toHaveLength(9);
    expect(hits.hits.every(hit => hit.clear)).toBe(true);
    expect(hits.circularBoundaryInset).toBe(2);
    await attach("circular-hit-fixture", hits);
    await unobscured(control);
    await control.evaluate(element => element.addEventListener("click", () => element.setAttribute("data-activated", "true")));
    await control.click();
    await expect(control).toHaveAttribute("data-activated", "true");
  });
}

test("rectangular controls retain all original hit points", async ({ page }) => {
  const control = await circularFixture(page);
  await control.evaluate(element => { (element as HTMLElement).style.borderRadius = "4px"; });
  const hits = await inspectControlHits(control);
  expect(hits.shape).toBe("rectangle");
  expect(hits.hits).toHaveLength(5);
  expect(hits.hits).toEqual(hits.legacyHits);
  expect(hits.hits.every(hit => hit.clear)).toBe(true);
});

for (let point = 0; point < 9; point++) {
  test(`a real circular-control obstruction at sample ${point} is rejected`, async ({ page }) => {
    const control = await circularFixture(page);
    const before = await inspectControlHits(control);
    expect(before.hits.every(hit => hit.clear)).toBe(true);
    await page.evaluate(([x, y]) => {
      const cover = document.createElement("div");
      cover.id = "synthetic-obstruction";
      cover.style.cssText = `position:fixed;left:${x - 3}px;top:${y - 3}px;width:6px;height:6px;background:red;z-index:100`;
      document.body.append(cover);
    }, before.hits[point].point);
    const after = await inspectControlHits(control);
    expect(after.hits[point].clear).toBe(false);
    expect(after.hits[point].hitId).toBe("synthetic-obstruction");
    expect(after.hits.every(hit => hit.clear)).toBe(false);
    await attach("circular-obstruction-fixture", { point, before, after });
  });
}

test("unobscured still fails when a circular control is covered", async ({ page }) => {
  const control = await circularFixture(page);
  await page.evaluate(() => {
    const cover = document.createElement("div");
    cover.style.cssText = "position:fixed;inset:0;background:red;z-index:100";
    document.body.append(cover);
  });
  await expect(unobscured(control)).rejects.toThrow("naturally unobscured and settled");
});

test("visible clipped text remains a layout failure", async ({ page }) => {
  await fixture(page, '<div class="clip"><p style="width:280px;white-space:nowrap">Visible content clipped here</p></div>');
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.textNodes).toBe(1);
  expect(result.fragments).toBeGreaterThan(0);
  expect(result.issues.some(issue => issue.kind === "clipped-text" && issue.text === "Visible content clipped here")).toBe(true);
});

test("a fake sr-only class does not exempt visible clipped text", async ({ page }) => {
  await fixture(page, '<div class="clip"><p class="sr-only" style="width:280px;white-space:nowrap">Visible despite the class</p></div>');
  await expect(page.locator("p.sr-only")).toHaveCSS("position", "static");
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.textNodes).toBe(1);
  expect(result.issues.some(issue => issue.kind === "clipped-text" && issue.text === "Visible despite the class")).toBe(true);
});

test("a genuine hidden suffix is excluded without exempting its real control", async ({ page }) => {
  await fixture(page,
    '<a id="verification" href="#verification" style="display:inline-block;width:42px;height:18px;font:12px/18px monospace;white-space:nowrap">46691' +
    '<span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"> (opens verification source)</span></a>',
  );
  const control = page.locator("#verification");
  await expect(control).toHaveAccessibleName("46691 (opens verification source)");
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.textNodes).toBe(1);
  expect(result.fragments).toBeGreaterThan(0);
  expect(result.issues).toEqual([]);
  const targets = await inspectTargets(control);
  expect(targets).toHaveLength(1);
  expect(targets[0]).toMatchObject({ width: 42, height: 18, visible: true });
  expect(targets.filter(target => !target.visible || target.width < 44 || target.height < 44)).toHaveLength(1);
});

test("offscreen visible text is still checked for clipping", async ({ page }) => {
  await fixture(page, '<div class="clip" style="margin-top:1200px"><p style="width:280px;white-space:nowrap">Offscreen content clipped here</p></div>');
  expect(await page.locator("p").evaluate(element => element.getBoundingClientRect().top > innerHeight)).toBe(true);
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.textNodes).toBe(1);
  expect(result.fragments).toBeGreaterThan(0);
  expect(result.issues.some(issue => issue.kind === "clipped-text" && issue.text === "Offscreen content clipped here")).toBe(true);
});

test("visible whitespace between inline spans remains a word boundary", async ({ page }) => {
  await fixture(page, '<h2 style="width:80px;font:16px/24px monospace"><span>first</span> <span>words</span></h2>');
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.textNodes).toBe(2);
  expect(result.fragments).toBeGreaterThanOrEqual(2);
  expect(result.issues).toEqual([]);
});

test("wrappable hyphen and slash segments do not create an invented long word", async ({ page }) => {
  await fixture(page, '<h2 style="width:90px;font:16px/24px monospace;overflow-wrap:anywhere">Wall-mount power/data</h2>');
  await expect(page.locator("h2")).toHaveCSS("overflow-wrap", "anywhere");
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.fragments).toBeGreaterThan(1);
  expect(result.issues).toEqual([]);
});

test("a genuinely overlong word remains detected", async ({ page }) => {
  await fixture(page, '<h2 style="width:80px;font:16px/24px monospace;overflow-wrap:anywhere">Unbrokenlongword</h2>');
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.issues.some(issue => issue.kind === "word-does-not-fit" && issue.word === "Unbrokenlongword")).toBe(true);
});

test("nowrap punctuation-separated text still fails rendered clipping checks", async ({ page }) => {
  await fixture(page, '<div class="clip"><h2 style="width:280px;font:16px/24px monospace;white-space:nowrap">Wall-mount power/data</h2></div>');
  const result = await inspectLayout(page.locator("#fixture"));
  expect(result.issues.some(issue => issue.kind === "clipped-text")).toBe(true);
});

for (const clipped of [false, true]) test(`fixed dialog root overflow ${clipped ? "rejects clipped text" : "uses the viewport"}`, async ({ page }) => {
  await fixture(page, '<div style="height:1600px"></div><aside id="dialog" style="position:fixed;top:20px;left:10px;width:280px"><p>Visible dialog text</p></aside>');
  await page.evaluate(value => {
    window.scrollTo(0, 700);
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "-700px";
    if (value) document.querySelector<HTMLElement>("#dialog")!.style.top = "250px";
  }, clipped);
  const result = await inspectLayout(page.locator("#dialog"));
  expect(result.textNodes).toBe(1);
  if (clipped) expect(result.issues.some(issue => issue.kind === "clipped-text" && issue.selector === "html.")).toBe(true);
  else expect(result.issues).toEqual([]);
});

for (const clipped of [false, true]) test(`fixed focus outline ${clipped ? "rejects viewport clipping" : "uses the root viewport"}`, async ({ page }) => {
  await fixture(page, '<div style="height:1600px"></div><button style="position:fixed;bottom:20px;left:20px;width:120px;height:44px;outline:2px solid blue;outline-offset:3px">Dialog action</button>');
  await page.evaluate(value => {
    window.scrollTo(0, 700);
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "-700px";
    if (value) document.querySelector<HTMLElement>("button")!.style.bottom = "0";
  }, clipped);
  if (clipped) await expect(focusVisible(page, page.locator("button"))).rejects.toThrow();
  else await focusVisible(page, page.locator("button"));
});

for (const mode of ["scrolled-body", "overflow-ancestor", "transformed-ancestor"] as const) {
  test(`fixed focus respects containing blocks: ${mode}`, async ({ page }) => {
    await fixture(page, '<div id="clipper" style="overflow:hidden;width:280px;height:30px">' +
      '<button style="position:fixed;top:50px;left:20px;width:120px;height:44px;outline:2px solid blue;outline-offset:3px">Dialog action</button></div>');
    await page.evaluate(value => {
      if (value === "scrolled-body") {
        document.body.style.cssText = "position:fixed;top:-700px;overflow:hidden;height:240px;width:320px";
      } else if (value === "transformed-ancestor") {
        document.querySelector<HTMLElement>("#clipper")!.style.transform = "translateZ(0)";
      }
    }, mode);
    if (mode === "transformed-ancestor") await expect(focusVisible(page, page.locator("button"))).rejects.toThrow();
    else await focusVisible(page, page.locator("button"));
  });
}
