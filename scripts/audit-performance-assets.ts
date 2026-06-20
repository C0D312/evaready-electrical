import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

type AssetRow = {
  file: string;
  type: string;
  rawBytes: number;
  gzipBytes: number;
  group: string;
  over500Kb: "yes" | "no";
  over1Mb: "yes" | "no";
  duplicateContentHash: "yes" | "no";
  recommendation: string;
  notes: string;
  hash: string;
};

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "out");
const reportDir = path.join(projectRoot, "reports");
const reportPath = path.join(reportDir, "performance-asset-audit.csv");
const yesNo = (condition: boolean): "yes" | "no" => (condition ? "yes" : "no");

function walkFiles(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function csvCell(value: string | number) {
  const text = String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function classifyType(file: string) {
  const extension = path.extname(file).toLowerCase();
  if (extension === ".html") return "html";
  if (extension === ".js" || extension === ".mjs") return "javascript";
  if (extension === ".css") return "css";
  if ([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".ico"].includes(extension)) return "image";
  if (extension === ".txt") return "rsc/text";
  if (extension === ".xml") return "xml";
  if (extension === ".json") return "json";
  return extension.replace(/^\./, "") || "other";
}

function classifyGroup(relativeFile: string, type: string) {
  const normalized = relativeFile.replace(/\\/g, "/");
  if (normalized.startsWith("_next/static/chunks/")) return `${type} chunk`;
  if (normalized.startsWith("_next/static/")) return "next static asset";
  if (normalized.startsWith("images/")) return "public image";
  if (normalized.endsWith("/index.html") || normalized === "index.html") return "route html";
  if (normalized.endsWith(".txt") && normalized.includes("__next")) return "next route payload";
  if (["sitemap.xml", "robots.txt", "site-version.json"].includes(normalized)) return "static metadata";
  return type;
}

function recommendationFor(row: Omit<AssetRow, "recommendation" | "notes" | "duplicateContentHash">, duplicate: boolean) {
  const recommendations: string[] = [];
  const notes: string[] = [];

  if (row.rawBytes > 1_000_000) {
    recommendations.push("serious size review");
  } else if (row.rawBytes > 500_000) {
    recommendations.push("size review");
  }

  if (row.type === "image" && row.rawBytes > 500_000) {
    recommendations.push("consider smaller source or modern format if visual quality is preserved");
  }

  if (row.type === "html" && row.rawBytes > 500_000) {
    recommendations.push("review repeated visible copy/schema/data on this static route");
  }

  if (row.type === "javascript" && row.rawBytes > 250_000) {
    recommendations.push("review client component and dependency contribution");
  }

  if (duplicate) {
    recommendations.push("duplicate content hash detected");
  }

  if (row.group === "next route payload") {
    notes.push("Next static export route payload");
  }

  if (!recommendations.length) {
    recommendations.push("ok");
  }

  return {
    recommendation: recommendations.join("; "),
    notes: notes.join("; "),
  };
}

if (!existsSync(outputRoot)) {
  throw new Error("Missing out/ directory. Run the production build before audit:performance.");
}

mkdirSync(reportDir, { recursive: true });

const files = walkFiles(outputRoot);
const initialRows = files.map((file) => {
  const buffer = readFileSync(file);
  const relativeFile = path.relative(outputRoot, file).replace(/\\/g, "/");
  const rawBytes = statSync(file).size;
  const hash = createHash("sha256").update(buffer).digest("hex");
  const type = classifyType(relativeFile);

  return {
    file: relativeFile,
    type,
    rawBytes,
    gzipBytes: gzipSync(buffer).length,
    group: classifyGroup(relativeFile, type),
    over500Kb: yesNo(rawBytes > 500_000),
    over1Mb: yesNo(rawBytes > 1_000_000),
    hash,
  };
});

const hashCounts = new Map<string, number>();
for (const row of initialRows) {
  hashCounts.set(row.hash, (hashCounts.get(row.hash) ?? 0) + 1);
}

const rows: AssetRow[] = initialRows.map((row) => {
  const duplicate = (hashCounts.get(row.hash) ?? 0) > 1;
  const recommendation = recommendationFor(row, duplicate);
  return {
    ...row,
    duplicateContentHash: duplicate ? "yes" : "no",
    recommendation: recommendation.recommendation,
    notes: recommendation.notes,
  };
});

const header = [
  "file",
  "type",
  "raw bytes",
  "gzip bytes",
  "route or asset group",
  "over 500 KB yes/no",
  "over 1 MB yes/no",
  "duplicate content hash yes/no",
  "optimisation recommendation",
  "notes",
];

const csv = [
  header.map(csvCell).join(","),
  ...rows
    .sort((a, b) => b.rawBytes - a.rawBytes || a.file.localeCompare(b.file))
    .map((row) =>
      [
        row.file,
        row.type,
        row.rawBytes,
        row.gzipBytes,
        row.group,
        row.over500Kb,
        row.over1Mb,
        row.duplicateContentHash,
        row.recommendation,
        row.notes,
      ]
        .map(csvCell)
        .join(","),
    ),
].join("\n");

writeFileSync(reportPath, `${csv}\n`);

const totalBytes = rows.reduce((sum, row) => sum + row.rawBytes, 0);
const totalGzipBytes = rows.reduce((sum, row) => sum + row.gzipBytes, 0);
const over500Kb = rows.filter((row) => row.rawBytes > 500_000).length;
const over1Mb = rows.filter((row) => row.rawBytes > 1_000_000).length;

console.log(
  JSON.stringify(
    {
      reportPath,
      files: rows.length,
      totalBytes,
      totalGzipBytes,
      over500Kb,
      over1Mb,
      largest: rows
        .slice()
        .sort((a, b) => b.rawBytes - a.rawBytes)
        .slice(0, 10)
        .map(({ file, type, rawBytes, gzipBytes, group }) => ({
          file,
          type,
          rawBytes,
          gzipBytes,
          group,
        })),
    },
    null,
    2,
  ),
);
