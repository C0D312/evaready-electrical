export function installServiceCardReturn() {
  type Bookmark = {
    id: string; source: string; destination: string; pathname: string; scope: string; heading: string;
    index: number; href: string; name: string; x: number; y: number;
    phase: "departing" | "destination" | "returning";
  };
  const selector = "main[data-service-scope] a.service-review-card__action";
  const historyKey = "__evServiceCardReturn";
  let bookmark: Bookmark | null = null;
  let committedPathname = "";
  let routerState: { pathname: string; browserPathname: string; scope: string; heading: string;
    state: Record<string, unknown> } | null = null;
  let returnNavigation: { url: string; pathname: string } | null = null;
  let generation = 0;
  let frame = 0;
  let observer: MutationObserver | null = null;
  let disposed = false;
  let restoring = false;
  const normalise = (path: string) => path.replace(/\/$/, "") || "/";
  const overlayOwns = () => document.body.matches(".quote-modal-open,.mobile-menu-open") ||
    Array.from(document.querySelectorAll('[aria-modal="true"],dialog[open]')).some(element => {
      const style = getComputedStyle(element);
      return element.getClientRects().length && style.display !== "none" && style.visibility === "visible";
    });
  const cancel = (clearNavigation = true) => {
    generation++;
    window.cancelAnimationFrame(frame);
    frame = 0;
    observer?.disconnect();
    observer = null;
    bookmark = null;
    if (clearNavigation) returnNavigation = null;
  };
  const visible = (element: HTMLElement) => {
    if (!element.isConnected || element.tabIndex < 0 || element.closest('[inert],[hidden],[aria-hidden="true"]') ||
      element.matches(':disabled,[aria-disabled="true"]') || !element.getClientRects().length) return false;
    for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (style.display === "none" || style.visibility !== "visible" || Number(style.opacity) === 0) return false;
    }
    return true;
  };
  const matchingTarget = (saved: Bookmark) => {
    const main = document.querySelector("main[data-service-scope]");
    if (main?.getAttribute("data-service-scope") !== saved.scope ||
      main.querySelector("h1")?.textContent?.trim() !== saved.heading) return { committed: false, target: null };
    const target = document.querySelectorAll<HTMLAnchorElement>(selector)[saved.index];
    return { committed: true, target: target?.getAttribute("href") === saved.href &&
      target.getAttribute("aria-label") === saved.name && visible(target) ? target : null };
  };
  const scheduleReturn = () => {
    const saved = bookmark;
    if (!saved || saved.phase !== "returning" || frame || disposed) return;
    if (location.href !== saved.source || overlayOwns()) { cancel(false); return; }
    const matched = matchingTarget(saved);
    if (!matched.committed) return;
    observer?.disconnect();
    observer = null;
    if (!matched.target) { cancel(false); return; }
    const target = matched.target;
    const token = generation;
    frame = window.requestAnimationFrame(() => {
      if (disposed || token !== generation || bookmark !== saved) return;
      frame = 0;
      if (location.href !== saved.source ||
        history.state?.[historyKey] !== saved.id || overlayOwns() || matchingTarget(saved).target !== target) {
        cancel(false);
        return;
      }
      // Set the saved viewport before focus so A10 sees the original visible
      // target, rather than scheduling a competing scroll from the page top.
      restoring = true;
      window.scrollTo({ left: saved.x, top: saved.y, behavior: "instant" });
      target.focus({ preventScroll: true });
      restoring = false;
      cancel(false);
    });
  };
  const onClick = (event: MouseEvent) => {
    const element = event.target instanceof Element ? event.target.closest("a") : null;
    if (!element) return;
    cancel();
    if (!(element instanceof HTMLAnchorElement) || !element.matches(selector) || event.defaultPrevented ||
      event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey ||
      element.hasAttribute("download") || (element.target && element.target !== "_self") || overlayOwns() || !visible(element)) return;
    const source = new URL(location.href), destination = new URL(element.href);
    if (source.search || destination.search || !["", "#main-content", "#site-footer"].includes(source.hash) ||
      source.origin !== destination.origin || normalise(source.pathname) === normalise(destination.pathname) ||
      !normalise(source.pathname).endsWith(normalise(committedPathname))) return;
    const main = element.closest("main[data-service-scope]")!;
    const scope = main.getAttribute("data-service-scope"), heading = main.querySelector("h1")?.textContent?.trim();
    const name = element.getAttribute("aria-label"), href = element.getAttribute("href");
    if (!scope || !heading || !name || !href) return;
    const current = history.state;
    const nextState = current?.__NA === true ? current :
      routerState?.pathname === committedPathname ? routerState.state : null;
    if (nextState?.__NA !== true || !nextState.__PRIVATE_NEXTJS_INTERNALS_TREE) return;
    const id = crypto.randomUUID();
    // Native fragment entries can be null. Reuse only the opaque router state
    // captured for this same committed source; never manufacture an RSC tree.
    history.replaceState({ ...current, ...nextState, [historyKey]: id }, "", source.href);
    bookmark = { id, source: source.href, destination: destination.href, pathname: committedPathname,
      scope, heading, index: Array.from(document.querySelectorAll(selector)).indexOf(element),
      href, name, x: scrollX, y: scrollY, phase: "departing" };
  };
  const onPopState = (event: PopStateEvent) => {
    const saved = bookmark;
    if (!saved || saved.phase === "returning" || event.state?.[historyKey] !== saved.id || location.href !== saved.source) {
      cancel();
      return;
    }
    generation++;
    saved.phase = "returning";
    returnNavigation = { url: saved.source, pathname: saved.pathname };
    observer = new MutationObserver(scheduleReturn);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    scheduleReturn();
  };
  const cancelInput = () => {
    if (!restoring && bookmark && bookmark.phase !== "destination") cancel(false);
  };
  const onFocus = (event: FocusEvent) => {
    if (bookmark?.phase !== "returning" || restoring) return;
    // The router's main/body landing is part of the expected DOM commit.
    // An actual subsequent key/pointer is independently cancelled above.
    if (event.target !== document.body && event.target !== document.documentElement &&
      event.target !== document.querySelector("main#main-content")) cancel(false);
  };
  const onHash = () => {
    if (bookmark?.phase === "returning" && location.href === bookmark.source) return;
    if (bookmark && location.href === bookmark.destination) return;
    if (returnNavigation?.url === location.href) return;
    cancel();
    const main = document.querySelector("main[data-service-scope]");
    // Keep the browser's native fragment focus/scroll. Only repair its null
    // history state using the opaque state from this same committed page.
    if (history.state === null && routerState && !overlayOwns() &&
      ["#main-content", "#site-footer"].includes(location.hash) && !location.search &&
      normalise(location.pathname) === routerState.browserPathname &&
      main?.getAttribute("data-service-scope") === routerState.scope &&
      main.querySelector("h1")?.textContent?.trim() === routerState.heading) {
      history.replaceState({ ...routerState.state }, "", location.href);
    }
  };
  const onPageHide = () => cancel();
  const overlayObserver = new MutationObserver(records => {
    if (overlayOwns() || records.some(record =>
      /(?:^|\s)(?:quote-modal-open|mobile-menu-open)(?:\s|$)/.test(record.oldValue ?? ""))) cancel(false);
  });
  overlayObserver.observe(document.body, { attributes: true, attributeFilter: ["class"], attributeOldValue: true });
  document.addEventListener("click", onClick, true);
  document.addEventListener("focusin", onFocus, true);
  const inputs = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
  for (const type of inputs) document.addEventListener(type, cancelInput, { capture: true, passive: true });
  window.addEventListener("popstate", onPopState);
  window.addEventListener("hashchange", onHash);
  window.addEventListener("pagehide", onPageHide);
  return {
    routeCommitted(pathname: string) {
      committedPathname = pathname;
      const main = document.querySelector("main[data-service-scope]");
      const scope = main?.getAttribute("data-service-scope"), heading = main?.querySelector("h1")?.textContent?.trim();
      if (history.state?.__NA === true && scope && heading && normalise(pathname) !== "/" &&
        normalise(location.pathname).endsWith(normalise(pathname))) routerState = {
        pathname, browserPathname: normalise(location.pathname), scope, heading, state: {
        __NA: history.state.__NA, __PRIVATE_NEXTJS_INTERNALS_TREE: history.state.__PRIVATE_NEXTJS_INTERNALS_TREE,
      } };
      const returning = returnNavigation?.url === location.href && returnNavigation.pathname === pathname;
      if (returning) {
        returnNavigation = null;
        scheduleReturn();
        return true;
      }
      if (bookmark?.phase === "departing" && location.href === bookmark.destination) bookmark.phase = "destination";
      else if (bookmark && location.href !== bookmark.source && location.href !== bookmark.destination) cancel();
      return false;
    },
    dispose() {
      disposed = true;
      cancel();
      routerState = null;
      overlayObserver.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocus, true);
      for (const type of inputs) document.removeEventListener(type, cancelInput, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("pagehide", onPageHide);
    },
  };
}
