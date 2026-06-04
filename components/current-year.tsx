"use client";

import { useEffect, useState } from "react";

export function CurrentYear({ fallbackYear }: { fallbackYear?: number }) {
  const [year, setYear] = useState<number | null>(fallbackYear ?? null);

  useEffect(() => {
    const refreshYear = () => setYear(new Date().getFullYear());
    const hydrationTimer = window.setTimeout(refreshYear, 0);
    const yearlySafetyTimer = window.setInterval(refreshYear, 60 * 60 * 1000);

    return () => {
      window.clearTimeout(hydrationTimer);
      window.clearInterval(yearlySafetyTimer);
    };
  }, []);

  return <span suppressHydrationWarning>{year ?? ""}</span>;
}
