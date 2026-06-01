"use client";

import { useEffect, useState } from "react";

export function CurrentYear({ fallbackYear = 2026 }: { fallbackYear?: number }) {
  const [year, setYear] = useState(fallbackYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}
