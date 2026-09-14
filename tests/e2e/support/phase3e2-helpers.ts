import { expect, test, type Locator, type Page } from "./phase3e2-contained-test";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./quote-enhancement";
import { resolvePreviewUrl } from "./preview-url";
import { requiredLoopbackBaseURL, type RouteCase, type TextScale } from "./phase3e2-routes";

export async function attach(name: string, value: unknown) {
  await test.info().attach(name, { body: JSON.stringify(value, null, 2), contentType: "application/json" });
}

export async function openRoute(page: Page, configuredBase: string | undefined, row: RouteCase) {
  const baseURL = requiredLoopbackBaseURL(configuredBase);
  await observeQuoteEnhancement(page);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => {
    if (new URL(response.url()).origin === new URL(baseURL).origin && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on("requestfailed", request => {
    if (new URL(request.url()).origin === new URL(baseURL).origin &&
        !/ERR_ABORTED|NS_BINDING_ABORTED/.test(request.failure()?.errorText ?? "")) {
      errors.push(`${request.failure()?.errorText} ${request.url()}`);
    }
  });
  const response = await page.goto(resolvePreviewUrl(baseURL, row.relativeRoute).href, { waitUntil: "load" });
  expect(response?.status()).toBe(200);
  expect(page.url()).toBe(`${baseURL}${row.relativeRoute}`);
  await expect(page.locator("main#main-content")).toHaveCount(1);
  await expect(page.locator("main#main-content")).toHaveClass(new RegExp(`\\b${row.mainClass}\\b`));
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h1")).toHaveText(/\S/);
  await expectQuoteEnhancementReady(page);
  await attach("route-source-mapping", { ...row, baseURL, actualH1: await page.locator("main h1").innerText() });
  return errors;
}

export async function setTextScale(page: Page, scale: TextScale) {
  await page.evaluate(async value => {
    document.documentElement.style.setProperty("font-size", `${value}%`, "important");
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  }, scale);
  await expect(page.locator("html")).toHaveCSS("font-size", scale === 200 ? "32px" : "16px");
  await settle(page);
}

export async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    let previous = "", stable = 0;
    for (let frame = 0; frame < 180; frame++) {
      await new Promise(requestAnimationFrame);
      const current = JSON.stringify([scrollX, scrollY, document.documentElement.scrollHeight,
        document.body.style.top, document.body.style.position, document.documentElement.style.scrollBehavior]);
      stable = current === previous ? stable + 1 : 0;
      previous = current;
      if (stable >= 4) return;
    }
    throw new Error("Layout/scroll did not settle naturally");
  });
}

export async function inspectControlHits(control: Locator) {
  return control.evaluate(element => {
    const r = element.getBoundingClientRect(), style = getComputedStyle(element);
    const radii = [style.borderTopLeftRadius, style.borderTopRightRadius,
      style.borderBottomLeftRadius, style.borderBottomRightRadius];
    const radius = (value: string, extent: number) => parseFloat(value) * (value.endsWith("%") ? extent / 100 : 1);
    const circular = Math.abs(r.width - r.height) < 0.1 && r.width >= 4 && radii.every(value => {
      const [x, y = x] = value.split(/\s+/);
      return radius(x, r.width) >= r.width / 2 && radius(y, r.height) >= r.height / 2;
    });
    const legacyPoints = [[0.5, 0.5], [0.15, 0.15], [0.85, 0.15], [0.15, 0.85], [0.85, 0.85]]
      .map(([x, y]) => [r.width * x, r.height * y]);
    // Fractional circular edges can rasterise outside a rectangular corner
    // sample. Check eight directions inside the actual curve, plus the centre.
    const points = circular ? [[r.width / 2, r.height / 2], ...Array.from({ length: 8 }, (_, index) => {
      const angle = index * Math.PI / 4, reach = r.width / 2 - 2;
      return [r.width / 2 + Math.cos(angle) * reach, r.height / 2 + Math.sin(angle) * reach];
    })] : legacyPoints;
    const sample = ([x, y]: number[]) => {
      const hit = document.elementFromPoint(r.left + x, r.top + y);
      return { point: [r.left + x, r.top + y], hit: hit?.tagName, hitId: hit?.id,
        clear: !!hit && (hit === element || element.contains(hit)) };
    };
    return { rect: [r.x, r.y, r.width, r.height], shape: circular ? "circle" : "rectangle",
      radii, circularBoundaryInset: circular ? 2 : null, hits: points.map(sample),
      legacyHits: legacyPoints.map(sample), scrollY,
      visualViewport: visualViewport ? { width: visualViewport.width, height: visualViewport.height,
        offsetTop: visualViewport.offsetTop, offsetLeft: visualViewport.offsetLeft, scale: visualViewport.scale } : null };
  });
}

// Same settled-hit pattern as Phase 3E1: scroll once, then observe. Never force
// a click, move overlays, inject a quote event, or reposition the target in a poll.
export function visibleWithoutScrolling(state: Awaited<ReturnType<typeof inspectControlHits>>) {
  const viewport = state.visualViewport;
  if (!viewport || viewport.scale !== 1 || state.rect.length !== 4 || state.hits.length < 5) return false;
  const [x, y, width, height] = state.rect;
  if (![x, y, width, height, viewport.width, viewport.height, viewport.offsetLeft, viewport.offsetTop].every(Number.isFinite)) return false;
  return width > 0 && height > 0 && viewport.width > 0 && viewport.height > 0 &&
    x >= viewport.offsetLeft && y >= viewport.offsetTop &&
    x + width <= viewport.offsetLeft + viewport.width && y + height <= viewport.offsetTop + viewport.height &&
    state.hits.every(hit => hit.clear === true);
}

export async function unobscured(control: Locator, mode: "prepare" | "observe" = "prepare") {
  await expect(control).toBeVisible();
  const beforeScroll = await inspectControlHits(control);
  const scrollRequired = !visibleWithoutScrolling(beforeScroll);
  await attach("control-scroll-decision", { scrollRequired, mode, before: beforeScroll });
  if (mode === "prepare" && scrollRequired) await control.evaluate(element => element.scrollIntoView({ behavior: "instant", block: "center", inline: "nearest" }));
  let previous: number[] | undefined;
  const observations: unknown[] = [];
  try {
    await expect.poll(async () => {
      const state = await inspectControlHits(control);
      observations.push(state);
      const stable = previous && state.rect.every((value, index) => Math.abs(value - previous![index]) <= 1);
      previous = state.rect;
      return !!stable && state.hits.every(hit => hit.clear) && (mode !== "observe" || visibleWithoutScrolling(state));
    }, { message: "The complete control must be naturally unobscured and settled" }).toBe(true);
  } finally { await attach("control-hit-observations", observations); }
}

export async function inspectLayout(root: Locator) {
  return root.evaluate(container => {
    const tolerance = 2;
    const viewport = document.documentElement.clientWidth;
    type Issue = { kind: string; text?: string; selector?: string; [key: string]: unknown };
    const issues: Issue[] = [];
    const label = (element: Element) => `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}.${Array.from(element.classList).slice(0, 4).join(".")}`;
    const srOnly = (element: Element) => {
      const candidate = element.closest(".sr-only");
      if (!(candidate instanceof HTMLElement)) return false;
      const style = getComputedStyle(candidate);
      return style.position === "absolute" && style.overflow === "hidden" && candidate.clientWidth <= 1 && candidate.clientHeight <= 1;
    };
    const visible = (element: Element) => {
      if (srOnly(element) || !element.getClientRects().length) return false;
      for (let parent: Element | null = element; parent; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse" || Number(style.opacity) === 0) return false;
      }
      return true;
    };
    const visibleTextNodes = (element: Element) => {
      const nodes: Text[] = [];
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const parent = node.parentElement;
        if (!parent || !node.textContent || parent.closest("script,style,noscript,svg") || !visible(parent)) continue;
        nodes.push(node as Text);
      }
      return nodes;
    };
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let textNodes = 0, fragments = 0;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || !node.textContent?.trim() || parent.closest("script,style,noscript,svg") || !visible(parent)) continue;
      textNodes++;
      const range = document.createRange(); range.selectNodeContents(node);
      for (const ink of Array.from(range.getClientRects()).filter(r => r.width > 0 && r.height > 0)) {
        fragments++;
        const text = node.textContent.trim().slice(0, 140);
        if (ink.left < -tolerance || ink.right > viewport + tolerance) issues.push({ kind: "ink-outside-viewport", text, rect: ink.toJSON() });
        let reachableVerticalScrollport = false;
        for (let ancestor: HTMLElement | null = parent; ancestor; ancestor = ancestor.parentElement) {
          const style = getComputedStyle(ancestor), rect = ancestor.getBoundingClientRect();
          // Root overflow clips at the viewport, not the root's scrolled box.
          // Fixed dialogs remain visible when scroll locking offsets the body.
          const root = ancestor === document.documentElement;
          const left = root ? 0 : rect.left + ancestor.clientLeft;
          const top = root ? 0 : rect.top + ancestor.clientTop;
          const clipX = /hidden|clip/.test(style.overflowX), clipY = /hidden|clip/.test(style.overflowY);
          if ((clipX && (ink.left < left - tolerance || ink.right > left + ancestor.clientWidth + tolerance)) ||
              (clipY && !reachableVerticalScrollport && (ink.top < top - tolerance || ink.bottom > top + ancestor.clientHeight + tolerance))) {
            issues.push({ kind: "clipped-text", text, selector: label(ancestor), overflowX: style.overflowX, overflowY: style.overflowY, rect: ink.toJSON() });
          }
          // A menu's off-screen rows are reachable through its own vertical
          // scrollport. Body scroll locking must not misclassify those rows.
          if (/auto|scroll/.test(style.overflowY) && ancestor.scrollHeight > ancestor.clientHeight) reachableVerticalScrollport = true;
        }
      }
    }
    const textElements = Array.from(container.querySelectorAll<HTMLElement>(
      "h1,h2,h3,h4,p,li,a,button,label,summary,dt,dd,.service-action-card__title,.service-related-card__title,.service-related-card__action,.service-credential-text > span",
    )).filter(visible);
    const context = document.createElement("canvas").getContext("2d")!;
    const segmenter = new Intl.Segmenter("en-AU", { granularity: "word" });
    for (const element of textElements) {
      const box = element.getBoundingClientRect(), style = getComputedStyle(element);
      // Parent ranges include clipped screen-reader suffixes. Measure visible
      // descendant text only, preserving whitespace between inline elements.
      const nodes = visibleTextNodes(element);
      const text = nodes.map(node => node.textContent).join("").trim();
      const lineTops = new Set<number>();
      for (const node of nodes) {
        if (!node.textContent?.trim()) continue;
        const range = document.createRange(); range.selectNodeContents(node);
        for (const rect of Array.from(range.getClientRects())) {
          if (rect.width > 0 && rect.height > 0) lineTops.add(Math.round(rect.top));
        }
      }
      const lines = lineTops.size;
      if (box.left < -tolerance || box.right > viewport + tolerance ||
          (element.clientWidth > 0 && element.scrollWidth > element.clientWidth + tolerance)) {
        issues.push({ kind: "element-overflow", selector: label(element), text, rect: box.toJSON(), client: element.clientWidth, scroll: element.scrollWidth });
      }
      const minimum = Math.min(120, parseFloat(style.fontSize) * 4);
      if (lines > 1 && box.width > 0 && box.width < minimum) issues.push({ kind: "unreadably-narrow-column", text, width: box.width, minimum, lines });
      if (element.matches("h1,h2,h3,h4,.service-action-card__title,.service-related-card__title,.service-credential-text > span")) {
        context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const available = box.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
        const spacing = parseFloat(style.letterSpacing) || 0;
        // Hyphens and slashes permit ordinary line breaks. The independent
        // rendered-fragment checks still catch nowrap and nonbreaking overflow.
        const words = Array.from(segmenter.segment(text)).filter(part => part.isWordLike).map(part => part.segment);
        for (const word of words) {
          const measured = context.measureText(word).width + Math.max(0, word.length - 1) * spacing;
          if (measured > available + 1) issues.push({ kind: "word-does-not-fit", selector: label(element), word, measured, available });
        }
      }
    }
    // Compare only normal-flow siblings. Decorative absolute layers are not
    // content columns; their ability to cover a control is measured by hit tests.
    const groups = Array.from(container.querySelectorAll<HTMLElement>(
      ".grid,.service-action-card__summary,.service-credential-card,.service-detail-action-group,.service-related-card,section:last-of-type > .mx-auto",
    )).filter(visible);
    let pairs = 0;
    for (const group of groups) {
      const children = Array.from(group.children).filter(child => visible(child) && !/absolute|fixed/.test(getComputedStyle(child).position));
      for (let i = 0; i < children.length; i++) for (let j = i + 1; j < children.length; j++) {
        const a = children[i].getBoundingClientRect(), b = children[j].getBoundingClientRect();
        if (!a.width || !a.height || !b.width || !b.height) continue;
        pairs++;
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > tolerance && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > tolerance) {
          issues.push({ kind: "sibling-overlap", selector: label(group), first: label(children[i]), second: label(children[j]), a: a.toJSON(), b: b.toJSON() });
        }
      }
    }
    return { root: label(container), rootFont: getComputedStyle(document.documentElement).fontSize,
      textNodes, fragments, textElements: textElements.length, pairs, issues,
      pageOverflow: document.documentElement.scrollWidth - viewport };
  });
}

export async function assertLayout(root: Locator, name: string, includeDocumentOverflow = false) {
  const result = await inspectLayout(root);
  await attach(name, result);
  expect(result.textNodes, "Text checks must not pass vacuously").toBeGreaterThan(0);
  expect(result.fragments).toBeGreaterThan(0);
  expect(result.issues, name).toEqual([]);
  if (includeDocumentOverflow) expect(result.pageOverflow).toBeLessThanOrEqual(2);
}

export async function inspectTargets(controls: Locator) {
  return controls.evaluateAll(elements => elements.map(element => {
    const r = element.getBoundingClientRect();
    return { text: element.textContent?.trim(), name: element.getAttribute("aria-label"), href: element.getAttribute("href"),
      width: r.width, height: r.height, visible: !!r.width && !!r.height && getComputedStyle(element).visibility !== "hidden" };
  }));
}

export async function assertTargets(controls: Locator, name: string) {
  const measurements = await inspectTargets(controls);
  await attach(name, measurements);
  expect(measurements.length, "Expected real controls").toBeGreaterThan(0);
  expect(measurements.filter(row => !row.visible || row.width < 44 || row.height < 44), name).toEqual([]);
}

export function focusIndicatorState(element: Element) {
  const style = getComputedStyle(element), r = element.getBoundingClientRect();
  const width = parseFloat(style.outlineWidth), offset = parseFloat(style.outlineOffset) || 0;
  const clips: string[] = [];
  const clippingGeometry: { ancestor: string; bounds: number[]; overflow: string[] }[] = [];
  let escapesOverflow = style.position === "fixed";
  for (let p = element.parentElement; p; p = p.parentElement) {
    const s = getComputedStyle(p), b = p.getBoundingClientRect(), reach = width + offset;
    const root = p === document.documentElement;
    const backdrop = s.getPropertyValue("backdrop-filter");
    const fixedContainingBlock = s.transform !== "none" || s.perspective !== "none" ||
      s.filter !== "none" || (!!backdrop && backdrop !== "none") ||
      /(?:paint|layout|strict|content)/.test(s.contain) ||
      /(?:transform|perspective|filter)/.test(s.willChange) || s.contentVisibility === "auto";
    if (fixedContainingBlock) escapesOverflow = false;
    // A viewport-fixed descendant escapes intervening overflow boxes, but not
    // its own containing block, a transformed ancestor or the viewport.
    if (root || !escapesOverflow) {
      const left = root ? 0 : b.left + p.clientLeft;
      const top = root ? 0 : b.top + p.clientTop;
      const right = left + p.clientWidth, bottom = top + p.clientHeight;
      if (((root || /hidden|clip|auto|scroll/.test(s.overflowX)) && (r.left - reach < left || r.right + reach > right)) ||
          ((root || /hidden|clip|auto|scroll/.test(s.overflowY)) && (r.top - reach < top || r.bottom + reach > bottom))) {
        const ancestor = `${p.tagName.toLowerCase()}${p.id ? `#${p.id}` : ""}.${p.className}`;
        clips.push(ancestor);
        clippingGeometry.push({ ancestor, bounds: [left, top, right, bottom], overflow: [s.overflowX, s.overflowY] });
      }
    }
    if (s.position === "fixed") escapesOverflow = true;
  }
  return { focusVisible: element.matches(":focus-visible"), outlineStyle: style.outlineStyle,
    width, color: style.outlineColor, clips, clippingGeometry, rect: r.toJSON(), offset,
    text: element.textContent?.trim(), scroll: [scrollX, scrollY] };
}

export async function focusVisible(page: Page, control: Locator) {
  await unobscured(control);
  await page.keyboard.press("Tab");
  await control.focus();
  await expect(control).toBeFocused();
  await attach("keyboard-focus-before-settle", await control.evaluate(focusIndicatorState));
  // Native focus scrolling may finish after focus() resolves, especially in WebKit.
  await settle(page);
  await expect(control).toBeFocused();
  const result = await control.evaluate(focusIndicatorState);
  await attach("keyboard-focus", result);
  expect(result.focusVisible).toBe(true);
  expect(result.outlineStyle).not.toBe("none");
  expect(result.width).toBeGreaterThan(0);
  expect(result.color).not.toMatch(/transparent|rgba\([^)]*,\s*0\)/);
  expect(result.clips).toEqual([]);
}

export function heroQuote(page: Page) {
  return page.locator('main > .brand-internal-hero .internal-hero-copy-panel [data-quote-trigger="true"]');
}
export function finalQuote(page: Page) {
  return page.locator('main > section:last-of-type [data-quote-trigger="true"]');
}

export async function lockSnapshot(page: Page) {
  return page.evaluate(() => ({
    x: scrollX, y: scrollY,
    html: [document.documentElement.style.overflow, document.documentElement.style.scrollBehavior, document.documentElement.style.overscrollBehavior],
    body: [document.body.style.overflow, document.body.style.position, document.body.style.top,
      document.body.style.left, document.body.style.right, document.body.style.width, document.body.style.paddingRight, document.body.style.overscrollBehavior],
    locks: [document.body.classList.contains("quote-modal-open"), document.body.classList.contains("mobile-menu-open")],
    landmarks: Array.from(document.querySelectorAll<HTMLElement>("header.site-header,main#main-content,[data-site-footer]")).map(e => ({ inert: e.inert, ariaHidden: e.getAttribute("aria-hidden") })),
  }));
}

export async function expectRestored(page: Page, before: Awaited<ReturnType<typeof lockSnapshot>>) {
  await expect.poll(async () => {
    const after = await lockSnapshot(page);
    return { ...after, x: Math.abs(after.x - before.x) <= 1 ? before.x : after.x,
      y: Math.abs(after.y - before.y) <= 1 ? before.y : after.y };
  }, { message: "Restore the actual pre-overlay focus/scroll-lock state, including next-frame cleanup" }).toEqual(before);
  await settle(page);
}

export async function quoteCycle(page: Page, row: RouteCase, opener: Locator, mode: "Escape" | "Back", input: "keyboard" | "pointer", traverseFrame = false) {
  await expect(opener).toHaveCount(1);
  await expect(opener).toHaveAttribute("href", /^https:\/\/book\.servicem8\.com\//);
  await expect(opener).toHaveAttribute("aria-haspopup", "dialog");
  await assertTargets(opener, "main-quote-target-44x44");
  await focusVisible(page, opener);
  await settle(page);
  let before = await lockSnapshot(page);
  if (input === "keyboard") await page.keyboard.press("Enter");
  else {
    // Locator clicks may scroll sticky controls before dispatching real input.
    const receipt = await opener.evaluateHandle(element => {
      let position: { x: number; y: number; trusted: boolean; button: number } | null = null;
      let count = 0;
      const record = (event: PointerEvent) => {
        if (!event.composedPath().includes(element)) return;
        position = { x: scrollX, y: scrollY, trusted: event.isTrusted, button: event.button };
        count++;
      };
      window.addEventListener("pointerdown", record, true);
      return {
        read: () => ({ position, count }),
        stop: () => window.removeEventListener("pointerdown", record, true),
      };
    });
    try {
      await opener.click();
      const { position, count } = await receipt.evaluate(observer => observer.read());
      expect(count).toBe(1);
      expect(position).not.toBeNull();
      expect(position!.trusted).toBe(true);
      expect(position!.button).toBe(0);
      await attach("quote-pointer-input", { preDriver: before, position, count });
      before = { ...before, x: position!.x, y: position!.y };
    } finally {
      await receipt.evaluate(observer => observer.stop());
      await receipt.dispose();
    }
  }
  await attach("quote-input-lock-snapshot", { input, before });
  const dialog = page.getByRole("dialog", { name: "Request a quote", exact: true });
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole("button", { name: "Close quote form", exact: true });
  await expect(close).toBeFocused();
  expect(await page.evaluate(() => document.body.style.position)).toBe("fixed");
  const lockedY = await page.evaluate(() => -parseFloat(document.body.style.top));
  expect(Math.abs(lockedY - before.y)).toBeLessThanOrEqual(1);
  await attach("quote-captured-lock-position", { input, expectedY: before.y, lockedY });
  await expect(page.locator("main#main-content")).toHaveAttribute("inert", "");
  expect(await page.evaluate(() => window.history.state?.quoteModal)).toBe(true);
  if (traverseFrame) {
    await expect(dialog.frameLocator('iframe[title="Evaready Electrical quote form"]').locator("body")).toContainText("No submission is possible.");
    for (const key of ["Tab", "Shift+Tab"]) {
      await close.focus();
      for (let n = 0; n < 6; n++) {
        await page.keyboard.press(key);
        expect(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(true);
      }
    }
    await close.focus();
  }
  if (mode === "Escape") await page.keyboard.press("Escape");
  else await page.goBack();
  await expect(dialog).toHaveCount(0);
  await expectRestored(page, before);
  await expect(opener).toBeFocused();
  expect(new URL(page.url()).pathname).toBe(row.pathname);
  expect(await page.evaluate(() => window.history.state?.quoteModal === true)).toBe(false);
  // Observe restoration before any preparation helper can move the opener.
  await unobscured(opener, "observe");
}

export async function assertReducedMotion(root: Locator) {
  const motion = await root.evaluate(element => {
    const results: unknown[] = [];
    for (const child of [element, ...Array.from(element.querySelectorAll("*"))]) {
      if (!child.getClientRects().length) continue;
      for (const pseudo of [null, "::before", "::after"]) {
        const style = getComputedStyle(child, pseudo);
        if (pseudo && (style.content === "none" || style.content === "normal")) continue;
        const seconds = (value: string) => value.split(",").map(s => s.trim()).map(s => parseFloat(s) * (s.endsWith("ms") ? 0.001 : 1));
        if ((style.animationName !== "none" && seconds(style.animationDuration).some(s => s > 0.001)) || seconds(style.transitionDuration).some(s => s > 0.001)) {
          results.push({ tag: child.tagName, className: child.getAttribute("class"), pseudo,
            animation: style.animationName, duration: style.animationDuration, transition: style.transitionDuration });
        }
      }
    }
    return { reduced: matchMedia("(prefers-reduced-motion: reduce)").matches, results };
  });
  await attach("reduced-motion", motion);
  expect(motion.reduced).toBe(true);
  expect(motion.results, "Reduced motion must affect the rendered styles").toEqual([]);
}
