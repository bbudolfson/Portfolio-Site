#!/usr/bin/env node
/**
 * Rasterizes the résumé PDF into a WebP for the in-page viewer (fit-to-frame, no scroll).
 * Source: public/Brent_Budolfson_Resume.pdf
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { pdf } from "pdf-to-img";
import sharp from "sharp";

const ROOT = process.cwd();
const PDF_PATH = path.join(ROOT, "public/Brent_Budolfson_Resume.pdf");
const OUT_DIR = path.join(ROOT, "public/resume");
const OUT_PATH = path.join(OUT_DIR, "resume.webp");
const PDF_SCALE = 2;
const MAX_WIDTH = 1360;
const WEBP_QUALITY = 88;

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await fileExists(PDF_PATH))) {
    console.warn(`  Skipping résumé raster: missing ${PDF_PATH}`);
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const document = await pdf(PDF_PATH, { scale: PDF_SCALE });
  let pageBuffer = null;

  for await (const imageBuffer of document) {
    pageBuffer = imageBuffer;
    break;
  }

  if (!pageBuffer) {
    console.warn("  Skipping résumé raster: PDF has no pages");
    return;
  }

  let pipeline = sharp(pageBuffer);
  const meta = await pipeline.metadata();
  if ((meta.width ?? 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(OUT_PATH);
  console.log(`  Wrote ${path.relative(ROOT, OUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
