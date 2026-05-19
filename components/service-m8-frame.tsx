"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ServiceM8FrameProps = {
  className: string;
  src: string;
  title: string;
};

export function ServiceM8Frame({ className, src, title }: ServiceM8FrameProps) {
  const [frameKey, setFrameKey] = useState(0);
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
    setFrameKey((key) => key + 1);
  }, [clearTimers]);

  const handleLoad = useCallback(() => {
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
    <div className="h-full min-h-0 w-full">
      <iframe
        key={frameKey}
        src={src}
        title={title}
        className={`${className} block border-0`}
        loading="lazy"
        referrerPolicy="origin"
        onLoad={handleLoad}
      />
    </div>
  );
}
