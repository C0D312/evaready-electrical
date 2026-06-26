"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { CoverageSearchItem } from "@/data/service-area-coverage";
import { business, getEmergencyResponseForRegion } from "@/data/site";

type ServiceAreaSearchProps = {
  items: CoverageSearchItem[];
};

export function ServiceAreaSearch({ items }: ServiceAreaSearchProps) {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("q") ?? "";
  });

  const normalizedQuery = query.trim().toLowerCase();

  const matches = normalizedQuery
    ? items
        .filter((item) => {
          const searchable = [
            item.suburbName,
            item.postcode,
            item.areaName,
            item.regionName,
          ]
            .join(" ")
            .toLowerCase();

          return searchable.includes(normalizedQuery);
        })
        .slice(0, 12)
    : [];

  return (
    <div className="service-area-search rounded-lg border border-cyan-300/25 bg-[#091d42] p-4 shadow-xl shadow-blue-950/30 sm:p-5">
      <label
        htmlFor="service-area-search"
        className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200"
      >
        Suburb / Postcode
      </label>

      <div className="mt-3 flex min-h-12 items-center gap-3 rounded-lg border border-cyan-300/25 bg-[#06142f] px-4 focus-within:border-cyan-200 focus-within:bg-[#0d2b5c]">
        <Search className="h-5 w-5 shrink-0 text-cyan-200" />
        <input
          id="service-area-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter suburb or postcode"
          className="h-12 w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-slate-400"
        />
      </div>

      {normalizedQuery ? (
        <div className="mt-4 grid gap-2">
          {matches.length > 0 ? (
            matches.map((item) => {
              const response = getEmergencyResponseForRegion(item.regionName);
              const responseLabel = response.isCore
                ? `${response.minutes}-minute core emergency response`
                : `${response.minutes}-minute greater-region emergency response`;

              return (
                <Link
                  key={`${item.regionSlug}-${item.areaSlug}-${item.suburbSlug}`}
                  href={item.href}
                  className="grid gap-3 rounded-lg border border-cyan-300/20 bg-[#06142f] px-4 py-3 text-left transition hover:border-cyan-200 hover:bg-[#0d2b5c] sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span className="min-w-0">
                    <span className="block font-black text-white">
                      {item.suburbName} {item.postcode}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-slate-300">
                      {item.areaName} - {item.regionName}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-200">
                      <span className="rounded-full border border-cyan-300/20 bg-[#0d2b5c] px-2.5 py-1">
                        Suburb: {item.suburbName}
                      </span>
                      <span className="rounded-full border border-cyan-300/20 bg-[#0d2b5c] px-2.5 py-1">
                        Postcode: {item.postcode}
                      </span>
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-cyan-100">
                        {responseLabel}
                      </span>
                    </span>
                  </span>
                  <span className="text-sm font-black text-cyan-200 sm:text-right">
                    View local page
                  </span>
                </Link>
              );
            })
          ) : (
            <div className="rounded-lg border border-red-300/35 bg-red-950/45 px-4 py-3 text-sm font-semibold text-red-50">
              No matching suburb found. Call{" "}
              <a
                href={business.phoneHref}
                data-conversion-action="phone-click"
                aria-label={business.callCta}
                className="font-black underline underline-offset-2"
              >
                {business.phoneDisplay}
              </a>{" "}
              and we can confirm availability.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
