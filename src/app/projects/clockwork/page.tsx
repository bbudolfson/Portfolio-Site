import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Logixboard Outlook AI Email Companion",
  description: "Logixboard Outlook AI Email Companion case study.",
};

const clockworkDescription =
  "The Logixboard Outlook Email Companion is an AI powered inbox tool that connects a logistics industry software standard, Cargowise, to the operations team’s inbox. The companion parses email data and attached documents to guide users into needed actions such as updating shipment data, providing shipment status updates or creating necessary files to get goods through customs.";

const clockworkHighlights = [
  "Bringing Net New Product to Market",
  "Customer Discovery Interviews",
  "Customer Shadow Sessions",
  "Design System Foundations",
  "Rapid AI Prototyping",
  "Design Validation Sessions",
];

export default function ClockworkProjectPage() {
  return (
    <main className="container pageShell">
      <SiteHeader active="projects" />

      <Link className="projectsBackLink" href="/projects">
        ← All projects
      </Link>

      <section className="projectsPage">
        <figure className="projectsHeroFigure">
          <div className="projectsHeroFrame">
            <img
              src="/images/projects/clockwork-shipment-ui.png?v=2"
              width={329}
              height={930}
              alt="Clockwork shipment add-in: in-transit shipment overview, details, route timeline, and collapsible sections."
              className="projectsHeroImage"
              decoding="async"
              loading="eager"
            />
          </div>
        </figure>

        <div className="projectsHeroCopy">
          <h1 className="projectsFeaturedTitle">Logixboard Outlook Email AI Companion &lsquo;Clockwork&rsquo;</h1>
          <p className="projectsFeaturedBody">{clockworkDescription}</p>
          <h4 className="projectsHighlightsTitle">Highlights</h4>
          <div className="projectsHeroHighlights">
            <ul className="processPointsList projectsHighlightsList">
              {clockworkHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
