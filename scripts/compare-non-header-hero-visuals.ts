import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

function requiredEnvironmentValue(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

const beforeDir = path.resolve(requiredEnvironmentValue("HERO_VISUAL_BEFORE_DIR"));
const afterDir = path.resolve(requiredEnvironmentValue("HERO_VISUAL_AFTER_DIR"));
const outputPath = path.resolve(
  requiredEnvironmentValue("HERO_VISUAL_COMPARISON_OUTPUT"),
);

async function compareImage(file: string) {
  const [before, after] = await Promise.all([
    sharp(path.join(beforeDir, file)).raw().toBuffer({ resolveWithObject: true }),
    sharp(path.join(afterDir, file)).raw().toBuffer({ resolveWithObject: true }),
  ]);

  if (
    before.info.width !== after.info.width ||
    before.info.height !== after.info.height ||
    before.info.channels !== after.info.channels
  ) {
    throw new Error(`${file} dimensions or channel counts differ.`);
  }

  let changedPixels = 0;
  let maximumChannelDelta = 0;
  let sumMaximumChannelDelta = 0;
  const channelsToCompare = Math.min(3, before.info.channels);

  for (let offset = 0; offset < before.data.length; offset += before.info.channels) {
    let pixelDelta = 0;
    for (let channel = 0; channel < channelsToCompare; channel += 1) {
      pixelDelta = Math.max(
        pixelDelta,
        Math.abs(before.data[offset + channel] - after.data[offset + channel]),
      );
    }
    if (pixelDelta > 0) {
      changedPixels += 1;
      sumMaximumChannelDelta += pixelDelta;
      maximumChannelDelta = Math.max(maximumChannelDelta, pixelDelta);
    }
  }

  const totalPixels = before.info.width * before.info.height;
  return {
    file,
    width: before.info.width,
    height: before.info.height,
    totalPixels,
    changedPixels,
    changedPixelPercent: Number(
      ((changedPixels / totalPixels) * 100).toFixed(6),
    ),
    meanChangedPixelMaximumChannelDelta: changedPixels
      ? Number((sumMaximumChannelDelta / changedPixels).toFixed(3))
      : 0,
    meanAllPixelMaximumChannelDelta: Number(
      (sumMaximumChannelDelta / totalPixels).toFixed(6),
    ),
    maximumChannelDelta,
    pixelIdentical: changedPixels === 0,
  };
}

async function main() {
  const beforeFiles = readdirSync(beforeDir)
    .filter((file) => file.endsWith(".png"))
    .sort();
  const afterFiles = readdirSync(afterDir)
    .filter((file) => file.endsWith(".png"))
    .sort();

  if (JSON.stringify(beforeFiles) !== JSON.stringify(afterFiles)) {
    throw new Error("Before and after screenshot inventories differ.");
  }

  const comparisons = [];
  for (const file of beforeFiles) comparisons.push(await compareImage(file));

  const result = {
    beforeDir,
    afterDir,
    screenshotCount: comparisons.length,
    pixelIdenticalCount: comparisons.filter((item) => item.pixelIdentical).length,
    comparisons,
  };
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    `Compared ${comparisons.length} screenshots; ${result.pixelIdenticalCount} are pixel-identical.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
