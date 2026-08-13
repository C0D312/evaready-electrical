import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourceDirectory = path.join(projectRoot, "public", "images", "header");
const outputDirectory = path.join(sourceDirectory, "responsive-lockups-v18");

const sources = {
  evaready: path.join(sourceDirectory, "evaready-header-evaready-v16.webp"),
  electrical: path.join(sourceDirectory, "evaready-header-electrical-v16.webp"),
  energyLine: path.join(sourceDirectory, "evaready-header-energy-line-v15.webp"),
  bolt: path.join(sourceDirectory, "evaready-header-bolt-v15.webp"),
};

// CSS-space layouts are rendered at 3x on phones and 2x everywhere else.
// Each source layer is resized proportionally; no layer is stretched or cropped.
const variants = [
  { name: "320", width: 320, height: 112, scale: 3, centreX: 136, evareadyWidth: 236, evareadyTop: 12, electricalWidth: 220, electricalTop: 43, lineWidth: 260, lineTop: 62, boltHeight: 46, boltTop: 57 },
  { name: "360", width: 360, height: 112, scale: 3, centreX: 156, evareadyWidth: 268, evareadyTop: 7, electricalWidth: 250, electricalTop: 44, lineWidth: 290, lineTop: 64, boltHeight: 48, boltTop: 58 },
  { name: "375", width: 375, height: 116, scale: 3, centreX: 163, evareadyWidth: 278, evareadyTop: 11, electricalWidth: 260, electricalTop: 49, lineWidth: 300, lineTop: 69, boltHeight: 48, boltTop: 62 },
  { name: "390", width: 390, height: 116, scale: 3, centreX: 170, evareadyWidth: 290, evareadyTop: 10, electricalWidth: 270, electricalTop: 50, lineWidth: 315, lineTop: 70, boltHeight: 48, boltTop: 62 },
  { name: "412", width: 412, height: 116, scale: 3, centreX: 180, evareadyWidth: 307, evareadyTop: 10, electricalWidth: 286, electricalTop: 52, lineWidth: 330, lineTop: 72, boltHeight: 48, boltTop: 64 },
  { name: "430", width: 430, height: 120, scale: 3, centreX: 188, evareadyWidth: 320, evareadyTop: 10, electricalWidth: 298, electricalTop: 54, lineWidth: 345, lineTop: 75, boltHeight: 50, boltTop: 66 },
  { name: "540", width: 540, height: 120, scale: 2, centreX: 248, evareadyWidth: 380, evareadyTop: 6, electricalWidth: 354, electricalTop: 55, lineWidth: 445, lineTop: 81, boltHeight: 48, boltTop: 69 },
  { name: "640", width: 640, height: 120, scale: 2, centreX: 292, evareadyWidth: 430, evareadyTop: 4, electricalWidth: 400, electricalTop: 56, lineWidth: 510, lineTop: 80, boltHeight: 48, boltTop: 70 },
  { name: "768", width: 768, height: 123, scale: 2, centreX: 350, evareadyWidth: 500, evareadyTop: 2, electricalWidth: 465, electricalTop: 61, lineWidth: 580, lineTop: 88, boltHeight: 50, boltTop: 71 },
  { name: "820", width: 820, height: 128, scale: 2, centreX: 375, evareadyWidth: 540, evareadyTop: 1, electricalWidth: 500, electricalTop: 66, lineWidth: 620, lineTop: 94, boltHeight: 52, boltTop: 74 },
  { name: "1024", width: 1024, height: 135, scale: 2, centreX: 512, evareadyWidth: 620, evareadyTop: 0, electricalWidth: 580, electricalTop: 68, lineWidth: 670, lineTop: 100, boltHeight: 52, boltTop: 82 },
  { name: "1280", width: 1280, height: 135, scale: 2, centreX: 640, evareadyWidth: 650, evareadyTop: 0, electricalWidth: 610, electricalTop: 68, lineWidth: 720, lineTop: 100, boltHeight: 52, boltTop: 82 },
  { name: "1366", width: 1366, height: 135, scale: 2, centreX: 683, evareadyWidth: 680, evareadyTop: 0, electricalWidth: 635, electricalTop: 68, lineWidth: 750, lineTop: 100, boltHeight: 52, boltTop: 82 },
  { name: "1440", width: 1440, height: 145, scale: 2, centreX: 720, evareadyWidth: 740, evareadyTop: 0, electricalWidth: 690, electricalTop: 76, lineWidth: 820, lineTop: 111, boltHeight: 55, boltTop: 88 },
  { name: "1600", width: 1600, height: 145, scale: 2, centreX: 800, evareadyWidth: 760, evareadyTop: 0, electricalWidth: 710, electricalTop: 75, lineWidth: 850, lineTop: 110, boltHeight: 55, boltTop: 88 },
  { name: "1920", width: 1920, height: 150, scale: 2, centreX: 960, evareadyWidth: 790, evareadyTop: 0, electricalWidth: 740, electricalTop: 80, lineWidth: 900, lineTop: 116, boltHeight: 56, boltTop: 92 },
  { name: "2048", width: 2048, height: 160, scale: 2, centreX: 1024, evareadyWidth: 835, evareadyTop: 0, electricalWidth: 780, electricalTop: 86, lineWidth: 960, lineTop: 124, boltHeight: 60, boltTop: 98 },
  { name: "2208", width: 2208, height: 160, scale: 2, centreX: 1104, evareadyWidth: 850, evareadyTop: 0, electricalWidth: 795, electricalTop: 86, lineWidth: 1000, lineTop: 124, boltHeight: 60, boltTop: 98 },
  { name: "2560", width: 2560, height: 160, scale: 2, centreX: 1280, evareadyWidth: 870, evareadyTop: 0, electricalWidth: 810, electricalTop: 86, lineWidth: 1050, lineTop: 124, boltHeight: 60, boltTop: 98 },
];

function scaled(value, scale) {
  return Math.round(value * scale);
}

async function proportionalLayer(source, { width, height }) {
  const resize = width ? { width: Math.round(width) } : { height: Math.round(height) };
  return sharp(source)
    .resize({ ...resize, fit: "inside", withoutEnlargement: false, kernel: sharp.kernel.lanczos3 })
    .webp({ lossless: true, effort: 6 })
    .toBuffer({ resolveWithObject: true });
}

async function createVariant(variant) {
  const canvasWidth = variant.width * variant.scale;
  const canvasHeight = variant.height * variant.scale;
  const centreX = scaled(variant.centreX, variant.scale);

  const [evaready, electrical, energyLine, bolt] = await Promise.all([
    proportionalLayer(sources.evaready, { width: scaled(variant.evareadyWidth, variant.scale) }),
    proportionalLayer(sources.electrical, { width: scaled(variant.electricalWidth, variant.scale) }),
    proportionalLayer(sources.energyLine, { width: scaled(variant.lineWidth, variant.scale) }),
    proportionalLayer(sources.bolt, { height: scaled(variant.boltHeight, variant.scale) }),
  ]);

  const layers = [
    {
      input: evaready.data,
      left: Math.round(centreX - evaready.info.width / 2),
      top: scaled(variant.evareadyTop, variant.scale),
    },
    {
      input: electrical.data,
      left: Math.round(centreX - electrical.info.width / 2),
      top: scaled(variant.electricalTop, variant.scale),
    },
    {
      input: energyLine.data,
      left: Math.round(centreX - energyLine.info.width / 2),
      top: scaled(variant.lineTop, variant.scale),
    },
    {
      input: bolt.data,
      left: Math.round(centreX - bolt.info.width / 2),
      top: scaled(variant.boltTop, variant.scale),
    },
  ];

  for (const layer of layers) {
    const metadata = await sharp(layer.input).metadata();
    if (
      layer.left < 0 ||
      layer.top < 0 ||
      layer.left + (metadata.width ?? 0) > canvasWidth ||
      layer.top + (metadata.height ?? 0) > canvasHeight
    ) {
      throw new Error(
        `Layer exceeds ${variant.name} canvas: ${JSON.stringify({ left: layer.left, top: layer.top, width: metadata.width, height: metadata.height })}`,
      );
    }
  }

  const output = path.join(outputDirectory, `evaready-header-lockup-${variant.name}-v18.webp`);
  await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(layers)
    .webp({ lossless: true, effort: 6 })
    .toFile(output);

  const metadata = await sharp(output).metadata();
  return {
    file: path.relative(projectRoot, output).replaceAll("\\", "/"),
    width: metadata.width,
    height: metadata.height,
    bytes: (await fs.stat(output)).size,
  };
}

await fs.mkdir(outputDirectory, { recursive: true });
const results = [];
for (const variant of variants) {
  results.push(await createVariant(variant));
}

await fs.writeFile(
  path.join(outputDirectory, "manifest.json"),
  `${JSON.stringify(
    {
      generator: "scripts/generate-responsive-header-lockups.mjs",
      sources: Object.fromEntries(
        Object.entries(sources).map(([name, source]) => [
          name,
          path.relative(projectRoot, source).replaceAll("\\", "/"),
        ]),
      ),
      variants: results,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.table(results);
