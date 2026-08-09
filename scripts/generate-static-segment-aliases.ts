import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { generateStaticSegmentAliases } from "./lib/static-export-segment-aliases";

const outDir = path.resolve(process.cwd(), "out");
if (!existsSync(outDir)) {
  throw new Error("Static export is missing. Run Next.js before postbuild.");
}

const aliases = generateStaticSegmentAliases(outDir);
writeFileSync(
  path.join(outDir, "static-segment-aliases.json"),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: aliases.length,
      bytes: aliases.reduce((total, alias) => total + alias.bytes, 0),
      aliases,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Generated ${aliases.length} static segment aliases (${aliases.reduce(
    (total, alias) => total + alias.bytes,
    0,
  )} bytes).`,
);
