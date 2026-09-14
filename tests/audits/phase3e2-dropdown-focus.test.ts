import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";
import test from "node:test";
import { transformSync } from "esbuild";

const source = readFileSync("components/desktop-primary-nav.tsx", "utf8").replace(/\r\n/g, "\n");
const handler = readFileSync("components/navigation-focus-visibility.ts", "utf8");
const compiled = transformSync(handler, { loader: "ts", format: "cjs" }).code;

class Events {
  listeners = new Map<string, Set<(event: { target?: ElementStub }) => void>>();
  addEventListener(type: string, callback: (event: { target?: ElementStub }) => void) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(callback);
  }
  removeEventListener(type: string, callback: (event: { target?: ElementStub }) => void) {
    this.listeners.get(type)?.delete(callback);
  }
  emit(type: string, target?: ElementStub) {
    this.listeners.get(type)?.forEach(callback => callback({ target }));
  }
}
class ElementStub extends Events {
  isConnected = true;
  tabIndex = 0;
  parentElement: ElementStub | null = null;
  disabled = false;
  hidden = false;
  overlay = false;
  mobile = false;
  id = "";
  focusVisible = true;
  control = true;
  clientTop = 1;
  clientLeft = 1;
  clientHeight = 158;
  clientWidth = 298;
  rect = { top: 100, bottom: 260, left: 100, right: 400 };
  style = { display: "block", visibility: "visible", opacity: "1", outlineWidth: "2px", outlineOffset: "2px",
    scrollPaddingTop: "8px", scrollPaddingBottom: "8px", scrollPaddingLeft: "0px", scrollPaddingRight: "0px",
    scrollMarginTop: "8px", scrollMarginBottom: "8px", scrollMarginLeft: "0px", scrollMarginRight: "0px" };
  scrolls: ScrollToOptions[] = [];
  matches(selector: string) {
    if (selector === ":focus-visible") return this.focusVisible;
    if (selector.startsWith("a[href]")) return this.control;
    if (selector.startsWith(":disabled")) return this.disabled;
    if (selector === ".mobile-menu-open") return this.mobile;
    if (selector === ".quote-modal-open") return this.overlay;
    if (selector === ".mobile-menu-open,.quote-modal-open") return this.mobile || this.overlay;
    throw new Error(`Unexpected selector: ${selector}`);
  }
  closest() { return this.hidden ? this : null; }
  contains(element: ElementStub) { return element.parentElement === this; }
  getClientRects() { return this.hidden ? [] : [this.rect]; }
  getBoundingClientRect() { return this.rect; }
  scrollBy(options: ScrollToOptions) { this.scrolls.push(options); }
}

const scenarios = ["below", "above", "left", "right", "visible", "oversized", "pointer-focus", "disabled", "hidden",
  "transparent", "non-control", "negative-tabindex", "overlay-open", "outside", "wheel", "pointerdown", "touchstart",
  "keydown", "focusout", "popstate", "hashchange", "pagehide", "blur", "new-focus", "route", "history", "disconnect",
  "panel-disconnect", "becomes-hidden", "becomes-visible", "overlay-later", "overlay-open-close", "cleanup",
  "mobile-owner-missing", "mobile-owner-lost", "wrong-mobile-panel", "wrong-mobile-panel-later", "mobile-took-over",
  "preparation-scroll", "preparation-wheel", "preparation-touch", "preparation-key"] as const;

for (const scope of ["desktop", "mobile"] as const) for (const scenario of scenarios) test(`${scope} focus correction owns only its panel: ${scenario}`, () => {
  const panel = new ElementStub(), target = new ElementStub(), body = new ElementStub();
  panel.id = scope === "mobile" ? "mobile-site-menu" : "desktop-services-services-menu";
  body.mobile = scope === "mobile";
  target.parentElement = panel;
  target.rect = { top: 230, bottom: 274, left: 120, right: 250 };
  const document = Object.assign(new Events(), { activeElement: target as ElementStub | null, body });
  const pending: (() => void)[] = [];
  const window = Object.assign(new Events(), {
    requestAnimationFrame: (callback: () => void) => { pending.push(callback); return pending.length; },
    // Deliberately execute cancelled callbacks later to test their ownership guards.
    cancelAnimationFrame: () => {},
  });
  let mutation: (records: { oldValue: string }[]) => void = () => {};
  let disconnected = false;
  const location = { href: "http://127.0.0.1/fixture/" }, history = { length: 2 };
  const commonJS: { exports: { installDropdownFocusVisibility?: (panel: ElementStub, scope: "desktop" | "mobile") => () => void } } = { exports: {} };
  runInNewContext(compiled, { module: commonJS, exports: commonJS.exports, window, document, location, history, HTMLElement: ElementStub,
    getComputedStyle: (element: ElementStub) => element.style,
    MutationObserver: class {
      constructor(callback: typeof mutation) { mutation = callback; }
      observe() {}
      disconnect() { disconnected = true; }
    },
  });
  if (scenario === "above") target.rect = { ...target.rect, top: 80, bottom: 124 };
  if (scenario === "left") target.rect = { top: 180, bottom: 224, left: 85, right: 215 };
  if (scenario === "right") target.rect = { top: 180, bottom: 224, left: 285, right: 415 };
  if (scenario === "visible") target.rect = { ...target.rect, top: 180, bottom: 224 };
  if (scenario === "oversized") target.rect = { ...target.rect, top: 80, bottom: 290 };
  if (scenario === "pointer-focus") target.focusVisible = false;
  if (scenario === "disabled") target.disabled = true;
  if (scenario === "hidden") target.hidden = true;
  if (scenario === "transparent") panel.style.opacity = "0";
  if (scenario === "non-control") target.control = false;
  if (scenario === "negative-tabindex") target.tabIndex = -1;
  if (scenario === "overlay-open") body.overlay = true;
  if (scenario === "outside") target.parentElement = null;
  if (scenario === "mobile-owner-missing") body.mobile = false;
  if (scenario === "wrong-mobile-panel") panel.id = "not-the-mobile-menu";
  if (scenario.startsWith("preparation-")) target.rect = { ...target.rect, top: 180, bottom: 224 };
  const cleanup = commonJS.exports.installDropdownFocusVisibility!(panel, scope);
  panel.emit("focusin", target);
  // Programmatic preparation can move a still-focused control before its frame.
  // Genuine early input cancels that pending correction, even if it later runs.
  if (scenario.startsWith("preparation-")) target.rect = { ...target.rect, top: 80, bottom: 124 };
  if (scenario === "preparation-wheel") document.emit("wheel");
  if (scenario === "preparation-touch") document.emit("touchstart");
  if (scenario === "preparation-key") document.emit("keydown");
  const initial = { url: location.href, history: history.length, focused: document.activeElement };
  for (const type of ["wheel", "pointerdown", "touchstart", "keydown", "focusout"]) if (scenario === type) document.emit(type);
  for (const type of ["popstate", "hashchange", "pagehide", "blur"]) if (scenario === type) window.emit(type);
  if (scenario === "new-focus") document.activeElement = new ElementStub();
  if (scenario === "route") location.href += "changed";
  if (scenario === "history") history.length++;
  if (scenario === "disconnect") target.isConnected = false;
  if (scenario === "panel-disconnect") panel.isConnected = false;
  if (scenario === "becomes-hidden") target.hidden = true;
  if (scenario === "becomes-visible") target.rect = { ...target.rect, top: 180, bottom: 224 };
  if (scenario === "overlay-later") body.overlay = true;
  if (scenario === "overlay-open-close") mutation([{ oldValue: "quote-modal-open" }]);
  if (scenario === "mobile-owner-lost") body.mobile = false;
  if (scenario === "wrong-mobile-panel-later") panel.id = "not-the-mobile-menu";
  if (scenario === "mobile-took-over") body.mobile = true;
  if (scenario === "cleanup") cleanup();
  const before = { url: location.href, history: history.length, focused: document.activeElement };
  pending.forEach(callback => callback());
  const expected: Partial<Record<typeof scenario, { left: number; top: number }>> = {
    below: { left: 0, top: 23 }, above: { left: 0, top: -29 },
    left: { left: -21, top: 0 }, right: { left: 21, top: 0 },
    "preparation-scroll": { left: 0, top: -29 },
  };
  if (scope === "desktop") for (const name of ["mobile-owner-missing", "mobile-owner-lost", "wrong-mobile-panel", "wrong-mobile-panel-later"] as const) expected[name] = expected.below;
  if (scope === "mobile") expected["mobile-took-over"] = expected.below;
  assert.equal(panel.scrolls.length, expected[scenario] ? 1 : 0);
  if (expected[scenario]) assert.deepEqual(JSON.parse(JSON.stringify(panel.scrolls[0])), { ...expected[scenario], behavior: "instant" });
  assert.deepEqual({ url: location.href, history: history.length, focused: document.activeElement }, before);
  assert.equal(target.scrolls.length + body.scrolls.length, 0);
  assert.equal(initial.focused, target);
  cleanup();
  assert.equal(disconnected, true);
  assert.equal([...panel.listeners.values(), ...document.listeners.values(), ...window.listeners.values()]
    .reduce((sum, listeners) => sum + listeners.size, 0), 0);
});

test("dropdown correction cannot move focus, page scroll or navigation history", () => {
  assert.doesNotMatch(handler, /\.focus\s*\(|window\.scroll|scrollIntoView|pushState|replaceState|setTimeout|setInterval|preventDefault/);
  assert.equal(handler.match(/panel\.scrollBy\(/g)?.length, 1);
  assert.equal(handler.match(/requestAnimationFrame\(/g)?.length, 1);
});

test("mobile focus installation and A7 preserve the original menu outside exact additions", () => {
  let previous = readFileSync("components/mobile-primary-nav.tsx", "utf8").replace(/\r\n/g, "\n");
  const additions = [
    'import { installDropdownFocusVisibility } from "@/components/navigation-focus-visibility";\n',
    '\n  useEffect(() => {\n    if (!open || !panelRef.current) return;\n    return installDropdownFocusVisibility(panelRef.current, "mobile");\n  }, [open]);\n',
    '  const scrollLockVersionRef = useRef(0);\n',
    '    const lockVersions = scrollLockVersionRef;\n    const lockVersion = ++lockVersions.current;\n',
    '      // A quote handoff must snapshot the original value, not our temporary lock.\n      html.style.scrollBehavior = snapshot.htmlScrollBehavior;\n',
    '        if (\n          lockVersions.current !== lockVersion ||\n          body.style.position === "fixed" ||\n          body.classList.contains("quote-modal-open") ||\n          body.classList.contains("mobile-menu-open")\n        ) return;\n        const scrollBehavior = html.style.scrollBehavior;\n        html.style.scrollBehavior = "auto";\n',
  ];
  for (const addition of additions) {
    assert.equal(previous.split(addition).length, 2);
    previous = previous.replace(addition, "");
  }
  const guardedRestore = '        html.style.scrollBehavior = scrollBehavior;';
  assert.equal(previous.split(guardedRestore).length, 2);
  previous = previous.replace(guardedRestore, '        html.style.scrollBehavior = snapshot.htmlScrollBehavior;');
  assert.equal(createHash("sha256").update(previous).digest("hex"),
    "43735bfbbecd673b9af87fdb138625ddf8620508ca51e51406bf5052b1f97e9b");
});

const navigationReadiness = '        // Finish the menu\'s initial native focus lifecycle before seeded preparation.\n' +
  '        const initialFocus = page.locator("#mobile-site-menu").getByRole("button", { name: "Close menu", exact: true });\n' +
  '        await expect(initialFocus).toBeFocused();\n' +
  '        await settle(page);\n' +
  '        await expect(initialFocus).toBeFocused();\n' +
  '        await unobscured(initialFocus, "observe");\n';

test("seeded navigation preparation observes the initial focus lifecycle without correcting it", () => {
  const source = readFileSync("tests/e2e/phase3e2-navigation.spec.ts", "utf8").replace(/\r\n/g, "\n");
  assert.equal(source.split(navigationReadiness).length, 2);
  assert(source.indexOf(navigationReadiness) > source.indexOf('if (compact) {'));
  assert(source.indexOf(navigationReadiness) < source.indexOf('await focusVisible(page, toggle);'));
  assert.doesNotMatch(navigationReadiness, /\.focus\(|scrollIntoView|scrollTo|waitForTimeout|setTimeout|page\.keyboard|\.click\(/);
  assert.match(navigationReadiness, /unobscured\(initialFocus, "observe"\)/);
  assert.equal(navigationReadiness.match(/toBeFocused\(\)/g)?.length, 2);
});

test("Services budget and initial readiness preserve every original navigation assertion", () => {
  const source = readFileSync("tests/e2e/phase3e2-navigation.spec.ts", "utf8").replace(/\r\n/g, "\n");
  const addition = '      // WebKit\'s per-link native scroll/activation checks need a larger total\n' +
    '      // budget for this long menu. Per-control waits and assertions are unchanged.\n' +
    '      if (browserName === "webkit" && group === "services" && motion === "no-preference") test.setTimeout(360_000);\n';
  assert.equal(source.split(addition).length, 2);
  assert.equal(source.split(navigationReadiness).length, 2);
  const previous = source.replace(addition, "").replace(navigationReadiness, "");
  const hashes = [previous, previous.replace(/\n/g, "\r\n")].map(value => createHash("sha256").update(value).digest("hex"));
  assert(hashes.includes("581d990fd97a289c5f98594916150c255138627fc115e08755d561b905f39f15"));
});

test("A3/A5 leave the original desktop component unchanged outside exact authorised additions", () => {
  const additions = [
    'import { installDropdownFocusVisibility } from "@/components/navigation-focus-visibility";\n',
    '    const panel = document.getElementById(`desktop-${activeMenu}-services-menu`);\n    const removeFocusVisibility = panel ? installDropdownFocusVisibility(panel) : undefined;\n',
    '      removeFocusVisibility?.();\n',
  ];
  let previous = source;
  for (const addition of additions) {
    assert.equal(previous.split(addition).length, 2);
    previous = previous.replace(addition, "");
  }
  const measureStart = previous.indexOf("  useLayoutEffect(() => {");
  const measureEnd = previous.indexOf("  function clearHoverTimer() {");
  assert(measureStart > 0 && measureEnd > measureStart);
  assert.equal(createHash("sha256").update(previous.slice(measureStart, measureEnd)).digest("hex"),
    "3823975dbb14995166b5c6752c497fb04e21f5c6c458affa45bac7ee9da85dcb");
  previous = (previous.slice(0, measureStart) + previous.slice(measureEnd)).replace(
    'import { useEffect, useLayoutEffect, useRef, useState } from "react";',
    'import { useEffect, useRef, useState } from "react";');
  assert.equal(createHash("sha256").update(previous).digest("hex"),
    "18d3f104ad9d16dc4f4d8cec05cf607b5df96f6b3723c0ae87a4848352c0476a");
});
