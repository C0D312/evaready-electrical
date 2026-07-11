"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import { ServiceM8Frame } from "@/components/service-m8-frame";
import { business } from "@/data/site";

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
  const openerRef = useRef<HTMLElement | null>(null);
  const scrollLockRef = useRef<ScrollLockSnapshot | null>(null);
  const openRef = useRef(false);
  const modalHistoryPushedRef = useRef(false);
  const resolvingHistoryCloseRef = useRef(false);

  const close = useCallback((syncHistory = true) => {
    if (!openRef.current) {
      return;
    }

    const shouldStepBack =
      syncHistory &&
      modalHistoryPushedRef.current &&
      typeof window !== "undefined" &&
      window.history.state?.quoteModal === true;

    openRef.current = false;
    modalHistoryPushedRef.current = false;
    setOpen(false);

    if (shouldStepBack) {
      resolvingHistoryCloseRef.current = true;
      window.history.back();
      window.setTimeout(() => {
        resolvingHistoryCloseRef.current = false;
      }, 500);
    }
  }, []);

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
      openModal(link);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [openModal]);

  useEffect(() => {
    if (!open) {
      return;
    }

    openRef.current = true;

    function closeOnPopState() {
      if (resolvingHistoryCloseRef.current) {
        resolvingHistoryCloseRef.current = false;
        return;
      }

      if (!openRef.current) {
        return;
      }

      modalHistoryPushedRef.current = false;
      openRef.current = false;
      setOpen(false);
    }

    window.addEventListener("popstate", closeOnPopState);

    return () => {
      window.removeEventListener("popstate", closeOnPopState);
    };
  }, [open]);

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
      const locked = scrollLockRef.current;
      scrollLockRef.current = null;

      if (!locked) {
        return;
      }

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
    };
  }, [close, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="quote-modal-backdrop fixed inset-0 z-[100] grid h-[100dvh] w-[100vw] place-items-center overflow-hidden bg-[#061E72]/88 p-0 backdrop-blur-sm sm:w-auto sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote"
    >
      <button
        type="button"
        aria-label="Close booking form"
        className="absolute inset-0 hidden sm:block"
        onClick={() => close()}
      />

      <div className="quote-modal-panel fixed inset-0 mx-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-[100vw] max-w-[100vw] flex-col overflow-hidden overflow-x-hidden rounded-none border-0 border-white/12 bg-[#061E72] text-white shadow-2xl shadow-blue-950/45 sm:relative sm:inset-auto sm:mx-auto sm:h-[85dvh] sm:max-h-[85dvh] sm:w-full sm:max-w-[760px] sm:rounded-[1.35rem] sm:border">
        <div className="quote-modal-action-bar">
          <div className="quote-modal-call-slot">
            <a
              href={business.phoneHref}
              data-conversion-action="phone-click"
              aria-label={business.callCta}
              className="quote-modal-call-pill quote-modal-emergency"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="quote-modal-emergency-label">
                <span>Emergency?</span>
                <span>{business.callCta}</span>
              </span>
            </a>
          </div>

          <button
            type="button"
            aria-label="Close booking form"
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
            title="Evaready Electrical booking form"
            className="quote-modal-iframe h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
