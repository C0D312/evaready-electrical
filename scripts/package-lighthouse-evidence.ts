import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const rawDir = path.resolve(process.env.PERF_RAW_DIR ?? "");
const evidenceDir = path.resolve(process.env.PERF_EVIDENCE_DIR ?? "");
const representativeRun = Number(process.env.PERF_REPRESENTATIVE_RUN ?? "2");

if (!process.env.PERF_RAW_DIR || !existsSync(rawDir)) {
  throw new Error("PERF_RAW_DIR must identify an existing raw-report directory.");
}
if (!process.env.PERF_EVIDENCE_DIR) {
  throw new Error("PERF_EVIDENCE_DIR is required.");
}
if (!Number.isInteger(representativeRun) || representativeRun < 1) {
  throw new Error("PERF_REPRESENTATIVE_RUN must be a positive integer.");
}

mkdirSync(evidenceDir, { recursive: true });
const representativeDir = path.join(evidenceDir, "raw-representative");
mkdirSync(representativeDir, { recursive: true });

const reportPattern = /^(mobile|desktop)-(.+)-run-(\d+)\.json$/;
const files = readdirSync(rawDir)
  .filter((file) => reportPattern.test(file))
  .sort();
if (files.length === 0) {
  throw new Error(`No Lighthouse JSON reports found in ${rawDir}.`);
}

const manifest = files.map((file) => {
  const absolute = path.join(rawDir, file);
  const contents = readFileSync(absolute);
  const match = file.match(reportPattern);
  if (match && Number(match[3]) === representativeRun) {
    writeFileSync(
      path.join(representativeDir, `${file}.gz`),
      gzipSync(contents, { level: 9 }),
    );
  }
  return {
    file,
    bytes: contents.byteLength,
    sha256: createHash("sha256").update(contents).digest("hex"),
  };
});

const representativeFiles = readdirSync(representativeDir).sort();
const expectedRepresentativeCount = new Set(
  files.map((file) => file.replace(/-run-\d+\.json$/, "")),
).size;
if (representativeFiles.length !== expectedRepresentativeCount) {
  throw new Error(
    `Expected ${expectedRepresentativeCount} representative reports, found ${representativeFiles.length}.`,
  );
}

writeFileSync(
  path.join(evidenceDir, "raw-report-sha256-manifest.json"),
  `${JSON.stringify(
    {
      algorithm: "SHA-256",
      rawDirectory: rawDir,
      reportCount: manifest.length,
      representativeRun,
      representativeCount: representativeFiles.length,
      reports: manifest,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      rawDir,
      evidenceDir,
      reportCount: manifest.length,
      representativeCount: representativeFiles.length,
    },
    null,
    2,
  ),
);
