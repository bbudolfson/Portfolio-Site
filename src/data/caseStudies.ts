import clockworkManifest from "../../public/case-studies/clockwork/manifest.json";
import connectedObjectsManifest from "../../public/case-studies/connected-objects/manifest.json";
import customsEntryManifest from "../../public/case-studies/customs-entry/manifest.json";

export type CaseStudyManifest = {
  id: string;
  title: string;
  description: string;
  slideCount: number;
  slides: { src: string; alt: string }[];
  pdfDownload?: string;
  generatedAt: string;
};

export const caseStudyPageMeta = {
  title: "Case Studies",
  description:
    "A deep dive into the design lifecycle, 0-1 products, and design systems for enterprise SaaS.",
};

/** Order shown on /case-study. Add entries here as new PDFs are ready. */
export const caseStudies: CaseStudyManifest[] = [
  clockworkManifest,
  customsEntryManifest,
  connectedObjectsManifest,
];

export function slidesWithCacheBust(manifest: CaseStudyManifest) {
  const cacheVersion = manifest.generatedAt.slice(0, 10);
  return manifest.slides.map((slide) => ({
    ...slide,
    src: `${slide.src}?v=${cacheVersion}`,
  }));
}
