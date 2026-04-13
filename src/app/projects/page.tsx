import { SiteHeader } from "../../components/SiteHeader";

import { ProjectsIndexGrid } from "./ProjectsIndexGrid";

const logixboardCaseStudyDeckUrl =
  "https://www.figma.com/deck/wWZslVk5spQ6jFzsxUTet4/Clockwork-Case-Study?node-id=1-82&viewport=-16189%2C-745%2C0.53&t=XwtkhXHHlwRUHwtA-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1";

type WorkSampleColumn = {
  id: string;
  title: string | null;
  items: string[];
};

const workSampleColumns: WorkSampleColumn[] = [
  {
    id: "logixboard",
    title: "Logixboard",
    items: [
      "Core Product Work",
      "Design Systems",
      "Analytics Vision",
      "AI Email Agent",
      "Tariff Calculator",
      "File Creation Flows",
    ],
  },
  {
    id: "shipwell",
    title: "Shipwell",
    items: ["Core Product Work", "Design Systems", "Architecture", "Automation", "Table Redesign"],
  },
  {
    id: "spreadfast",
    title: "Spredfast",
    items: ["Analytics Product", "Design Systems", "Dashboard Design", "Chart Design"],
  },
  {
    id: "agency",
    title: "Agency",
    items: [
      "1800CONTACTS",
      "BSX Athletics",
      "Cisco",
      "Cigna",
      "Google",
      "Honeywell",
      "NOV",
    ],
  },
  {
    id: "agency-continued-1",
    title: null,
    items: [
      "Estée Lauder",
      "General Motors",
      "Provide Commerce",
      "Quirky",
      "Tour de France",
      "Under Armour",
      "Xerox",
    ],
  },
  {
    id: "agency-continued-2",
    title: null,
    items: [
      "Blinds.com",
      "Verizon",
      "Zynga",
    ],
  },
];

const workSamplesMobileLeftIds = ["logixboard", "spreadfast", "shipwell"] as const;

const workSamplesMobileLeft = workSamplesMobileLeftIds.map((id) => {
  const col = workSampleColumns.find((c) => c.id === id);
  if (!col) throw new Error(`Missing work sample column: ${id}`);
  return col;
});

const agencyClientsMerged = workSampleColumns
  .filter((c) => c.id === "agency" || c.id.startsWith("agency-"))
  .flatMap((c) => c.items);

export default function ProjectsPage() {
  return (
    <main className="container pageShell">
      <SiteHeader active="projects" />

      <section className="projectsCaseStudyBanner" aria-label="Logixboard case study">
        <a
          href={logixboardCaseStudyDeckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="projectsCaseStudyBannerLink"
          aria-label="View Logixboard case study (opens Figma deck in a new tab)"
        >
          <img
            src="/images/projects/logixboard-case-study-banner.png?v=4"
            alt="Logixboard case study banner: logistics portal mockups and View case study call to action."
            width={2498}
            height={1188}
            className="projectsCaseStudyBannerImage"
            decoding="async"
            fetchPriority="high"
          />
        </a>
      </section>

      <h1 className="projectsIndexHeading">Sample Project Work</h1>

      <p className="projectsIntroLarge">
        As an in-house SaaS designer for the past decade, much of my work is under NDA or would greatly benefit from
        further context. I would be happy to talk through in person &mdash;{" "}
        <a className="projectsIntroLink" href="mailto:bbudolf@gmail.com">
          just reach out
        </a>
        . Below is a snapshot of the various types of projects and customers I&apos;ve worked on and collaborated with over
        my career.
      </p>

      <ProjectsIndexGrid />

      <div className="projectsWorkSamplesBleed surfacePrimaryFullBleed">
        <div className="projectsSectionBottom">
          <div className="projectsWorkSamples">
            <h2>Full Project Experience</h2>
          </div>

          <section className="projectsExperience" aria-label="Examples of projects and customers">
            <div className="projectsWorkSamplesGrid--desktop">
              {workSampleColumns.map((col) => (
                <div
                  key={col.id}
                  className={`projectsQuadCol${col.title ? "" : " projectsQuadCol--continued"}`}
                >
                  {col.title ? <h4 className="projectsQuadHeading">{col.title}</h4> : null}
                  <ul
                    className="projectsQuadList"
                    {...(col.title ? {} : { "aria-label": "Agency clients continued" })}
                  >
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="projectsWorkSamplesGridMobile">
              <div className="projectsWorkSamplesMobileLeft">
                {workSamplesMobileLeft.map((col) => (
                  <div key={col.id} className="projectsQuadCol">
                    <h4 className="projectsQuadHeading">{col.title}</h4>
                    <ul className="projectsQuadList">
                      {col.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="projectsWorkSamplesMobileRight">
                <div className="projectsQuadCol">
                  <h4 className="projectsQuadHeading">Agency</h4>
                  <ul className="projectsQuadList" aria-label="Agency clients">
                    {agencyClientsMerged.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
