import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  fetchGoogleBusinessProfileRating,
  readGoogleBusinessProfileSyncConfig,
  serialisePublicGoogleRating,
} from "./lib/google-business-profile-rating-sync";

const outputPath = path.resolve(
  process.cwd(),
  "public/data/google-business-profile-rating.json",
);

async function main() {
  const config = readGoogleBusinessProfileSyncConfig(process.env);
  const summary = await fetchGoogleBusinessProfileRating(config);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, serialisePublicGoogleRating(summary), "utf8");

  console.info(
    `Google Business Profile aggregate refreshed: ${summary.averageRating.toFixed(1)} stars, ${summary.totalReviewCount} reviews.`,
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Google Business Profile aggregate refresh failed: ${message}`);
  process.exitCode = 1;
});
