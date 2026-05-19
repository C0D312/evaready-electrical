"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClipboardList, Phone, X } from "lucide-react";
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

  const close = useCallback(() => {
    setOpen(false);
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
      openerRef.current = link;
      setOpen(true);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
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

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      const locked = scrollLockRef.current;
      scrollLockRef.current = null;

      if (!locked) {
        return;
      }

      html.style.overflow = locked.htmlOverflow;
      html.style.scrollBehavior = "auto";
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
      className="quote-modal-backdrop fixed inset-0 z-[100] grid place-items-center bg-slate-950/85 p-2 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-form-modal-title"
    >
      <button
        type="button"
        aria-label="Close quote form"
        className="absolute inset-0 hidden sm:block"
        onClick={close}
      />

      <div className="quote-modal-panel relative mx-auto flex w-full flex-col overflow-hidden rounded-[1.35rem] border border-white/12 bg-slate-950 text-white shadow-2xl shadow-slate-950/45">
        <div className="quote-modal-heading shrink-0 border-b border-white/10 px-4 py-2.5 sm:px-5 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-3">
              <span className="mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/35 bg-cyan-300/10 text-cyan-100 sm:inline-flex">
                <ClipboardList className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-cyan-200 sm:text-[0.68rem] sm:tracking-[0.24em]">
                  Job details
                </p>
                <h2
                  id="quote-form-modal-title"
                  className="mt-1 text-[1.08rem] font-black leading-tight min-[380px]:text-[1.16rem] sm:text-2xl"
                >
                  Request a Booking or Quote
                </h2>
                <p className="mt-1 max-w-2xl text-[0.72rem] font-semibold leading-4 text-slate-200 min-[380px]:text-[0.76rem] sm:text-sm sm:leading-5">
                  Add contact details, address and photos. We&apos;ll review the
                  job and get back to you with the next step.
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close quote form"
              ref={closeButtonRef}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/60"
              onClick={close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <a
            href={business.phoneHref}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-red-300/25 bg-red-500/12 px-3 py-2 text-center text-[0.72rem] font-black leading-tight text-white transition hover:bg-red-500/20 min-[390px]:justify-start sm:mt-3 sm:text-sm"
          >
            <Phone className="h-4 w-4 shrink-0 text-red-200" />
            <span>Urgent fault? Call {business.phoneDisplay} first.</span>
          </a>
        </div>

        <div className="quote-modal-frame-shell min-h-0 flex-1 overflow-hidden bg-white">
          <ServiceM8Frame
            src={business.bookingUrl}
            title="Evaready Electrical quote form"
            className="quote-modal-iframe h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
