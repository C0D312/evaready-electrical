import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { coverageSearchItems } from "../data/service-area-coverage";

const searchIndex = coverageSearchItems.map(
  ({ areaName, href, postcode, regionName, suburbName }) => ({
    a: areaName,
    h: href,
    p: postcode,
    r: regionName,
    s: suburbName,
  }),
);

const outputPath = resolve(
  process.cwd(),
  "public",
  "service-area-search-index.json",
);

writeFileSync(outputPath, `${JSON.stringify(searchIndex)}\n`, "utf8");
process.stdout.write(
  `Generated ${searchIndex.length} service-area search records.\n`,
);
