#!/usr/bin/env node
/**
 * Generates WebP derivatives for project PNG/JPEG assets in public/images/projects/.
 * Run after adding or replacing source images: npm run optimize-images
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECTS_DIR = path.join(process.cwd(), "public/images/projects");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function optimizeFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (!SOURCE_EXT.has(ext)) return null;

  const inputPath = path.join(PROJECTS_DIR, fileName);
  const outputPath = path.join(PROJECTS_DIR, `${path.basename(fileName, ext)}.webp`);

  const image = sharp(inputPath);
  const meta = await image.metadata();
  const width = meta.width ?? MAX_WIDTH;

  let pipeline = image;
  if (width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outputPath);

  const { size: inputBytes } = await import("node:fs/promises").then((fs) => fs.stat(inputPath));
  const { size: outputBytes } = await import("node:fs/promises").then((fs) => fs.stat(outputPath));

  return {
    fileName,
    inputKb: Math.round(inputBytes / 1024),
    outputKb: Math.round(outputBytes / 1024),
    width: width > MAX_WIDTH ? MAX_WIDTH : width,
  };
}

async function main() {
  const entries = await readdir(PROJECTS_DIR);
  const results = [];

  for (const fileName of entries.sort()) {
    const result = await optimizeFile(fileName);
    if (result) results.push(result);
  }

  if (results.length === 0) {
    console.log("No project images to optimize.");
    return;
  }

  console.log("Optimized project images (WebP):");
  for (const { fileName, inputKb, outputKb, width } of results) {
    const saved = Math.round((1 - outputKb / inputKb) * 100);
    console.log(`  ${fileName} → ${path.basename(fileName, path.extname(fileName))}.webp (${inputKb}KB → ${outputKb}KB, ~${saved}% smaller, max ${width}px)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
