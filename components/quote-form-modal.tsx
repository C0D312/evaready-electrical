"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import { business } from "@/data/site";

const ServiceM8Frame = dynamic(
  () =>
    import("@/components/service-m8-frame").then(
      (module) => module.ServiceM8Frame,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full items-center justify-center bg-white px-5 text-center text-sm font-bold text-slate-700"
        role="status"
      >
        Loading the secure quote form...
      </div>
    ),
  },
);

type ScrollLockSnapshot = {
  scrollX: number;
  scrollY: number;
  htmlOverflow: string;
  htmlScrollBehavior: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
};

export function QuoteFormModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const scrollLockRef = useRef<ScrollLockSnapshot | null>(null);
  const openRef = useRef(false);
  const modalHistoryPushedRef = useRef(false);
  const historyCloseFallbackRef = useRef<number | null>(null);
  const pendingOpenTimerRef = useRef<number | null>(null);

  const removeQuoteModalHistoryMarker = useCallback(() => {
    if (window.history.state?.quoteModal !== true) {
      return;
    }

    const nextState = { ...window.history.state };
    delete nextState.quoteModal;
    window.history.replaceState(nextState, "", window.location.href);
  }, []);

  const releaseScrollLock = useCallback(() => {
    const locked = scrollLockRef.current;
    scrollLockRef.current = null;

    if (!locked || typeof window === "undefined") {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = locked.htmlOverflow;
    html.style.scrollBehavior = "auto";
    html.style.removeProperty("--quote-modal-vh");
    body.classList.remove("quote-modal-open");
    body.style.overflow = locked.bodyOverflow;
    body.style.paddingRight = locked.bodyPaddingRight;
    body.style.position = locked.bodyPosition;
    body.style.top = locked.bodyTop;
    body.style.left = locked.bodyLeft;
    body.style.right = locked.bodyRight;
    body.style.width = locked.bodyWidth;
    window.scrollTo(locked.scrollX, locked.scrollY);

    if (openerRef.current?.isConnected) {
      openerRef.current.focus({ preventScroll: true });
    }

    window.requestAnimationFrame(() => {
      window.scrollTo(locked.scrollX, locked.scrollY);
      html.style.scrollBehavior = locked.htmlScrollBehavior;
    });
  }, []);

  const finishClose = useCallback(() => {
    if (historyCloseFallbackRef.current !== null) {
      window.clearTimeout(historyCloseFallbackRef.current);
      historyCloseFallbackRef.current = null;
    }

    openRef.current = false;
    modalHistoryPushedRef.current = false;
    setOpen(false);
    releaseScrollLock();
  }, [releaseScrollLock]);

  const close = useCallback((syncHistory = true) => {
    if (!openRef.current && !scrollLockRef.current) {
      return;
    }

    const shouldStepBack =
      syncHistory &&
      modalHistoryPushedRef.current &&
      typeof window !== "undefined" &&
      window.history.state?.quoteModal === true;

    if (shouldStepBack) {
      historyCloseFallbackRef.current = window.setTimeout(() => {
        historyCloseFallbackRef.current = null;
        removeQuoteModalHistoryMarker();
        finishClose();
      }, 300);
      window.history.back();
      return;
    }

    finishClose();
  }, [finishClose, removeQuoteModalHistoryMarker]);

  const openModal = useCallback((opener: HTMLElement) => {
    if (openRef.current) {
      return;
    }

    if (window.history.state?.quoteModal !== true) {
      const currentState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      window.history.pushState(
        { ...currentState, quoteModal: true },
        "",
        window.location.href,
      );
      modalHistoryPushedRef.current = true;
    }

    openerRef.current = opener;
    openRef.current = true;
    setOpen(true);
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href") ?? "";
      const opensBookingForm =
        link.dataset.quoteTrigger === "true" ||
        href === business.bookingUrl ||
        link.href === business.bookingUrl ||
        link.href.startsWith(business.bookingUrl) ||
        link.href.startsWith(`${business.bookingUrl}&`);

      if (!opensBookingForm) {
        return;
      }

      event.preventDefault();
      const mobileMenuTrigger = document.querySelector<HTMLElement>(
        '[aria-controls="mobile-site-menu"]',
      );

      if (link.closest("#mobile-site-menu")) {
        if (pendingOpenTimerRef.current !== null) {
          window.clearTimeout(pendingOpenTimerRef.current);
        }

        pendingOpenTimerRef.current = window.setTimeout(() => {
          pendingOpenTimerRef.current = null;
          openModal(
            mobileMenuTrigger?.isConnected ? mobileMenuTrigger : link,
          );
        }, 0);
        return;
      }

      openModal(link);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      if (pendingOpenTimerRef.current !== null) {
        window.clearTimeout(pendingOpenTimerRef.current);
        pendingOpenTimerRef.current = null;
      }
    };
  }, [openModal]);

  useEffect(() => {
    if (!openRef.current) {
      removeQuoteModalHistoryMarker();
    }

    function closeOnPopState() {
      if (!openRef.current && !scrollLockRef.current) {
        return;
      }

      finishClose();
    }

    window.addEventListener("popstate", closeOnPopState);

    return () => {
      window.removeEventListener("popstate", closeOnPopState);
      if (historyCloseFallbackRef.current !== null) {
        window.clearTimeout(historyCloseFallbackRef.current);
        historyCloseFallbackRef.current = null;
      }
    };
  }, [finishClose, removeQuoteModalHistoryMarker]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    function syncViewportHeight() {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      html.style.setProperty("--quote-modal-vh", `${viewportHeight}px`);
    }

    const snapshot: ScrollLockSnapshot = {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      htmlOverflow: html.style.overflow,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    scrollLockRef.current = snapshot;
    syncViewportHeight();
    body.classList.add("quote-modal-open");
    html.style.scrollBehavior = "auto";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${snapshot.scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("scroll", syncViewportHeight);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("scroll", syncViewportHeight);
      releaseScrollLock();
    };
  }, [close, open, releaseScrollLock]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="quote-modal-backdrop fixed inset-0 z-[100] grid h-[100dvh] w-[100vw] place-items-center overflow-hidden bg-[#061E72]/88 p-0 backdrop-blur-sm sm:w-auto sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <button
        type="button"
        aria-label="Close quote form"
        className="absolute inset-0 hidden sm:block"
        onClick={() => close()}
      />

      <div
        ref={panelRef}
        className="quote-modal-panel fixed inset-0 mx-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-[100vw] max-w-[100vw] flex-col overflow-hidden overflow-x-hidden rounded-none border-0 border-white/12 bg-[#061E72] text-white shadow-2xl shadow-blue-950/45 sm:relative sm:inset-auto sm:mx-auto sm:h-[85dvh] sm:max-h-[85dvh] sm:w-full sm:max-w-[760px] sm:rounded-[1.35rem] sm:border"
      >
        <h2 id="quote-modal-title" className="sr-only">
          Request a quote
        </h2>
        <div className="quote-modal-action-bar">
          <div className="quote-modal-call-slot">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={`Emergency? ${business.callCta}`}
              className="quote-modal-call-pill quote-modal-emergency"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="quote-modal-emergency-label">Emergency? {business.callCta}</span>
            </a>
          </div>

          <button
            type="button"
            aria-label="Close quote form"
            ref={closeButtonRef}
            className="quote-modal-close"
            onClick={() => close()}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="quote-modal-frame-shell min-h-0 flex-1 overflow-hidden bg-white">
          <ServiceM8Frame
            src={business.bookingUrl}
            title="Evaready Electrical quote form"
            className="quote-modal-iframe h-full w-full bg-white"
            showFallback={false}
          />
        </div>
      </div>
    </div>
  );
}
