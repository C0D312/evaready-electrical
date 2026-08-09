import assert from "node:assert/strict";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import type { ApprovedLocationEvidenceRecord } from "../../data/location-evidence";
import { auditLocationEvidencePrivacy } from "../../scripts/lib/location-evidence-privacy-audit";

const ownerControlledHeaders = [
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
] as const;

type SyntheticPhoto = {
  addressAndDocumentReviewConfirmed: boolean;
  alt: string;
  customerAndPropertyPrivacyReviewConfirmed: boolean;
  exifAndGpsRemoved: boolean;
  height: number;
  identifiablePeopleReviewConfirmed: boolean;
  numberPlateReviewConfirmed: boolean;
  publicUseApproved: boolean;
  rightsAndConsentConfirmed: boolean;
  safeFilenameConfirmed: boolean;
  src: string;
  width: number;
};

function createFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "evaready-location-audit-"));
  const publicRoot = path.join(root, "public");
  const evidenceDirectory = path.join(
    publicRoot,
    "images",
    "location-evidence",
  );
  const ownerReviewCsvPath = path.join(root, "owner-review.csv");
  mkdirSync(publicRoot, { recursive: true });
  const headers = [
    "route",
    "suburb",
    "postcode",
    "area",
    "region",
    "current_index_status",
    "current_sitemap_status",
    ...ownerControlledHeaders,
  ];
  const row = [
    "/service-areas/synthetic/area/example/",
    "Example",
    "2000",
    "Synthetic Area",
    "Synthetic Region",
    "index_follow",
    "included",
    ...ownerControlledHeaders.map(() => ""),
  ];
  writeFileSync(
    ownerReviewCsvPath,
    `${headers.join(",")}\n${row.join(",")}\n`,
    "utf8",
  );
  return { evidenceDirectory, ownerReviewCsvPath, publicRoot, root };
}

function photo(
  src: string,
  overrides: Partial<SyntheticPhoto> = {},
): SyntheticPhoto {
  return {
    addressAndDocumentReviewConfirmed: true,
    alt: "Synthetic electrical audit fixture",
    customerAndPropertyPrivacyReviewConfirmed: true,
    exifAndGpsRemoved: true,
    height: 2,
    identifiablePeopleReviewConfirmed: true,
    numberPlateReviewConfirmed: true,
    publicUseApproved: true,
    rightsAndConsentConfirmed: true,
    safeFilenameConfirmed: true,
    src,
    width: 2,
    ...overrides,
  };
}

function record(
  overrides: Record<string, unknown> = {},
): ApprovedLocationEvidenceRecord {
  return {
    approval: {
      approvedOn: "2026-08-09",
      publicUseConfirmed: true,
      status: "approved",
    },
    areaSlug: "area",
    completedMonth: "2026-08",
    postcode: "2000",
    publicEvidenceId: "le_0123456789abcdef",
    realCompletedJobType: "Synthetic audit fixture",
    regionSlug: "synthetic",
    servicesActuallyCompleted: ["fault-finding"],
    suburb: "Example",
    suburbSlug: "example",
    verifiedJobDescription: "Synthetic fixture with no real customer data.",
    ...overrides,
  } as unknown as ApprovedLocationEvidenceRecord;
}

async function runFixture(
  fixture: ReturnType<typeof createFixture>,
  records: readonly ApprovedLocationEvidenceRecord[],
) {
  return auditLocationEvidencePrivacy({
    approvedBusinessEmail: "info@example.invalid",
    approvedBusinessPhone: "0461 247 247",
    evidenceDirectory: fixture.evidenceDirectory,
    expectedOwnerReviewRows: 1,
    ownerReviewCsvPath: fixture.ownerReviewCsvPath,
    publicRoot: fixture.publicRoot,
    records,
    sourceText: "export const locationEvidenceRecords = [];",
  });
}

test("empty scoped dataset is reported honestly", async (t) => {
  const fixture = createFixture();
  t.after(() => rmSync(fixture.root, { force: true, recursive: true }));
  const result = await runFixture(fixture, []);
  assert.equal(result.result, "PASS");
  assert.equal(result.datasetState, "empty");
  assert.equal(
    result.scopeStatement,
    "No configured PII patterns or evidence assets exist in the current empty scoped dataset.",
  );
  assert.ok(result.limitations.some((item) => item.includes("Git history")));
});

test("synthetic PII and private-reference patterns are rejected", async (t) => {
  const fixture = createFixture();
  t.after(() => rmSync(fixture.root, { force: true, recursive: true }));
  const result = await runFixture(fixture, [
    record({
      customerEmail: "synthetic.person@example.invalid",
      jobReference: "SYN-JOB-123",
      notes:
        "Synthetic customer email: synthetic.person@example.invalid; phone: 0400 111 222; address: 12 Example Street; job reference: SYN-123.",
    }),
  ]);
  assert.equal(result.result, "FAIL");
  assert.ok(result.issues.some((item) => item.includes("personal email")));
  assert.ok(result.issues.some((item) => item.includes("personal phone")));
  assert.ok(result.issues.some((item) => item.includes("street address")));
  assert.ok(result.issues.some((item) => item.includes("job, invoice")));
  assert.ok(result.issues.some((item) => item.includes("Private-field key")));
});

test("traversal paths and missing approval flags are rejected", async (t) => {
  const fixture = createFixture();
  t.after(() => rmSync(fixture.root, { force: true, recursive: true }));
  const result = await runFixture(fixture, [
    record({
      photograph: photo(
        "/images/location-evidence/../synthetic-outside.png",
        { rightsAndConsentConfirmed: false },
      ),
    }),
  ]);
  assert.equal(result.result, "FAIL");
  assert.ok(result.issues.some((item) => item.includes("traversal")));
  assert.ok(result.issues.some((item) => item.includes("rights and consent")));
});

test("orphan evidence images are rejected", async (t) => {
  const fixture = createFixture();
  t.after(() => rmSync(fixture.root, { force: true, recursive: true }));
  mkdirSync(fixture.evidenceDirectory, { recursive: true });
  await sharp({
    create: { background: "#001122", channels: 3, height: 2, width: 2 },
  })
    .png()
    .toFile(path.join(fixture.evidenceDirectory, "le-aaaaaaaaaaaaaaaa.png"));
  const result = await runFixture(fixture, []);
  assert.equal(result.result, "FAIL");
  assert.equal(result.orphanEvidenceAssets, 1);
  assert.ok(result.issues.some((item) => item.includes("Orphan or unreferenced")));
});

test("extension/signature and declared dimension mismatches are rejected", async (t) => {
  const fixture = createFixture();
  t.after(() => rmSync(fixture.root, { force: true, recursive: true }));
  mkdirSync(fixture.evidenceDirectory, { recursive: true });
  const filename = "le-bbbbbbbbbbbbbbbb.jpg";
  const png = await sharp({
    create: { background: "#112233", channels: 3, height: 2, width: 2 },
  })
    .png()
    .toBuffer();
  writeFileSync(path.join(fixture.evidenceDirectory, filename), png);
  const result = await runFixture(fixture, [
    record({
      photograph: photo(`/images/location-evidence/${filename}`, {
        width: 3,
      }),
    }),
  ]);
  assert.equal(result.result, "FAIL");
  assert.ok(result.issues.some((item) => item.includes("extension/signature")));
  assert.ok(result.issues.some((item) => item.includes("MIME mismatch")));
  assert.ok(result.issues.some((item) => item.includes("dimension mismatch")));
});

test("EXIF and XMP/GPS metadata are rejected by the decoder", async (t) => {
  const fixture = createFixture();
  t.after(() => rmSync(fixture.root, { force: true, recursive: true }));
  mkdirSync(fixture.evidenceDirectory, { recursive: true });
  const filename = "le-cccccccccccccccc.jpg";
  const xmp = [
    '<x:xmpmeta xmlns:x="adobe:ns:meta/">',
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description xmlns:exif="http://ns.adobe.com/exif/1.0/" exif:GPSLatitude="1,2,3" />',
    "</rdf:RDF>",
    "</x:xmpmeta>",
  ].join("");
  await sharp({
    create: { background: "#223344", channels: 3, height: 2, width: 2 },
  })
    .jpeg()
    .withExif({
      IFD0: { Artist: "Synthetic audit fixture" },
      IFD3: { GPSLatitude: "1/1 2/1 3/1", GPSLatitudeRef: "N" },
    })
    .withXmp(xmp)
    .toFile(path.join(fixture.evidenceDirectory, filename));
  const result = await runFixture(fixture, [
    record({ photograph: photo(`/images/location-evidence/${filename}`) }),
  ]);
  assert.equal(result.result, "FAIL");
  assert.ok(result.issues.some((item) => item.includes("EXIF/GPS")));
  assert.ok(result.issues.some((item) => item.includes("XMP metadata")));
});
