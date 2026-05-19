"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { ServiceM8Frame } from "@/components/service-m8-frame";
import { business } from "@/data/site";

export function QuoteFormModal() {
  const [open, setOpen] = useState(false);

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

      if (link.href !== business.bookingUrl) {
        return;
      }

      event.preventDefault();
      setOpen(true);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [close, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/75 p-0 backdrop-blur-sm sm:p-4"
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

      <div className="relative mx-auto flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-slate-950 pb-[env(safe-area-inset-bottom)] text-white shadow-2xl sm:h-[min(920px,calc(100dvh-2rem))] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 sm:pb-0">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 bg-slate-950 px-4 pb-3 pt-[calc(0.9rem+env(safe-area-inset-top))] sm:px-5 sm:pt-5">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-cyan-200">
              Job details
            </p>
            <h2
              id="quote-form-modal-title"
              className="mt-1 text-lg font-black leading-tight sm:text-2xl"
            >
              Request a Booking or Quote
            </h2>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-300 sm:text-sm">
              Add your details and photos. For urgent faults, call{" "}
              <a
                href={business.phoneHref}
                className="font-black text-white underline underline-offset-2"
              >
                {business.phoneDisplay}
              </a>{" "}
              first.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close quote form"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 bg-white">
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
