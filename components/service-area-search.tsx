"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { CoverageSearchItem } from "@/data/service-area-coverage";
import { business, getEmergencyResponseForRegion } from "@/data/site";

type SearchItem = Pick<
  CoverageSearchItem,
  "areaName" | "href" | "postcode" | "regionName" | "suburbName"
>;

type SearchIndexRecord = {
  a: string;
  h: string;
  p: string;
  r: string;
  s: string;
};

type ServiceAreaSearchProps = {
  indexUrl?: string;
  items?: SearchItem[];
};

function isSearchIndexRecord(value: unknown): value is SearchIndexRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Partial<SearchIndexRecord>;
  return [record.a, record.h, record.p, record.r, record.s].every(
    (field) => typeof field === "string",
  );
}

export function ServiceAreaSearch({
  indexUrl,
  items = [],
}: ServiceAreaSearchProps) {
  const [query, setQuery] = useState("");
  const [searchItems, setSearchItems] = useState<SearchItem[]>(items);
  const [indexStatus, setIndexStatus] = useState<
    "idle" | "loading" | "ready" | "failed"
  >(items.length > 0 ? "ready" : "idle");
  const indexStatusRef = useRef(indexStatus);
  const indexRequest = useRef<Promise<void> | null>(null);
  const initializedFromUrl = useRef(false);

  const updateIndexStatus = useCallback(
    (status: "idle" | "loading" | "ready" | "failed") => {
      indexStatusRef.current = status;
      setIndexStatus(status);
    },
    [],
  );

  const loadIndex = useCallback(() => {
    if (
      items.length > 0 ||
      !indexUrl ||
      indexStatusRef.current === "ready"
    ) {
      return Promise.resolve();
    }

    if (indexRequest.current) {
      return indexRequest.current;
    }

    updateIndexStatus("loading");
    const request = fetch(indexUrl, { credentials: "same-origin" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Search index returned ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (!Array.isArray(payload) || !payload.every(isSearchIndexRecord)) {
          throw new Error("Search index has an invalid format");
        }

        setSearchItems(
          payload.map((record) => ({
            areaName: record.a,
            href: record.h,
            postcode: record.p,
            regionName: record.r,
            suburbName: record.s,
          })),
        );
        updateIndexStatus("ready");
      })
      .catch(() => {
        updateIndexStatus("failed");
      })
      .finally(() => {
        indexRequest.current = null;
      });

    indexRequest.current = request;
    return request;
  }, [indexUrl, items.length, updateIndexStatus]);

  useEffect(() => {
    if (initializedFromUrl.current) {
      return;
    }

    initializedFromUrl.current = true;
    const initialQuery = new URLSearchParams(window.location.search).get("q") ?? "";
    if (!initialQuery) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setQuery(initialQuery);
      void loadIndex();
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [loadIndex]);

  const normalizedQuery = query.trim().toLowerCase();

  const matches = normalizedQuery
    ? searchItems
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
          onFocus={() => void loadIndex()}
          onChange={(event) => {
            const nextQuery = event.target.value;
            setQuery(nextQuery);
            if (nextQuery.trim()) {
              void loadIndex();
            }
          }}
          placeholder="Enter suburb or postcode"
          className="h-12 w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-slate-400"
        />
      </div>

      {normalizedQuery ? (
        <div
          className="mt-4 grid gap-2"
          aria-busy={indexStatus === "loading"}
          aria-live="polite"
        >
          {indexStatus === "loading" || indexStatus === "idle" ? (
            <div className="rounded-lg border border-cyan-300/25 bg-[#06142f] px-4 py-3 text-sm font-semibold text-slate-200">
              Loading suburb and postcode search...
            </div>
          ) : indexStatus === "failed" ? (
            <div className="rounded-lg border border-red-300/35 bg-red-950/45 px-4 py-3 text-sm font-semibold text-red-50">
              The suburb search could not load. Call{" "}
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
          ) : matches.length > 0 ? (
            matches.map((item) => {
              const response = getEmergencyResponseForRegion(item.regionName);
              const responseLabel = response.isCore
                ? `${response.minutes}-minute core emergency response`
                : `${response.shortDisplay} in selected outer regions`;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-service-area-search-result
                  className="group grid gap-3 rounded-lg border border-cyan-300/20 bg-[#06142f] px-4 py-3 text-left transition hover:border-cyan-200 hover:bg-[#0d2b5c] sm:grid-cols-[1fr_auto] sm:items-center"
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
                  <span className="inline-flex min-h-11 items-center gap-2 text-sm font-black text-cyan-200 sm:justify-end sm:text-right">
                    View local page
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
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
