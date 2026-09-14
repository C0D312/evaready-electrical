"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import {
  quoteFormOpenEventName,
  type QuoteFormOpenDetail,
} from "@/components/quote-form-events";
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

type BackgroundInertSnapshot = {
  ariaHidden: string | null;
  element: HTMLElement;
  inert: boolean;
};

const modalFocusableSelector =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function getModalFocusableControls(panel: HTMLElement | null) {
  if (!panel) {
    return [];
  }

  return Array.from(
    panel.querySelectorAll<HTMLElement>(modalFocusableSelector),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      !element.hasAttribute("data-quote-focus-guard"),
  );
}

export function QuoteFormModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const scrollLockRef = useRef<ScrollLockSnapshot | null>(null);
  const backgroundInertRef = useRef<BackgroundInertSnapshot[]>([]);
  const openRef = useRef(false);
  const modalHistoryPushedRef = useRef(false);
  const historyCloseFallbackRef = useRef<number | null>(null);
  const restorationGenerationRef = useRef(0);
  const restorationFrameRef = useRef<number | null>(null);
  const restorationCleanupRef = useRef<(() => void) | null>(null);
  const mountedRef = useRef(true);
  const openerUrlRef = useRef("");
  const boundaryGenerationRef = useRef(0);

  const cancelBoundaryTransfer = useCallback(() => {
    boundaryGenerationRef.current += 1;
  }, []);

  const cancelRestoration = useCallback(() => {
    restorationGenerationRef.current += 1;
    if (restorationFrameRef.current !== null) {
      window.cancelAnimationFrame(restorationFrameRef.current);
      restorationFrameRef.current = null;
    }
    restorationCleanupRef.current?.();
    restorationCleanupRef.current = null;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelBoundaryTransfer();
      cancelRestoration();
    };
  }, [cancelBoundaryTransfer, cancelRestoration]);

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

    cancelRestoration();
    const generation = restorationGenerationRef.current;
    const opener = openerRef.current;
    const url = openerUrlRef.current;
    const closingDialog = dialogRef.current;

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
    html.style.scrollBehavior = locked.htmlScrollBehavior;

    if (!mountedRef.current || !opener?.isConnected || window.location.href !== url) return;
    opener.focus({ preventScroll: true });

    const fragmentLandmark = window.location.hash === "#main-content"
      ? document.querySelector('main#main-content[tabindex="-1"]') : null;
    const isPlaceholder = (target: Node | null) => target === body || target === html ||
      !!closingDialog?.contains(target) || (!!fragmentLandmark && target === fragmentLandmark);
    function preserveIntentionalFocus(event: FocusEvent) {
      const target = event.target;
      if (target instanceof Node && target !== opener && !isPlaceholder(target)) {
        cancelRestoration();
      }
    }
    function cancelAfterNavigation() {
      if (window.location.href !== url) cancelRestoration();
    }
    document.addEventListener("focusin", preserveIntentionalFocus, true);
    document.addEventListener("pointerdown", cancelRestoration, true);
    document.addEventListener("keydown", cancelRestoration, true);
    window.addEventListener("hashchange", cancelAfterNavigation);
    window.addEventListener("pagehide", cancelRestoration);
    restorationCleanupRef.current = () => {
      document.removeEventListener("focusin", preserveIntentionalFocus, true);
      document.removeEventListener("pointerdown", cancelRestoration, true);
      document.removeEventListener("keydown", cancelRestoration, true);
      window.removeEventListener("hashchange", cancelAfterNavigation);
      window.removeEventListener("pagehide", cancelRestoration);
    };
    // Native fragment history can clear the synchronous focus after popstate.
    restorationFrameRef.current = window.requestAnimationFrame(() => {
      if (generation !== restorationGenerationRef.current) return;
      restorationFrameRef.current = null;
      cancelRestoration();
      const active = document.activeElement;
      if (!mountedRef.current || openRef.current || scrollLockRef.current ||
          window.location.href !== url || !opener.isConnected || !opener.getClientRects().length ||
          opener.matches(":disabled") || opener.closest('[inert], [aria-hidden="true"]') || body.style.position === "fixed" ||
          body.classList.contains("mobile-menu-open") || body.classList.contains("quote-modal-open") ||
          (active !== opener && !isPlaceholder(active))) return;
      window.scrollTo({ left: locked.scrollX, top: locked.scrollY, behavior: "instant" });
      if (active !== opener) opener.focus({ preventScroll: true });
    });
  }, [cancelRestoration]);

  const releaseBackgroundInert = useCallback(() => {
    const snapshots = backgroundInertRef.current;
    backgroundInertRef.current = [];

    for (const snapshot of snapshots) {
      snapshot.element.inert = snapshot.inert;
      if (snapshot.ariaHidden === null) {
        snapshot.element.removeAttribute("aria-hidden");
      } else {
        snapshot.element.setAttribute("aria-hidden", snapshot.ariaHidden);
      }
    }
  }, []);

  const applyBackgroundInert = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    releaseBackgroundInert();
    backgroundInertRef.current = Array.from(document.body.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement &&
          element !== dialog &&
          !["SCRIPT", "STYLE"].includes(element.tagName),
      )
      .map((element) => {
        const snapshot = {
          ariaHidden: element.getAttribute("aria-hidden"),
          element,
          inert: element.inert,
        };
        element.inert = true;
        element.setAttribute("aria-hidden", "true");
        return snapshot;
      });
  }, [releaseBackgroundInert]);

  const focusFirstModalControl = useCallback(() => {
    getModalFocusableControls(panelRef.current).at(0)?.focus({
      preventScroll: true,
    });
  }, []);

  const focusBoundaryControl = useCallback((target: HTMLElement | undefined) => {
    if (!target) return;
    cancelBoundaryTransfer();
    const generation = boundaryGenerationRef.current;
    const source = document.activeElement;
    const dialog = dialogRef.current;
    const url = window.location.href;
    const historyLength = window.history.length;
    target.focus({ preventScroll: true });
    if (!(target instanceof HTMLIFrameElement) || document.activeElement === target) return;

    // Firefox can ignore iframe focus during native reverse-Tab dispatch.
    queueMicrotask(() => {
      const active = document.activeElement;
      if (generation !== boundaryGenerationRef.current || !mountedRef.current || !openRef.current ||
          !dialog?.isConnected || dialogRef.current !== dialog || !target.isConnected || !dialog.contains(target) ||
          !target.getClientRects().length || target.closest('[inert], [aria-hidden="true"]') ||
          window.location.href !== url || window.history.length !== historyLength || window.history.state?.quoteModal !== true ||
          !document.body.classList.contains("quote-modal-open") || document.body.classList.contains("mobile-menu-open") ||
          (active !== source && active !== document.body && active !== document.documentElement)) return;
      target.focus({ preventScroll: true });
    });
  }, [cancelBoundaryTransfer]);

  const focusLastModalControl = useCallback(() => {
    focusBoundaryControl(getModalFocusableControls(panelRef.current).at(-1));
  }, [focusBoundaryControl]);

  const finishClose = useCallback(() => {
    cancelBoundaryTransfer();
    if (historyCloseFallbackRef.current !== null) {
      window.clearTimeout(historyCloseFallbackRef.current);
      historyCloseFallbackRef.current = null;
    }

    openRef.current = false;
    modalHistoryPushedRef.current = false;
    releaseBackgroundInert();
    setOpen(false);
    releaseScrollLock();
  }, [cancelBoundaryTransfer, releaseBackgroundInert, releaseScrollLock]);

  const close = useCallback((syncHistory = true) => {
    cancelBoundaryTransfer();
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
  }, [cancelBoundaryTransfer, finishClose, removeQuoteModalHistoryMarker]);

  const openModal = useCallback((
    opener: HTMLElement,
    historyEntryPrepared = false,
  ) => {
    if (openRef.current) {
      return;
    }

    cancelBoundaryTransfer();
    cancelRestoration();
    openerUrlRef.current = window.location.href;

    const currentState =
      window.history.state && typeof window.history.state === "object"
        ? window.history.state
        : {};

    if (historyEntryPrepared) {
      const nextState = { ...currentState, quoteModal: true };
      delete nextState.mobileMenu;
      window.history.replaceState(nextState, "", window.location.href);
      modalHistoryPushedRef.current = true;
    } else if (window.history.state?.quoteModal !== true) {
      window.history.pushState(
        { ...currentState, quoteModal: true },
        "",
        window.location.href,
      );
      modalHistoryPushedRef.current = true;
    } else {
      modalHistoryPushedRef.current = true;
    }

    openerRef.current = opener;
    openRef.current = true;
    setOpen(true);
  }, [cancelBoundaryTransfer, cancelRestoration]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
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

      if (link.closest("#mobile-site-menu")) {
        return;
      }

      event.preventDefault();
      openModal(link);
    }

    function handleOpenRequest(event: Event) {
      const { detail } = event as CustomEvent<QuoteFormOpenDetail>;

      if (!detail?.opener) {
        return;
      }

      openModal(detail.opener, detail.historyEntryPrepared === true);
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener(quoteFormOpenEventName, handleOpenRequest);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener(quoteFormOpenEventName, handleOpenRequest);
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
    applyBackgroundInert();
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

    function keepFocusInside(event: FocusEvent) {
      const dialog = dialogRef.current;
      const target = event.target;

      if (
        dialog &&
        target instanceof Node &&
        !dialog.contains(target) &&
        openRef.current
      ) {
        focusFirstModalControl();
      }
    }

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

      const focusable = getModalFocusableControls(panel);
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        focusBoundaryControl(last);
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("focusin", keepFocusInside, true);
    document.addEventListener("focusin", cancelBoundaryTransfer, true);
    document.addEventListener("focusout", cancelBoundaryTransfer, true);
    document.addEventListener("keydown", cancelBoundaryTransfer, true);
    document.addEventListener("pointerdown", cancelBoundaryTransfer, true);
    window.addEventListener("hashchange", cancelBoundaryTransfer);
    window.addEventListener("popstate", cancelBoundaryTransfer);
    window.addEventListener("pagehide", cancelBoundaryTransfer);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("scroll", syncViewportHeight);

    return () => {
      cancelBoundaryTransfer();
      document.removeEventListener("focusin", keepFocusInside, true);
      document.removeEventListener("focusin", cancelBoundaryTransfer, true);
      document.removeEventListener("focusout", cancelBoundaryTransfer, true);
      document.removeEventListener("keydown", cancelBoundaryTransfer, true);
      document.removeEventListener("pointerdown", cancelBoundaryTransfer, true);
      window.removeEventListener("hashchange", cancelBoundaryTransfer);
      window.removeEventListener("popstate", cancelBoundaryTransfer);
      window.removeEventListener("pagehide", cancelBoundaryTransfer);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("scroll", syncViewportHeight);
      releaseBackgroundInert();
      releaseScrollLock();
    };
  }, [
    applyBackgroundInert,
    cancelBoundaryTransfer,
    close,
    focusBoundaryControl,
    focusFirstModalControl,
    open,
    releaseBackgroundInert,
    releaseScrollLock,
  ]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      data-quote-modal-root
      className="quote-modal-backdrop fixed inset-0 z-[100] grid h-[100dvh] w-[100vw] place-items-center overflow-hidden bg-[#061E72]/88 p-0 backdrop-blur-sm sm:w-auto sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 hidden sm:block"
        onClick={() => close()}
      />

      <div
        ref={panelRef}
        className="quote-modal-panel fixed inset-0 mx-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-[100vw] max-w-[100vw] flex-col overflow-hidden overflow-x-hidden rounded-none border-0 border-white/12 bg-[#061E72] text-white shadow-2xl shadow-blue-950/45 sm:relative sm:inset-auto sm:mx-auto sm:h-[85dvh] sm:max-h-[85dvh] sm:w-full sm:max-w-[760px] sm:rounded-[1.35rem] sm:border"
      >
        <span
          className="sr-only"
          data-quote-focus-guard="start"
          tabIndex={0}
          onFocus={focusLastModalControl}
        >
          Continue at the end of the quote dialog
        </span>
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
            loadStrategy="eager"
            showFallback={false}
          />
        </div>
        <span
          className="sr-only"
          data-quote-focus-guard="end"
          tabIndex={0}
          onFocus={focusFirstModalControl}
        >
          Continue at the start of the quote dialog
        </span>
      </div>
    </div>
  );
}
