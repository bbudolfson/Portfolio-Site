import type { Metadata } from "next";

import { CaseStudyCarousel } from "../../components/CaseStudyCarousel";
import { SiteHeader } from "../../components/SiteHeader";
import { caseStudies, caseStudyPageMeta, slidesWithCacheBust } from "../../data/caseStudies";

export const metadata: Metadata = {
  title: caseStudyPageMeta.title,
  description: caseStudyPageMeta.description,
};

export default function CaseStudyPage() {
  return (
    <main className="container pageShell caseStudyPageShell">
      <SiteHeader active="case-study" />

      <header className="caseStudyPageHeader">
        <h1 className="projectsIndexHeading">{caseStudyPageMeta.title}</h1>
        <p className="caseStudyPageIntro">{caseStudyPageMeta.description}</p>
      </header>

      <div className="caseStudyList">
        {caseStudies.map((study) => (
          <CaseStudyCarousel key={study.id} slides={slidesWithCacheBust(study)} />
        ))}
      </div>
    </main>
  );
}
