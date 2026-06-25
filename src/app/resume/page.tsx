import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé for Brent Budolfson.",
};

// Bump `v` when you replace the PDF in public/ (avoids stale cached file for visitors).
const resumePath = "/Brent_Budolfson_Resume.pdf?v=2026-06-11";
const resumeImagePath = "/resume/resume.webp?v=2026-06-11";

export default function ResumePage() {
  return (
    <main className="container resumePageShell">
      <SiteHeader active="resume" />

      <h1 className="projectsIndexHeading">Résumé</h1>

      <div className="resumeViewerStack">
        <div className="resumeViewer">
          <img
            src={resumeImagePath}
            alt="Brent Budolfson résumé"
            className="resumePageImage"
            width={1224}
            height={1584}
          />
        </div>

        <div className="resumePageToolbar">
          <Link href={resumePath} download className="processPointsCta">
            Download PDF
          </Link>
        </div>
      </div>
    </main>
  );
}
