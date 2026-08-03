"use client";

import dynamic from "next/dynamic";

export const DeferredServiceAreaSearch = dynamic(
  () =>
    import("@/components/service-area-search").then(
      (module) => module.ServiceAreaSearch,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="service-area-search service-area-search--navigation rounded-lg border border-cyan-300/25 bg-[#091d42] p-3 shadow-xl shadow-blue-950/30"
        role="status"
      >
        <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-200">
          Find suburb or postcode
        </p>
        <p className="mt-2 flex min-h-12 items-center rounded-lg border border-cyan-300/25 bg-[#06142f] px-4 text-sm font-semibold text-slate-300">
          Loading suburb search...
        </p>
      </div>
    ),
  },
);
