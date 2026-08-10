import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import {
  createStaticSegmentAliasManifest,
  generateStaticSegmentAliases,
  type StaticSegmentAliasManifest,
} from "./lib/static-export-segment-aliases";

function walkFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`Static export contains a symbolic link: ${absolute}`);
    }
    if (entry.isDirectory()) return walkFiles(absolute);
    if (entry.isFile()) return [absolute];
    throw new Error(`Static export contains an unsupported entry: ${absolute}`);
  });
}

function sha256(file: string) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

function fail(message: string): never {
  throw new Error(`Static export hardening audit failed: ${message}`);
}

const outDir = path.resolve(process.cwd(), "out");
const manifestPath = path.join(outDir, "static-segment-aliases.json");
if (!existsSync(outDir) || !lstatSync(outDir).isDirectory()) {
  fail(`missing export directory ${outDir}`);
}
if (!existsSync(manifestPath)) fail(`missing manifest ${manifestPath}`);

const manifest = JSON.parse(
  readFileSync(manifestPath, "utf8"),
) as StaticSegmentAliasManifest;
const aliases = generateStaticSegmentAliases(outDir);
const expectedManifest = createStaticSegmentAliasManifest(aliases, {
  sourceCommit: manifest.sourceCommit,
  nextVersion: manifest.nextVersion,
  platform: manifest.platform,
});
if (JSON.stringify(manifest) !== JSON.stringify(expectedManifest)) {
  fail("manifest does not deterministically match the measured aliases");
}

const packageJson = JSON.parse(
  readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
) as { dependencies?: Record<string, string> };
const measuredCommit = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: process.cwd(),
  encoding: "utf8",
}).trim();
if (manifest.sourceCommit !== measuredCommit) {
  fail(
    `manifest source ${manifest.sourceCommit} does not match ${measuredCommit}`,
  );
}
if (manifest.nextVersion !== packageJson.dependencies?.next) {
  fail(`manifest Next.js version ${manifest.nextVersion} is not current`);
}
if (manifest.platform !== process.platform) {
  fail(`manifest platform ${manifest.platform} is not ${process.platform}`);
}

for (const alias of aliases) {
  const source = path.join(outDir, ...alias.source.split("/"));
  const destination = path.join(outDir, ...alias.alias.split("/"));
  if (!existsSync(source) || !existsSync(destination)) {
    fail(`missing source or alias for ${alias.alias}`);
  }
  if (statSync(source).size !== alias.bytes || statSync(destination).size !== alias.bytes) {
    fail(`byte length mismatch for ${alias.alias}`);
  }
  if (sha256(source) !== alias.sha256 || sha256(destination) !== alias.sha256) {
    fail(`byte identity mismatch for ${alias.alias}`);
  }
}

const files = walkFiles(outDir);
const summary = {
  result: "PASS",
  sourceCommit: measuredCommit,
  node: process.version,
  next: packageJson.dependencies?.next ?? "unknown",
  platform: process.platform,
  strategy: manifest.strategy,
  platformSpecificAliases: true,
  aliasCount: aliases.length,
  fixedAliasCount: aliases.filter((alias) => !alias.alias.includes("$d$")).length,
  dynamicAliasCount: aliases.filter((alias) => alias.alias.includes("$d$")).length,
  duplicatedBytes: aliases.reduce((total, alias) => total + alias.bytes, 0),
  manifestBytes: statSync(manifestPath).size,
  fileCount: files.length,
  rawExportBytes: files.reduce((total, file) => total + statSync(file).size, 0),
  noJekyllPresent: existsSync(path.join(outDir, ".nojekyll")),
  completeNestedPayloadCoverage: true,
  byteIdentityVerified: true,
};
if (!summary.noJekyllPresent) fail(".nojekyll is missing");

const outputPath = process.env.STATIC_EXPORT_AUDIT_OUTPUT?.trim();
if (outputPath) {
  writeFileSync(path.resolve(outputPath), `${JSON.stringify(summary, null, 2)}\n`);
}
console.log(JSON.stringify(summary, null, 2));
