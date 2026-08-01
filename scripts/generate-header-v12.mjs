import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourcePath = path.join(
  projectRoot,
  "public/images/header/evaready-header-owner-v7.webp",
);
const outputDir = path.join(projectRoot, "public/images/header");

const sourceRegions = {
  texture: { left: 300, top: 0, width: 1448, height: 150 },
  leftEnergy: { left: 0, top: 0, width: 320, height: 682 },
  rightEnergy: { left: 1810, top: 0, width: 238, height: 682 },
  wordmark: { left: 315, top: 175, width: 1490, height: 230 },
  leftEnergyLine: { left: 240, top: 450, width: 660, height: 42 },
  rightEnergyLine: { left: 1148, top: 450, width: 660, height: 42 },
  centreBolt: { left: 905, top: 400, width: 250, height: 210 },
};

const variants = [
  {
    name: "mobile",
    width: 960,
    height: 300,
    direct: true,
  },
  {
    name: "tablet",
    width: 1600,
    height: 250,
    edgeWidth: 260,
    wordmarkWidth: 1180,
    lineWidth: 1280,
    boltHeight: 80,
  },
  {
    name: "desktop",
    width: 2560,
    height: 260,
    edgeWidth: 340,
    wordmarkWidth: 1200,
    lineWidth: 1520,
    boltHeight: 72,
  },
  {
    name: "large",
    width: 2944,
    height: 230,
    edgeWidth: 360,
    wordmarkWidth: 1180,
    lineWidth: 1500,
    boltHeight: 68,
  },
  {
    name: "wide",
    width: 3840,
    height: 230,
    edgeWidth: 400,
    wordmarkWidth: 1250,
    lineWidth: 1640,
    boltHeight: 68,
  },
];

function centeredLeft(canvasWidth, layerWidth) {
  return Math.round((canvasWidth - layerWidth) / 2);
}

async function sourceLayer(region, resizeOptions) {
  return sharp(sourcePath)
    .extract(region)
    .resize(resizeOptions)
    .webp({ quality: 96, smartSubsample: true })
    .toBuffer();
}

async function transparentEnergyLayer(
  region,
  resizeOptions,
  { threshold = 38, fade } = {},
) {
  const resized = await sharp(sourcePath)
    .extract(region)
    .resize(resizeOptions)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(resized.info.width * resized.info.height * 4);

  for (
    let sourceIndex = 0, targetIndex = 0, pixelIndex = 0;
    sourceIndex < resized.data.length;
    pixelIndex++
  ) {
    const red = resized.data[sourceIndex++];
    const green = resized.data[sourceIndex++];
    const blue = resized.data[sourceIndex++];
    const brightness = Math.max(red, green, blue);
    const x = pixelIndex % resized.info.width;
    const progress = x / Math.max(1, resized.info.width - 1);
    const fadeMultiplier =
      fade === "left"
        ? Math.min(1, progress / 0.42)
        : fade === "right"
          ? Math.min(1, (1 - progress) / 0.42)
          : 1;
    const alpha = Math.round(
      Math.max(0, Math.min(255, (brightness - threshold) * 10)) *
        fadeMultiplier,
    );

    rgba[targetIndex++] = red;
    rgba[targetIndex++] = green;
    rgba[targetIndex++] = blue;
    rgba[targetIndex++] = alpha;
  }

  return sharp(rgba, {
    raw: {
      width: resized.info.width,
      height: resized.info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();
}

async function buildVariant(variant) {
  const outputPath = path.join(
    outputDir,
    `evaready-header-${variant.name}-refined-v12.webp`,
  );

  if (variant.direct) {
    const resized = await sharp(sourcePath).resize({ width: variant.width }).toBuffer();
    const resizedMeta = await sharp(resized).metadata();
    const cropTop = Math.max(0, Math.floor(((resizedMeta.height ?? variant.height) - variant.height) / 2));

    await sharp(resized)
      .extract({
        left: 0,
        top: cropTop,
        width: variant.width,
        height: variant.height,
      })
      .webp({ quality: 91, smartSubsample: true, effort: 6 })
      .toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    const stats = await fs.stat(outputPath);
    return {
      file: path.relative(projectRoot, outputPath),
      width: metadata.width,
      height: metadata.height,
      bytes: stats.size,
    };
  }

  const texture = await sourceLayer(sourceRegions.texture, {
    width: variant.width,
    height: variant.height,
    fit: "fill",
  });
  const leftEnergy = await transparentEnergyLayer(
    sourceRegions.leftEnergy,
    {
      width: variant.edgeWidth,
      height: variant.height,
      fit: "cover",
      position: "centre",
    },
    { threshold: 45, fade: "right" },
  );
  const rightEnergy = await transparentEnergyLayer(
    sourceRegions.rightEnergy,
    {
      width: variant.edgeWidth,
      height: variant.height,
      fit: "cover",
      position: "centre",
    },
    { threshold: 45, fade: "left" },
  );
  const rightMeta = await sharp(rightEnergy).metadata();
  const wordmark = await transparentEnergyLayer(sourceRegions.wordmark, {
    width: variant.wordmarkWidth,
    fit: "inside",
    withoutEnlargement: false,
  });
  const wordmarkMeta = await sharp(wordmark).metadata();
  const lineSideWidth = Math.round((variant.lineWidth - variant.boltHeight) / 2);
  const leftEnergyLine = await transparentEnergyLayer(
    sourceRegions.leftEnergyLine,
    {
      width: lineSideWidth,
      fit: "inside",
      withoutEnlargement: false,
    },
    { threshold: 55 },
  );
  const rightEnergyLine = await transparentEnergyLayer(
    sourceRegions.rightEnergyLine,
    {
      width: lineSideWidth,
      fit: "inside",
      withoutEnlargement: false,
    },
    { threshold: 55 },
  );
  const leftLineMeta = await sharp(leftEnergyLine).metadata();
  const rightLineMeta = await sharp(rightEnergyLine).metadata();
  const centreBolt = await transparentEnergyLayer(
    sourceRegions.centreBolt,
    {
      height: variant.boltHeight,
      fit: "inside",
      withoutEnlargement: false,
    },
    { threshold: 55 },
  );
  const boltMeta = await sharp(centreBolt).metadata();

  const lineTop =
    variant.height -
    Math.max(leftLineMeta.height ?? 0, rightLineMeta.height ?? 0) -
    3;
  const boltTop = variant.height - (boltMeta.height ?? 0) + 2;
  const wordmarkTop = 2;

  await sharp({
    create: {
      width: variant.width,
      height: variant.height,
      channels: 3,
      background: "#010611",
    },
  })
    .composite([
      { input: texture, blend: "over" },
      { input: leftEnergy, left: 0, top: 0, blend: "screen" },
      {
        input: rightEnergy,
        left: variant.width - (rightMeta.width ?? 0),
        top: 0,
        blend: "screen",
      },
      {
        input: leftEnergyLine,
        left:
          Math.round(variant.width / 2) -
          Math.round(variant.boltHeight / 2) -
          (leftLineMeta.width ?? 0),
        top: lineTop,
        blend: "screen",
      },
      {
        input: rightEnergyLine,
        left:
          Math.round(variant.width / 2) + Math.round(variant.boltHeight / 2),
        top: lineTop,
        blend: "screen",
      },
      {
        input: centreBolt,
        left: centeredLeft(variant.width, boltMeta.width ?? 0),
        top: boltTop,
        blend: "screen",
      },
      {
        input: wordmark,
        left: centeredLeft(variant.width, wordmarkMeta.width ?? 0),
        top: wordmarkTop,
        blend: "screen",
      },
    ])
    .webp({ quality: 91, smartSubsample: true, effort: 6 })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  const stats = await fs.stat(outputPath);
  return {
    file: path.relative(projectRoot, outputPath),
    width: metadata.width,
    height: metadata.height,
    bytes: stats.size,
  };
}

await fs.mkdir(outputDir, { recursive: true });
const results = [];
for (const variant of variants) {
  results.push(await buildVariant(variant));
}

console.table(results);
