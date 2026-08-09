import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
} from "node:fs";
import path from "node:path";
import sharp, { type Metadata } from "sharp";
import type { ApprovedLocationEvidenceRecord } from "../../data/location-evidence";

type PrivacyAuditOptions = {
  approvedBusinessEmail: string;
  approvedBusinessPhone: string;
  evidenceDirectory: string;
  expectedOwnerReviewRows?: number;
  ownerReviewCsvPath?: string;
  publicRoot: string;
  records: readonly ApprovedLocationEvidenceRecord[];
  sourceText?: string;
};

export type LocationEvidencePrivacyAuditResult = {
  approvedEvidenceRecords: number;
  datasetState: "empty" | "populated";
  evidenceDirectoryFiles: number;
  issues: string[];
  limitations: string[];
  metadataParser: { name: "sharp"; version: string };
  orphanEvidenceAssets: number;
  ownerReviewRowsAudited: number;
  referencedEvidenceAssets: number;
  result: "FAIL" | "PASS";
  scopeStatement: string;
};

const safeFilenamePattern =
  /^le-[a-f0-9]{16,64}(?:-\d{2})?\.(avif|webp|jpe?g|png)$/i;
const evidencePublicPrefix = "/images/location-evidence/";
const supportedExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

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

function normalizedPath(value: string) {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function isInsideDirectory(directory: string, candidate: string) {
  const relative = path.relative(path.resolve(directory), path.resolve(candidate));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
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

function inspectKeys(value: unknown, issues: string[], keyPath: string[] = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      inspectKeys(entry, issues, [...keyPath, String(index)]),
    );
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    const label = [...keyPath, key].join(".");
    if (forbiddenKeyPatterns.some((pattern) => pattern.test(key))) {
      issues.push(`Private-field key is not allowed: ${label}`);
    }
    inspectKeys(nested, issues, [...keyPath, key]);
  }
}

function inspectText(
  value: string,
  label: string,
  issues: string[],
  approvedBusinessPhone: string,
  approvedBusinessEmail: string,
) {
  const approvedPhoneDigits = approvedBusinessPhone.replace(/\D/g, "");
  const approvedEmail = approvedBusinessEmail.toLowerCase();
  const scrubbed = value
    .replaceAll(approvedBusinessPhone, "")
    .replaceAll(approvedBusinessEmail, "");
  const emails = value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) ?? [];
  for (const email of emails) {
    if (email.toLowerCase() !== approvedEmail) {
      issues.push(`${label} contains a possible personal email address`);
    }
  }
  for (const check of textChecks) {
    if (check.pattern.test(scrubbed)) {
      issues.push(`${label} contains a possible ${check.label}`);
    }
  }
  const phones =
    value.match(/(?:\+?61|0)[\s().-]*\d(?:[\s().-]*\d){8,9}/g) ?? [];
  for (const phone of phones) {
    const digits = phone.replace(/\D/g, "");
    const localDigits = digits.startsWith("61") ? `0${digits.slice(2)}` : digits;
    if (localDigits !== approvedPhoneDigits) {
      issues.push(`${label} contains a possible personal phone number`);
    }
  }
}

function inspectTextValues(
  value: unknown,
  issues: string[],
  approvedBusinessPhone: string,
  approvedBusinessEmail: string,
  keyPath: string[] = [],
) {
  if (typeof value === "string") {
    inspectText(
      value,
      keyPath.join(".") || "locationEvidenceRecords",
      issues,
      approvedBusinessPhone,
      approvedBusinessEmail,
    );
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      inspectTextValues(
        entry,
        issues,
        approvedBusinessPhone,
        approvedBusinessEmail,
        [...keyPath, String(index)],
      ),
    );
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    inspectTextValues(
      nested,
      issues,
      approvedBusinessPhone,
      approvedBusinessEmail,
      [...keyPath, key],
    );
  }
}

function enumerateEvidenceFiles(directory: string, issues: string[]) {
  const files: string[] = [];
  if (!existsSync(directory)) return files;
  const rootStat = lstatSync(directory);
  if (rootStat.isSymbolicLink()) {
    issues.push("Evidence directory must not be a symbolic link");
    return files;
  }
  const rootRealPath = realpathSync.native(directory);

  const visit = (current: string) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      const stat = lstatSync(entryPath);
      if (stat.isSymbolicLink()) {
        issues.push(`Evidence path must not be a symbolic link: ${entryPath}`);
        continue;
      }
      const realPath = realpathSync.native(entryPath);
      if (!isInsideDirectory(rootRealPath, realPath)) {
        issues.push(`Evidence path escapes the approved directory: ${entryPath}`);
        continue;
      }
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".") || /^(temp|tmp|backup|bak)$/i.test(entry.name)) {
          issues.push(`Unsafe evidence directory name: ${entry.name}`);
        }
        visit(entryPath);
      } else if (entry.isFile()) {
        files.push(realPath);
      } else {
        issues.push(`Unsupported evidence filesystem entry: ${entryPath}`);
      }
    }
  };
  visit(rootRealPath);
  return files;
}

function resolveReferencedAsset(
  src: string,
  evidenceDirectory: string,
  issues: string[],
  label: string,
) {
  if (
    !src.startsWith(evidencePublicPrefix) ||
    src.includes("\\") ||
    src.includes("\0") ||
    src.includes("?") ||
    src.includes("#")
  ) {
    issues.push(`${label} uses an invalid evidence asset path: ${src}`);
    return null;
  }
  const relative = src.slice(evidencePublicPrefix.length);
  if (!relative || relative.includes("/") || relative === "." || relative === "..") {
    issues.push(`${label} uses a traversal or nested evidence asset path: ${src}`);
    return null;
  }
  const candidate = path.resolve(evidenceDirectory, relative);
  if (!isInsideDirectory(evidenceDirectory, candidate)) {
    issues.push(`${label} evidence path escapes the approved directory: ${src}`);
    return null;
  }
  return candidate;
}

function expectedDecodedFormat(extension: string) {
  if (extension === ".jpg" || extension === ".jpeg") return "jpeg";
  if (extension === ".avif") return "heif";
  return extension.slice(1);
}

function expectedMediaType(extension: string) {
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".avif") return "image/avif";
  return `image/${extension.slice(1)}`;
}

async function inspectImageFile(
  filePath: string,
  declaredDimensions: { height: number; width: number } | undefined,
  issues: string[],
) {
  const filename = path.basename(filePath);
  const extension = path.extname(filename).toLowerCase();
  if (!safeFilenamePattern.test(filename)) {
    issues.push(`Evidence asset has an unsafe filename: ${filename}`);
  }
  if (!supportedExtensions.has(extension)) {
    issues.push(`Evidence asset uses an unsupported extension: ${filename}`);
  }

  let metadata: Metadata;
  try {
    metadata = await sharp(filePath, { failOn: "error" }).metadata();
  } catch (error) {
    issues.push(
      `Evidence asset cannot be decoded as a supported image: ${filename} (${error instanceof Error ? error.message : "unknown error"})`,
    );
    return;
  }

  const expectedFormat = expectedDecodedFormat(extension);
  const avifMatches =
    extension === ".avif" &&
    metadata.format === "heif" &&
    metadata.compression === "av1";
  if (!avifMatches && metadata.format !== expectedFormat) {
    issues.push(
      `Evidence asset extension/signature mismatch: ${filename} decodes as ${metadata.format}`,
    );
  }
  const expectedMime = expectedMediaType(extension);
  if (metadata.mediaType !== expectedMime) {
    issues.push(
      `Evidence asset MIME mismatch: ${filename} reports ${metadata.mediaType ?? "unknown"}; expected ${expectedMime}`,
    );
  }
  if (declaredDimensions) {
    if (
      metadata.width !== declaredDimensions.width ||
      metadata.height !== declaredDimensions.height
    ) {
      issues.push(
        `Evidence asset declared/actual dimension mismatch: ${filename} declares ${declaredDimensions.width}x${declaredDimensions.height}, decoded ${metadata.width}x${metadata.height}`,
      );
    }
  }
  if (metadata.exif) issues.push(`Evidence asset contains EXIF/GPS metadata: ${filename}`);
  if (metadata.xmp || metadata.xmpAsString) {
    issues.push(`Evidence asset contains XMP metadata: ${filename}`);
  }
  if (metadata.iptc) issues.push(`Evidence asset contains IPTC metadata: ${filename}`);
  if (metadata.tifftagPhotoshop) {
    issues.push(`Evidence asset contains Photoshop/IPTC metadata: ${filename}`);
  }
  if (metadata.comments?.length) {
    issues.push(`Evidence asset contains embedded comment/text metadata: ${filename}`);
  }
}

function auditOwnerCsv(
  csvPath: string | undefined,
  expectedRows: number,
  options: PrivacyAuditOptions,
  issues: string[],
) {
  if (!csvPath || !existsSync(csvPath)) {
    issues.push("Tracked owner-review CSV is missing");
    return 0;
  }
  const lines = readFileSync(csvPath, "utf8").trimEnd().split(/\r?\n/);
  const headers = parseCsvLine(lines[0] ?? "");
  const ownerIndexes = headers
    .map((header, index) => (ownerControlledHeaders.has(header) ? index : -1))
    .filter((index) => index >= 0);
  if (ownerIndexes.length !== ownerControlledHeaders.size) {
    issues.push("Owner-review CSV is missing one or more owner-controlled columns");
  }
  for (const [rowIndex, line] of lines.slice(1).entries()) {
    const cells = parseCsvLine(line);
    for (const columnIndex of ownerIndexes) {
      if (cells[columnIndex]?.trim()) {
        issues.push(
          `Owner-review CSV row ${rowIndex + 2} pre-populates owner-controlled column ${headers[columnIndex]}`,
        );
      }
    }
    inspectText(
      line,
      `Owner-review CSV row ${rowIndex + 2}`,
      issues,
      options.approvedBusinessPhone,
      options.approvedBusinessEmail,
    );
  }
  const rowCount = Math.max(0, lines.length - 1);
  if (rowCount !== expectedRows) {
    issues.push(`Owner-review CSV must contain ${expectedRows} routes; found ${rowCount}`);
  }
  return rowCount;
}

export async function auditLocationEvidencePrivacy(
  options: PrivacyAuditOptions,
): Promise<LocationEvidencePrivacyAuditResult> {
  const issues: string[] = [];
  if (!isInsideDirectory(options.publicRoot, options.evidenceDirectory)) {
    issues.push("Approved evidence directory is outside the public asset root");
  }
  if (options.sourceText) {
    for (const legacyField of ["evidenceReference", "approvedBy"]) {
      if (new RegExp(`\\b${legacyField}\\b`).test(options.sourceText)) {
        issues.push(`Legacy private field remains in the public evidence type: ${legacyField}`);
      }
    }
  }

  inspectKeys(options.records, issues, ["locationEvidenceRecords"]);
  inspectTextValues(
    options.records,
    issues,
    options.approvedBusinessPhone,
    options.approvedBusinessEmail,
    ["locationEvidenceRecords"],
  );

  const referencedAssets = new Map<
    string,
    { height: number; label: string; path: string; width: number }
  >();
  for (const record of options.records) {
    if (!/^le_[a-f0-9]{16,64}$/i.test(record.publicEvidenceId)) {
      issues.push(`${record.suburbSlug} publicEvidenceId is not a safe opaque identifier`);
    }
    if (record.review && !record.review.publicUseApproved) {
      issues.push(`${record.suburbSlug} review lacks public-use approval`);
    }
    if (!record.photograph) continue;

    const photo = record.photograph;
    const confirmations = [
      ["safe filename", photo.safeFilenameConfirmed],
      ["EXIF/GPS removal", photo.exifAndGpsRemoved],
      ["rights and consent", photo.rightsAndConsentConfirmed],
      ["customer/property privacy review", photo.customerAndPropertyPrivacyReviewConfirmed],
      ["identifiable people review", photo.identifiablePeopleReviewConfirmed],
      ["number-plate review", photo.numberPlateReviewConfirmed],
      ["address/document review", photo.addressAndDocumentReviewConfirmed],
      ["public-use approval", photo.publicUseApproved],
    ] as const;
    for (const [confirmation, value] of confirmations) {
      if (value !== true) {
        issues.push(`${record.suburbSlug} photograph lacks ${confirmation}`);
      }
    }

    const candidate = resolveReferencedAsset(
      photo.src,
      options.evidenceDirectory,
      issues,
      `${record.suburbSlug} photograph`,
    );
    if (!candidate) continue;
    const key = normalizedPath(candidate);
    if (referencedAssets.has(key)) {
      issues.push(`${record.suburbSlug} photograph duplicates another evidence asset`);
    }
    referencedAssets.set(key, {
      height: photo.height,
      label: record.suburbSlug,
      path: candidate,
      width: photo.width,
    });
  }

  const physicalAssets = enumerateEvidenceFiles(options.evidenceDirectory, issues);
  const physicalKeys = new Set(physicalAssets.map(normalizedPath));
  for (const reference of referencedAssets.values()) {
    if (!existsSync(reference.path)) {
      issues.push(`${reference.label} photograph is missing: ${reference.path}`);
      continue;
    }
    const stat = lstatSync(reference.path);
    if (stat.isSymbolicLink()) {
      issues.push(`${reference.label} photograph must not be a symbolic link`);
      continue;
    }
    const resolved = realpathSync.native(reference.path);
    if (!isInsideDirectory(options.evidenceDirectory, resolved)) {
      issues.push(`${reference.label} photograph resolves outside the evidence directory`);
    }
  }

  let orphanEvidenceAssets = 0;
  for (const filePath of physicalAssets) {
    const key = normalizedPath(filePath);
    const reference = referencedAssets.get(key);
    if (!reference) {
      orphanEvidenceAssets += 1;
      issues.push(`Orphan or unreferenced evidence asset: ${path.basename(filePath)}`);
    }
    await inspectImageFile(filePath, reference, issues);
  }
  for (const key of referencedAssets.keys()) {
    if (!physicalKeys.has(key)) {
      const reference = referencedAssets.get(key);
      if (reference && existsSync(reference.path)) {
        issues.push(`Referenced evidence asset was not enumerated safely: ${reference.path}`);
      }
    }
  }

  const ownerReviewRowsAudited = auditOwnerCsv(
    options.ownerReviewCsvPath,
    options.expectedOwnerReviewRows ?? 873,
    options,
    issues,
  );
  const datasetState =
    options.records.length === 0 && physicalAssets.length === 0 ? "empty" : "populated";
  const scopeStatement =
    datasetState === "empty"
      ? "No configured PII patterns or evidence assets exist in the current empty scoped dataset."
      : "The configured location-evidence records and every file in the approved evidence directory were scanned.";

  return {
    approvedEvidenceRecords: options.records.length,
    datasetState,
    evidenceDirectoryFiles: physicalAssets.length,
    issues,
    limitations: [
      "This scoped audit does not prove that the repository or Git history contains no PII.",
      "Automated checks do not perform OCR, facial recognition or complete contextual identification.",
      "Human review remains required for faces, number plates, addresses, documents, labels, properties and contextual identification.",
    ],
    metadataParser: { name: "sharp", version: sharp.versions.sharp },
    orphanEvidenceAssets,
    ownerReviewRowsAudited,
    referencedEvidenceAssets: referencedAssets.size,
    result: issues.length ? "FAIL" : "PASS",
    scopeStatement,
  };
}

export const locationEvidencePrivacyInternals = {
  expectedDecodedFormat,
  expectedMediaType,
  isInsideDirectory,
  parseCsvLine,
  resolveReferencedAsset,
  safeFilenamePattern,
};
