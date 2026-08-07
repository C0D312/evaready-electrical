import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import type {
  ApprovedLocationEvidenceRecord,
  LocationEvidenceServiceType,
} from "@/data/location-evidence";

const serviceLabels: Record<LocationEvidenceServiceType, string> = {
  "air-conditioning-electrical": "Air-conditioning electrical",
  "commercial-electrical": "Commercial electrical",
  "consumer-mains": "Consumer mains",
  "cctv-and-security": "CCTV and security",
  "data-cabling": "Data cabling",
  "defect-notice-repair": "Defect notice repair",
  "emergency-fault": "Emergency fault",
  "electrical-safety-inspection": "Electrical safety inspection",
  "fault-finding": "Fault finding",
  "hot-water-electrical": "Hot water electrical",
  "lighting-and-power": "Lighting and power",
  metering: "Metering",
  "overhead-service-line": "Overhead service line",
  "point-of-attachment": "Point of attachment",
  "private-power-pole": "Private power pole",
  "property-management-electrical": "Property management electrical",
  "smoke-alarm": "Smoke alarm",
  "strata-electrical": "Strata electrical",
  "switchboard-upgrade": "Switchboard upgrade",
  "underground-service-main": "Underground service main",
};

function formatCompletedMonth(completedMonth: string) {
  const [year, month] = completedMonth.split("-").map(Number);
  return new Intl.DateTimeFormat("en-AU", {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function LocationEvidenceSection({
  evidence,
}: {
  evidence: ApprovedLocationEvidenceRecord;
}) {
  return (
    <section
      className="py-14 text-white sm:py-16"
      data-location-evidence="approved"
      data-location-section="verified-evidence"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ev-storm-panel grid gap-7 rounded-lg border border-cyan-300/25 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Verified local work
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              {evidence.realCompletedJobType} in {evidence.suburb}.
            </h2>
            <p className="mt-3 text-sm font-bold text-cyan-100">
              Completed {formatCompletedMonth(evidence.completedMonth)}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {evidence.verifiedJobDescription}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {evidence.servicesActuallyCompleted.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-100"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span>{serviceLabels[service]}</span>
                </li>
              ))}
            </ul>

            {evidence.review ? (
              <figure
                className="mt-7 rounded-lg border border-cyan-300/20 bg-[#06152c]/80 p-5"
                data-location-evidence-review="verified"
              >
                <blockquote className="leading-7 text-slate-100">
                  &ldquo;{evidence.review.excerpt}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm font-bold text-cyan-100">
                  Verified source: {evidence.review.sourceLabel}
                </figcaption>
                <a
                  href={evidence.review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 font-black text-cyan-200 hover:text-white"
                >
                  View source
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </figure>
            ) : null}
          </div>

          {evidence.photograph ? (
            <figure
              className="overflow-hidden rounded-lg border border-cyan-300/20 bg-[#020817]"
              data-location-evidence-photo="approved"
            >
              <Image
                src={evidence.photograph.src}
                alt={evidence.photograph.alt}
                width={evidence.photograph.width}
                height={evidence.photograph.height}
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="h-auto w-full object-contain"
              />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
