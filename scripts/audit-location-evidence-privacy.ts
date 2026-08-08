import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { locationEvidenceRecords } from "../data/location-evidence";
import { business } from "../data/site";

const publicRoot = path.join(process.cwd(), "public");
const sourcePath = path.join(process.cwd(), "data", "location-evidence.ts");
const ownerReviewCsvPath = path.join(
  process.cwd(),
  "reports",
  "location-indexation-owner-review.csv",
);
const reportPath = path.join(
  process.cwd(),
  "reports",
  "location-evidence-privacy-audit.json",
);

const forbiddenKeyPatterns = [
  /^approvedBy$/i,
  /^evidenceReference$/i,
  /customer.*name/i,
  /employee.*name/i,
  /phone/i,
  /email/i,
  /street.*address/i,
  /job.*(number|reference|id)/i,
  /invoice/i,
  /meter.*(number|identifier|id)/i,
  /account.*(number|identifier|id)/i,
  /serviceM8/i,
  /(gate|access|security).*(code|instruction|detail)/i,
];

const textChecks: { label: string; pattern: RegExp }[] = [
  {
    label: "labelled customer or employee name",
    pattern: /\b(customer|employee|technician|approved\s+by)\s*(name)?\s*[:=-]/i,
  },
  {
    label: "street address",
    pattern:
      /\b\d{1,6}\s+[A-Za-z][A-Za-z .'-]{1,50}\s+(street|st|road|rd|avenue|ave|drive|dr|lane|ln|court|ct|place|pl|crescent|cr|parade|pde|highway|hwy)\b/i,
  },
  {
    label: "job, invoice, meter or account identifier",
    pattern:
      /\b(job|invoice|meter|account|service\s*m8)\s*(number|no\.?|reference|ref|id)?\s*[:#=-]\s*[A-Z0-9-]{3,}\b/i,
  },
  {
    label: "access or security instruction",
    pattern:
      /\b(gate|access|alarm|lockbox|key\s*safe|security)\s*(code|pin|instruction|detail)?\s*[:#=-]\s*\S+/i,
  },
];

const issues: string[] = [];
const approvedBusinessPhone = business.phoneDisplay.replace(/\D/g, "");
const approvedBusinessEmail = business.email.toLowerCase();

function visitKeys(value: unknown, keyPath: string[] = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => visitKeys(entry, [...keyPath, String(index)]));
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, nested] of Object.entries(value)) {
    const pathLabel = [...keyPath, key].join(".");
    if (forbiddenKeyPatterns.some((pattern) => pattern.test(key))) {
      issues.push(`Private-field key is not allowed: ${pathLabel}`);
    }
    visitKeys(nested, [...keyPath, key]);
  }
}

function visitTextValues(value: unknown, keyPath: string[] = []) {
  if (typeof value === "string") {
    inspectText(value, keyPath.join(".") || "locationEvidenceRecords");
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      visitTextValues(entry, [...keyPath, String(index)]),
    );
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, nested] of Object.entries(value)) {
    visitTextValues(nested, [...keyPath, key]);
  }
}

function inspectText(value: string, label: string) {
  const textWithoutApprovedBusinessDetails = value
    .replaceAll(business.phoneDisplay, "")
    .replaceAll(business.email, "");

  const emailMatches =
    value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) ?? [];
  for (const email of emailMatches) {
    if (email.toLowerCase() !== approvedBusinessEmail) {
      issues.push(`${label} contains a possible personal email address`);
    }
  }

  for (const check of textChecks) {
    if (check.pattern.test(textWithoutApprovedBusinessDetails)) {
      issues.push(`${label} contains a possible ${check.label}`);
    }
  }

  const phoneMatches = value.match(
    /(?:\+?61|0)[\s().-]*\d(?:[\s().-]*\d){8,9}/g,
  ) ?? [];
  for (const phone of phoneMatches) {
    const digits = phone.replace(/\D/g, "");
    const localDigits = digits.startsWith("61")
      ? `0${digits.slice(2)}`
      : digits;
    if (localDigits !== approvedBusinessPhone) {
      issues.push(`${label} contains a possible personal phone number`);
    }
  }
}

function inspectMetadata(filePath: string, label: string) {
  const bytes = readFileSync(filePath);
  const ascii = bytes.toString("latin1");
  const metadataMarkers = [
    "Exif",
    "GPSLatitude",
    "GPSLongitude",
    "GPSPosition",
    "eXIf",
    "xmpmeta",
  ];
  for (const marker of metadataMarkers) {
    if (ascii.includes(marker)) {
      issues.push(`${label} contains possible EXIF/GPS metadata marker: ${marker}`);
    }
  }
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell);
  return cells;
}

if (existsSync(sourcePath)) {
  const source = readFileSync(sourcePath, "utf8");
  for (const legacyField of ["evidenceReference", "approvedBy"]) {
    if (new RegExp(`\\b${legacyField}\\b`).test(source)) {
      issues.push(`Legacy private field remains in the public evidence type: ${legacyField}`);
    }
  }
}

visitKeys(locationEvidenceRecords, ["locationEvidenceRecords"]);
visitTextValues(locationEvidenceRecords, ["locationEvidenceRecords"]);

const referencedAssets: string[] = [];
for (const record of locationEvidenceRecords) {
  if (!/^le_[a-f0-9]{16,64}$/i.test(record.publicEvidenceId)) {
    issues.push(
      `${record.suburbSlug} publicEvidenceId must be an opaque le_ identifier with 16-64 hexadecimal characters`,
    );
  }

  if (record.review) {
    if (!record.review.publicUseApproved) {
      issues.push(`${record.suburbSlug} review lacks public-use approval`);
    }
  }

  if (!record.photograph) continue;
  const photo = record.photograph;
  const filename = path.posix.basename(photo.src);
  const safeFilename = /^le-[a-f0-9]{16,64}(?:-\d{2})?\.(avif|webp|jpe?g|png)$/i;
  if (!safeFilename.test(filename)) {
    issues.push(
      `${record.suburbSlug} photograph filename is not a safe opaque filename: ${filename}`,
    );
  }

  const requiredConfirmations = [
    ["safe filename", photo.safeFilenameConfirmed],
    ["EXIF/GPS removal", photo.exifAndGpsRemoved],
    ["rights and consent", photo.rightsAndConsentConfirmed],
    ["customer/property privacy review", photo.customerAndPropertyPrivacyReviewConfirmed],
    ["identifiable people review", photo.identifiablePeopleReviewConfirmed],
    ["number-plate review", photo.numberPlateReviewConfirmed],
    ["address/document review", photo.addressAndDocumentReviewConfirmed],
    ["public-use approval", photo.publicUseApproved],
  ] as const;
  for (const [confirmation, value] of requiredConfirmations) {
    if (!value) {
      issues.push(`${record.suburbSlug} photograph lacks ${confirmation}`);
    }
  }

  const filePath = path.join(publicRoot, photo.src.replace(/^\//, ""));
  referencedAssets.push(filePath);
  if (!existsSync(filePath)) {
    issues.push(`${record.suburbSlug} photograph is missing: ${photo.src}`);
  } else {
    inspectMetadata(filePath, `${record.suburbSlug} photograph`);
  }
}

let ownerReviewRowsAudited = 0;
if (existsSync(ownerReviewCsvPath)) {
  const lines = readFileSync(ownerReviewCsvPath, "utf8")
    .trimEnd()
    .split(/\r?\n/);
  const headers = parseCsvLine(lines[0] ?? "");
  const ownerControlledHeaders = new Set([
    "serviceability_confirmed",
    "completed_job_count",
    "approved_job_evidence",
    "approved_photograph_count",
    "verified_testimonial_count",
    "search_console_impressions",
    "search_console_clicks",
    "search_query_relevance",
    "google_ads_qualified_conversions",
    "servicem8_enquiries",
    "servicem8_completed_jobs",
    "commercial_revenue_priority",
    "backlinks_or_legitimate_referrals",
    "response_capability",
    "owner_decision",
    "owner_decision_date",
    "sanitised_notes",
  ]);
  const ownerControlledIndexes = headers
    .map((header, index) => (ownerControlledHeaders.has(header) ? index : -1))
    .filter((index) => index >= 0);

  if (ownerControlledIndexes.length !== ownerControlledHeaders.size) {
    issues.push("Owner-review CSV is missing one or more owner-controlled columns");
  }

  for (const [rowIndex, line] of lines.slice(1).entries()) {
    const cells = parseCsvLine(line);
    ownerReviewRowsAudited += 1;
    for (const columnIndex of ownerControlledIndexes) {
      if (cells[columnIndex]?.trim()) {
        issues.push(
          `Owner-review CSV row ${rowIndex + 2} pre-populates owner-controlled column ${headers[columnIndex]}`,
        );
      }
    }
    inspectText(line, `Owner-review CSV row ${rowIndex + 2}`);
  }

  if (ownerReviewRowsAudited !== 873) {
    issues.push(
      `Owner-review CSV must contain 873 routes; found ${ownerReviewRowsAudited}`,
    );
  }
}

const report = {
  audit: "location-evidence-public-repository-privacy",
  approvedEvidenceRecords: locationEvidenceRecords.length,
  approvedGlobalBusinessDetailsExcludedFromPiiFindings: true,
  generatedAt: new Date().toISOString(),
  issues,
  referencedEvidenceAssets: referencedAssets.length,
  result: issues.length ? "FAIL" : "PASS",
  scope: [
    "data/location-evidence.ts records",
    "only assets referenced by approved location-evidence records",
    "blank location indexation owner-review CSV",
  ],
  ownerReviewRowsAudited,
};

mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Location evidence privacy audit");
console.log(`Approved records: ${locationEvidenceRecords.length}`);
console.log(`Referenced evidence assets: ${referencedAssets.length}`);
console.log(`Issues: ${issues.length}`);
console.log(`Report: ${reportPath}`);

if (issues.length) {
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log(
    "PASS: no private evidence fields, PII patterns or unsafe referenced evidence assets were found.",
  );
}
