#!/usr/bin/env node
/**
 * Rasterizes case-study PDFs into WebP slide images + manifest.json for the carousel.
 * Source PDFs live in public/case-studies/source/*.pdf
 */
import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { pdf } from "pdf-to-img";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "public/case-studies/source");
const OUTPUT_ROOT = path.join(ROOT, "public/case-studies");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;
const PDF_SCALE = 2;

const CASE_STUDIES = [
  // Principal deck paused — being split into three separate case studies.
  {
    id: "clockwork",
    pdfFile: "Clockwork_Case_Study_Portfolio.pdf",
    title: "Clockwork Case Study",
    description:
      "An AI-powered email companion for freight forwarder operations teams, reducing inbox overhead and eliminating back-and-forth between email and logistics software.",
  },
];

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertCaseStudy({ id, pdfFile, title, description }) {
  const pdfPath = path.join(SOURCE_DIR, pdfFile);
  if (!(await fileExists(pdfPath))) {
    console.warn(`  Skipping ${id}: missing ${pdfPath}`);
    return null;
  }

  const outDir = path.join(OUTPUT_ROOT, id);
  await mkdir(outDir, { recursive: true });

  const existing = await readdir(outDir).catch(() => []);
  await Promise.all(
    existing
      .filter((name) => name.startsWith("slide-") && name.endsWith(".webp"))
      .map((name) => unlink(path.join(outDir, name))),
  );

  const document = await pdf(pdfPath, { scale: PDF_SCALE });
  const slides = [];
  let page = 0;

  for await (const imageBuffer of document) {
    page += 1;
    const fileName = `slide-${String(page).padStart(2, "0")}.webp`;
    const outPath = path.join(outDir, fileName);

    let pipeline = sharp(imageBuffer);
    const meta = await pipeline.metadata();
    if ((meta.width ?? 0) > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outPath);

    const { size } = await stat(outPath);
    slides.push({
      src: `/case-studies/${id}/${fileName}`,
      alt: `${title} — slide ${page}`,
      bytes: size,
    });
  }

  const pdfPublicPath = `/case-studies/source/${pdfFile}`;
  const manifest = {
    id,
    title,
    description,
    slideCount: slides.length,
    slides: slides.map(({ src, alt }) => ({ src, alt })),
    pdfDownload: pdfPublicPath,
    generatedAt: new Date().toISOString(),
  };

  await writeFile(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  const totalKb = Math.round(slides.reduce((sum, s) => sum + s.bytes, 0) / 1024);
  console.log(`  ${id}: ${slides.length} slides → public/case-studies/${id}/ (${totalKb}KB WebP total)`);

  return manifest;
}

async function main() {
  await mkdir(SOURCE_DIR, { recursive: true });

  const sources = await readdir(SOURCE_DIR).catch(() => []);
  if (sources.length === 0) {
    console.log("No case-study PDFs in public/case-studies/source/");
    return;
  }

  console.log("Converting case-study PDFs:");
  for (const entry of CASE_STUDIES) {
    await convertCaseStudy(entry);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
