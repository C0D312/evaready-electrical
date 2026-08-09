import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { locationEvidenceRecords } from "../data/location-evidence";
import { business } from "../data/site";
import { auditLocationEvidencePrivacy } from "./lib/location-evidence-privacy-audit";

const sourcePath = path.join(process.cwd(), "data", "location-evidence.ts");
const ownerReviewCsvPath = path.join(
  process.cwd(),
  "reports",
  "location-indexation-owner-review.csv",
);
const evidenceDirectory = path.join(
  process.cwd(),
  "public",
  "images",
  "location-evidence",
);
const reportPath = path.join(
  process.cwd(),
  "reports",
  "location-evidence-privacy-audit.json",
);

async function main() {
  const audit = await auditLocationEvidencePrivacy({
    approvedBusinessEmail: business.email,
    approvedBusinessPhone: business.phoneDisplay,
    evidenceDirectory,
    expectedOwnerReviewRows: 873,
    ownerReviewCsvPath,
    publicRoot: path.join(process.cwd(), "public"),
    records: locationEvidenceRecords,
    sourceText: readFileSync(sourcePath, "utf8"),
  });
  const report = {
    audit: "location-evidence-public-repository-privacy",
    approvedGlobalBusinessDetailsExcludedFromPiiFindings: true,
    generatedAt: new Date().toISOString(),
    ...audit,
    scope: [
      "typed records in data/location-evidence.ts",
      "every referenced evidence asset",
      "every physical file under public/images/location-evidence, including orphans",
      "the tracked blank location indexation owner-review CSV",
    ],
  };

  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log("Location evidence privacy audit");
  console.log(`Approved records: ${audit.approvedEvidenceRecords}`);
  console.log(`Evidence-directory files: ${audit.evidenceDirectoryFiles}`);
  console.log(`Referenced evidence assets: ${audit.referencedEvidenceAssets}`);
  console.log(`Orphan evidence assets: ${audit.orphanEvidenceAssets}`);
  console.log(`Metadata parser: sharp ${audit.metadataParser.version}`);
  console.log(`Scope: ${audit.scopeStatement}`);
  console.log(`Report: ${reportPath}`);

  if (audit.issues.length) {
    audit.issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${audit.scopeStatement}`);
    console.log(
      "LIMITATION: this scoped result is not proof that the repository or Git history contains no PII.",
    );
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exitCode = 1;
});
