"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { CoverageSearchItem } from "@/data/service-area-coverage";

type ServiceAreaSearchProps = {
  items: CoverageSearchItem[];
};

export function ServiceAreaSearch({ items }: ServiceAreaSearchProps) {
  const [query, setQuery] = useState("");
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
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/5 sm:p-5">
      <label
        htmlFor="service-area-search"
        className="text-sm font-black uppercase tracking-[0.18em] text-blue-700"
      >
        Suburb / Postcode
      </label>

      <div className="mt-3 flex min-h-12 items-center gap-3 rounded-lg border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600 focus-within:bg-white">
        <Search className="h-5 w-5 shrink-0 text-slate-500" />
        <input
          id="service-area-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter suburb or postcode"
          className="h-12 w-full bg-transparent text-base font-semibold text-slate-950 outline-none placeholder:text-slate-500"
        />
      </div>

      {normalizedQuery ? (
        <div className="mt-4 grid gap-2">
          {matches.length > 0 ? (
            matches.map((item) => (
              <Link
                key={`${item.regionSlug}-${item.areaSlug}-${item.suburbSlug}`}
                href={item.href}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-600 hover:bg-blue-50"
              >
                <span>
                  <span className="block font-black text-slate-950">
                    {item.suburbName} {item.postcode}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-slate-600">
                    {item.areaName} - {item.regionName}
                  </span>
                </span>
                <span className="text-sm font-black text-blue-700">View</span>
              </Link>
            ))
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              No matching suburb found. Call 0461 247 247 and we can confirm
              availability.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
