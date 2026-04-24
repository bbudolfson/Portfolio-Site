import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé for Brent Budolfson.",
};

// Bump `v` when you replace the PDF in public/ (avoids stale cached file for visitors).
const resumePath = "/Brent_Budolfson_Resume.pdf?v=2026-04-24";

export default function ResumePage() {
  return (
    <main className="container resumePageShell">
      <SiteHeader active="resume" />

      <div className="resumePageToolbar">
        <Link href={resumePath} download className="resumeDownloadLink">
          Download PDF
        </Link>
      </div>

      <div className="resumeViewer">
        <iframe title="Brent Budolfson résumé" src={resumePath} className="resumePdfFrame" />
      </div>
    </main>
  );
}
