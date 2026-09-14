"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { installServiceCardReturn } from "./service-card-return";

export function installServiceFocusVisibility() {
  let generation = 0;
  let frame = 0;
  let active = true;
  const selector = 'main[data-service-scope] :is(a[href],button,summary,input,select,textarea),#site-footer :is(a[href],button)';
  const overlayOwnsScroll = () => document.body.matches('.mobile-menu-open,.quote-modal-open') ||
    Array.from(document.querySelectorAll('[aria-modal="true"],dialog[open]')).some(element => {
      const style = getComputedStyle(element);
      return element.getClientRects().length && style.display !== "none" && style.visibility === "visible";
    });
  const eligible = (element: HTMLElement) => {
    if (!active || !element.isConnected || document.activeElement !== element || !element.matches(selector) ||
      !element.matches(":focus-visible") || element.tabIndex < 0 || element.matches(':disabled,[aria-disabled="true"]') ||
      element.closest('[inert],[hidden],[aria-hidden="true"],[role="dialog"],dialog,.sr-only') || overlayOwnsScroll()) return false;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1 || !element.getClientRects().length) return false;
    for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (style.visibility !== "visible" || style.display === "none" || Number(style.opacity) === 0 ||
        style.clip !== "auto" || style.clipPath !== "none" || style.contentVisibility === "hidden") return false;
    }
    return true;
  };
  const geometry = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const rootStyle = getComputedStyle(document.documentElement);
    const number = (value: string) => Math.max(0, parseFloat(value) || 0);
    const ring = number(style.outlineWidth) + Math.max(0, parseFloat(style.outlineOffset) || 0) + 1;
    const verticalMargin = Math.max(ring, number(style.scrollMarginTop), number(style.scrollMarginBottom));
    const horizontalMargin = Math.max(ring, number(style.scrollMarginLeft), number(style.scrollMarginRight));
    const viewport = window.visualViewport;
    let top = (viewport?.offsetTop ?? 0) + number(rootStyle.scrollPaddingTop);
    let bottom = (viewport?.offsetTop ?? 0) + (viewport?.height ?? innerHeight) - number(rootStyle.scrollPaddingBottom);
    const left = (viewport?.offsetLeft ?? 0) + number(rootStyle.scrollPaddingLeft);
    const right = (viewport?.offsetLeft ?? 0) + (viewport?.width ?? innerWidth) - number(rootStyle.scrollPaddingRight);
    for (const fixed of document.querySelectorAll('header.site-header,.mobile-sticky-cta')) {
      const fixedStyle = getComputedStyle(fixed);
      const box = fixed.getBoundingClientRect();
      if (fixedStyle.position !== "fixed" || fixedStyle.visibility !== "visible" || fixedStyle.display === "none" ||
        Number(fixedStyle.opacity) === 0 || !fixed.getClientRects().length || box.bottom <= 0 || box.top >= innerHeight) continue;
      if (fixed.matches("header")) top = Math.max(top, box.bottom);
      else bottom = Math.min(bottom, box.top);
    }
    return { rect, top: top + verticalMargin, bottom: bottom - verticalMargin,
      left: left + horizontalMargin, right: right - horizontalMargin };
  };
  const clipped = (box: ReturnType<typeof geometry>) => box.rect.top <= box.top || box.rect.bottom >= box.bottom ||
    box.rect.left <= box.left || box.rect.right >= box.right;
  const cancel = () => {
    generation++;
    window.cancelAnimationFrame(frame);
    frame = 0;
  };
  const onFocus = (event: FocusEvent) => {
    cancel();
    const element = event.target;
    if (!(element instanceof HTMLElement) || !eligible(element) || !clipped(geometry(element))) return;
    const token = generation;
    const url = location.href;
    const historyLength = history.length;
    frame = window.requestAnimationFrame(() => {
      if (token !== generation || location.href !== url || history.length !== historyLength || !eligible(element) ||
        !clipped(geometry(element))) return;
      frame = 0;
      // Native focus already scrolls ancestor containers. A second scrollIntoView
      // can later overwrite Firefox's fixed-control clearance correction.
      // Apply only one measured viewport correction; never move keyboard focus.
      const box = geometry(element);
      const nearest = (start: number, end: number, low: number, high: number) => {
        if (start >= low && end <= high) return 0;
        if (start < low && end > high) return 0;
        if (end - start > high - low) return start < low ? end - high : start - low;
        return start < low ? start - low : end - high;
      };
      const x = nearest(box.rect.left, box.rect.right, box.left, box.right);
      const y = nearest(box.rect.top, box.rect.bottom, box.top, box.bottom);
      if (x || y) window.scrollBy({ left: x, top: y, behavior: "instant" });
    });
  };
  const documentEvents = ["focusout", "keydown", "pointerdown", "wheel", "touchstart"] as const;
  const windowEvents = ["popstate", "hashchange", "pagehide", "blur"] as const;
  document.addEventListener("focusin", onFocus, true);
  for (const type of documentEvents) document.addEventListener(type, cancel, { capture: true, passive: true });
  for (const type of windowEvents) window.addEventListener(type, cancel);
  const overlayObserver = new MutationObserver(records => {
    if (document.body.matches('.mobile-menu-open,.quote-modal-open') || records.some(record =>
      /(?:^|\s)(?:mobile-menu-open|quote-modal-open)(?:\s|$)/.test(record.oldValue ?? ""))) cancel();
  });
  overlayObserver.observe(document.body, { attributes: true, attributeFilter: ["class"], attributeOldValue: true });
  return () => {
    active = false;
    cancel();
    overlayObserver.disconnect();
    document.removeEventListener("focusin", onFocus, true);
    for (const type of documentEvents) document.removeEventListener(type, cancel, true);
    for (const type of windowEvents) window.removeEventListener(type, cancel);
  };
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function RouteScrollManager() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const cardReturn = useRef<ReturnType<typeof installServiceCardReturn> | null>(null);

  useEffect(() => {
    const controller = installServiceCardReturn();
    cardReturn.current = controller;
    return () => {
      controller.dispose();
      cardReturn.current = null;
    };
  }, []);

  useEffect(installServiceFocusVisibility, [pathname]);

  useEffect(() => {
    const returningToCard = cardReturn.current?.routeCommitted(pathname) === true;
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    if (returningToCard) return;
    scrollToPageTop();

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      scrollToPageTop();
      secondFrame = window.requestAnimationFrame(scrollToPageTop);
    });
    const settledTimer = window.setTimeout(scrollToPageTop, 120);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settledTimer);
    };
  }, [pathname]);

  return null;
}
