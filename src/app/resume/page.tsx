import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé for Brent Budolfson.",
};

const resumePath = "/Brent_Budolfson_Resume.pdf";

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
