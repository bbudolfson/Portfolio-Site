import type { Metadata } from "next";

import { CaseStudyCarousel } from "../../components/CaseStudyCarousel";
import { SiteHeader } from "../../components/SiteHeader";
import principalManifest from "../../../public/case-studies/principal/manifest.json";

export const metadata: Metadata = {
  title: "Logixboard Case Study",
  description: principalManifest.description,
};

export default function CaseStudyPage() {
  const { title, description, slides: rawSlides, generatedAt } = principalManifest;
  const cacheVersion = generatedAt.slice(0, 10);
  const slides = rawSlides.map((slide) => ({
    ...slide,
    src: `${slide.src}?v=${cacheVersion}`,
  }));

  return (
    <main className="container pageShell caseStudyPageShell">
      <SiteHeader active="case-study" />

      <header className="caseStudyPageHeader">
        <h1 className="projectsIndexHeading">{title}</h1>
        <p className="caseStudyPageIntro">{description}</p>
      </header>

      <CaseStudyCarousel slides={slides} />
    </main>
  );
}
