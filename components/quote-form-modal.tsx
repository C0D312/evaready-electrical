"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ServiceM8Frame } from "@/components/service-m8-frame";
import { business } from "@/data/site";

export function QuoteFormModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

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

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", closeOnEscape);
      if (openerRef.current?.isConnected) {
        openerRef.current.focus();
      }
    };
  }, [close, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 p-0 backdrop-blur-sm sm:grid sm:place-items-center sm:p-4"
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

      <div className="quote-modal-panel relative mx-auto flex w-full flex-col overflow-hidden bg-slate-950 pb-[env(safe-area-inset-bottom)] text-white shadow-2xl sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 sm:pb-0">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 bg-slate-950 px-4 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:px-5 sm:pt-5">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-cyan-200 sm:text-[0.68rem] sm:tracking-[0.24em]">
              Job details
            </p>
            <h2
              id="quote-form-modal-title"
              className="mt-1 text-base font-black leading-tight min-[380px]:text-lg sm:text-2xl"
            >
              Request a Booking or Quote
            </h2>
            <p className="mt-1 text-[0.78rem] font-semibold leading-5 text-slate-300 sm:text-sm">
              Add details and photos. Urgent fault?{" "}
              <a
                href={business.phoneHref}
                className="font-black text-white underline underline-offset-2"
              >
                Call {business.phoneDisplay}
              </a>{" "}
              first.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close quote form"
            ref={closeButtonRef}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden bg-white">
          <ServiceM8Frame
            src={business.bookingUrl}
            title="Evaready Electrical quote form"
            className="h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
