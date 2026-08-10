import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  createStaticSegmentAliasManifest,
  generateStaticSegmentAliases,
} from "./lib/static-export-segment-aliases";

const outDir = path.resolve(process.cwd(), "out");
if (!existsSync(outDir)) {
  throw new Error("Static export is missing. Run Next.js before postbuild.");
}

const aliases = generateStaticSegmentAliases(outDir);
const packageJson = JSON.parse(
  readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
) as { dependencies?: Record<string, string> };
const sourceCommit = (
  process.env.STATIC_EXPORT_SOURCE_SHA ??
  execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: process.cwd(),
    encoding: "utf8",
  })
).trim();
const manifest = createStaticSegmentAliasManifest(aliases, {
  sourceCommit,
  nextVersion: packageJson.dependencies?.next ?? "unknown",
  platform: process.platform,
});
writeFileSync(
  path.join(outDir, "static-segment-aliases.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(
  `Generated ${manifest.aliasCount} static segment aliases (${manifest.duplicatedBytes} bytes) on ${manifest.platform}.`,
);
