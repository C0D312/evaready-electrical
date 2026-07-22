"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";

type ServiceM8FrameProps = {
  className: string;
  showFallback?: boolean;
  src: string;
  title: string;
};

export function ServiceM8Frame({
  className,
  showFallback = true,
  src,
  title,
}: ServiceM8FrameProps) {
  const [frameKey, setFrameKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const readyRef = useRef(false);
  const navigationsAfterReadyRef = useRef(0);
  const readyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (readyTimerRef.current) {
      clearTimeout(readyTimerRef.current);
      readyTimerRef.current = null;
    }

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const resetFrame = useCallback(() => {
    clearTimers();
    readyRef.current = false;
    navigationsAfterReadyRef.current = 0;
    setLoading(true);
    setLoadError(false);
    setFrameKey((key) => key + 1);
  }, [clearTimers]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    setLoadError(false);

    if (!readyRef.current) {
      if (readyTimerRef.current) {
        clearTimeout(readyTimerRef.current);
      }

      readyTimerRef.current = setTimeout(() => {
        readyRef.current = true;
        navigationsAfterReadyRef.current = 0;
        readyTimerRef.current = null;
      }, 1200);
      return;
    }

    navigationsAfterReadyRef.current += 1;

    if (navigationsAfterReadyRef.current >= 2) {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = setTimeout(() => {
        resetFrame();
      }, 500);
    }
  }, [resetFrame]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-white">
      <div className="relative min-h-0 flex-1">
        {loading ? (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-white px-5 text-center text-sm font-bold text-slate-700"
            role="status"
            aria-live="polite"
          >
            <LoaderCircle className="h-5 w-5 animate-spin text-blue-700" aria-hidden="true" />
            Loading the secure quote form...
          </div>
        ) : null}
        <iframe
          key={frameKey}
          src={src}
          title={title}
          className={`${className} block border-0`}
          loading="lazy"
          referrerPolicy="origin"
          onLoad={handleLoad}
          onError={() => {
            setLoading(false);
            setLoadError(true);
          }}
        />
      </div>
      {showFallback ? (
        <div className="flex min-h-12 items-center justify-center border-t border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
          <span>{loadError ? "The embedded form could not load. " : "Form not displaying correctly? "}</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex min-h-10 items-center gap-1 font-bold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Open the secure form
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </div>
  );
}
