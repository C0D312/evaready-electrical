export function installDropdownFocusVisibility(panel: HTMLElement, scope: "desktop" | "mobile" = "desktop") {
  let frame = 0;
  let generation = 0;
  let active = true;
  const cancel = () => {
    generation++;
    window.cancelAnimationFrame(frame);
    frame = 0;
  };
  const ownsPanel = () => !document.body.matches(".quote-modal-open") && (scope === "mobile"
    ? panel.id === "mobile-site-menu" && document.body.matches(".mobile-menu-open")
    : !document.body.matches(".mobile-menu-open"));
  const eligible = (element: HTMLElement) => {
    if (!active || !panel.isConnected || !element.isConnected || !panel.contains(element) ||
      document.activeElement !== element || !element.matches(":focus-visible") ||
      !element.matches('a[href],button,input,select,textarea') || element.tabIndex < 0 ||
      element.matches(':disabled,[aria-disabled="true"]') ||
      element.closest('[inert],[hidden],[aria-hidden="true"]') || !ownsPanel()) return false;
    for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (!parent.getClientRects().length || style.display === "none" || style.visibility !== "visible" ||
        Number(style.opacity) === 0) return false;
    }
    return true;
  };
  const onFocus = (event: FocusEvent) => {
    cancel();
    const element = event.target;
    if (!(element instanceof HTMLElement) || !eligible(element)) return;
    const token = generation;
    const url = location.href;
    const historyLength = history.length;
    frame = window.requestAnimationFrame(() => {
      if (token !== generation || location.href !== url || history.length !== historyLength || !eligible(element)) return;
      frame = 0;
      const box = panel.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const padding = getComputedStyle(panel);
      const number = (value: string) => Math.max(0, parseFloat(value) || 0);
      const ring = number(style.outlineWidth) + number(style.outlineOffset) + 1;
      const top = box.top + panel.clientTop + Math.max(ring, number(padding.scrollPaddingTop), number(style.scrollMarginTop));
      const bottom = box.top + panel.clientTop + panel.clientHeight - Math.max(ring, number(padding.scrollPaddingBottom), number(style.scrollMarginBottom));
      const left = box.left + panel.clientLeft + Math.max(ring, number(padding.scrollPaddingLeft), number(style.scrollMarginLeft));
      const right = box.left + panel.clientLeft + panel.clientWidth - Math.max(ring, number(padding.scrollPaddingRight), number(style.scrollMarginRight));
      const nearest = (start: number, end: number, low: number, high: number) => {
        if (start < low && end > high) return 0;
        return start < low ? start - low : end > high ? end - high : 0;
      };
      const x = nearest(rect.left, rect.right, left, right);
      const y = nearest(rect.top, rect.bottom, top, bottom);
      // Native focus can leave a control partially visible. Correct only this
      // panel after native scrolling, without moving focus or page scroll.
      if (x || y) panel.scrollBy({ left: x, top: y, behavior: "instant" });
    });
  };
  const documentEvents = ["focusout", "keydown", "pointerdown", "wheel", "touchstart"] as const;
  const windowEvents = ["popstate", "hashchange", "pagehide", "blur"] as const;
  panel.addEventListener("focusin", onFocus);
  for (const event of documentEvents) document.addEventListener(event, cancel, { capture: true, passive: true });
  for (const event of windowEvents) window.addEventListener(event, cancel);
  const observer = new MutationObserver(records => {
    if (document.body.matches('.mobile-menu-open,.quote-modal-open') || records.some(record =>
      /(?:^|\s)(?:mobile-menu-open|quote-modal-open)(?:\s|$)/.test(record.oldValue ?? ""))) cancel();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"], attributeOldValue: true });
  return () => {
    active = false;
    cancel();
    observer.disconnect();
    panel.removeEventListener("focusin", onFocus);
    for (const event of documentEvents) document.removeEventListener(event, cancel, true);
    for (const event of windowEvents) window.removeEventListener(event, cancel);
  };
}
