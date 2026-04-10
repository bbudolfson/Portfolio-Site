import Link from "next/link";

import { SiteHeader } from "../../components/SiteHeader";

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

/** Placeholder until real case-study blurbs are wired up. */
const projectTileHoverPlaceholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";

type ProjectTile = {
  id: string;
  href: string | null;
  label: string;
  pills?: string[];
  imageSrc: string;
  imageAlt: string;
  /** Shown on hover over the image area; defaults to placeholder copy. */
  hoverBlurb?: string;
  /** Column span in the 12-column project wall. */
  colSpan: 4 | 6 | 12;
  /** Force tile to start at column 1 on a new row. */
  startAtColumnOne?: boolean;
  /** Crop: image extends past the bottom of the tile (overflow hidden). */
  imageBleedBottom?: boolean;
};

const projectTiles: ProjectTile[] = [
  {
    id: "logixboard-customer-experience-portal",
    href: null,
    label: "Logixboard Customer Experience Portal",
    pills: [
      "SaaS Design",
      "Enterprise UX",
      "Design Systems",
      "Data Visualization",
      "White Label",
    ],
    imageSrc: "/images/projects/logixboard-customer-experience-portal.png?v=1",
    imageAlt: "Logixboard Customer Experience Portal.",
    colSpan: 12,
    hoverBlurb:
      "A white-labeled portal giving freight forwarders the ability to provide their customers with shipment and order visibility, analytics, and communication across the lifecycle of a job.",
  },
  {
    id: "clockwork",
    href: null,
    label: "Logixboard Outlook AI Email Companion",
    pills: [
      "Design Systems",
      "User Research",
      "Journey Mapping",
      "AI Prototyping",
      "Enterprise UX",
    ],
    imageSrc: "/images/projects/clockwork-shipment-ui.png?v=11",
    imageAlt: "Logixboard Outlook AI Email Companion.",
    colSpan: 12,
    hoverBlurb:
      "An AI-powered email tool built for freight forwarder operations teams, reducing the overhead of customer communications and eliminating the constant back-and-forth between email and logistics software.",
  },
  {
    id: "logixboard-design-system",
    href: null,
    label: "Logixboard Design System",
    pills: ["Design systems", "Design leadership"],
    imageSrc: "/images/projects/logixboard-design-system.png?v=8",
    imageAlt: "Logixboard Design System.",
    colSpan: 12,
    hoverBlurb:
      "My role at Logixboard was to design, refine, and guide the functionality of the core product (the customer experience portal) while bringing a new product to market (shown later). I was brought on to be a champion for the design team and elevate the product consistency by refining the design system.",
  },
  {
    id: "logixboard-cx-analytics-vision",
    href: null,
    label: "Logixboard Customer Experience Analytics Design Vision",
    pills: [
      "Design Vision",
      "Stakeholder Presentations",
      "Data Visualization",
      "Enterprise UX",
      "Design Systems",
    ],
    imageSrc: "/images/projects/logixboard-cx-analytics-vision.png?v=4",
    imageAlt: "Logixboard Customer Experience Analytics Design Vision.",
    colSpan: 12,
    hoverBlurb:
      "Defining the design direction for a full redesign of the Logixboard Customer Experience Analytics product. Inspiration was gathered and refined into two distinct directions presented to stakeholders. The final execution took a more restrained approach - steering away from gradients and glows in favor of something that felt more at home with an enterprise audience and cohesive within the broader product.",
  },
  {
    id: "bsx",
    href: null,
    label: "BSX Endurance Tracker",
    pills: [
      "Wearable UX",
      "Hardware + Software",
      "Data Visualization",
      "User Testing",
      "New Product Launch",
    ],
    imageSrc: "/images/projects/bsx-pair.png?v=3",
    imageAlt: "BSX Endurance Tracker.",
    colSpan: 12,
    hoverBlurb:
      "A connected wearable and companion app for endurance athletes focused on measuring and improving VO2 Max, with guided testing protocols and a workout tracker that feeds into a desktop analytics platform.",
  },
  {
    id: "design-principles-skills-career-matrix",
    href: null,
    label: "Company Design Principles, Team Skills Assessment & Career Matrix Development",
    pills: [
      "Design Leadership",
      "Team Development",
      "Career Frameworks",
      "Workshop Facilitation",
      "Org Design",
    ],
    imageSrc: "/images/projects/design-principles-skills-career-matrix.png?v=1",
    imageAlt: "Company design principles, team skills assessment, and career matrix development.",
    colSpan: 12,
    hoverBlurb:
      "Defining guiding design principles to anchor decisions and drive alignment, assessing team strengths to understand the balance of skills and identify areas to grow or hire toward, and building a career ladder matrix to bring structure and clarity to employee growth conversations.",
  },
  {
    id: "under-armour",
    href: null,
    label: "Under Armour Sales Associate Application",
    pills: [
      "Internal Tooling",
      "Mobile Design",
      "Retail UX",
      "Real-Time Systems",
      "Stakeholder Collaboration",
    ],
    imageSrc: "/images/projects/under-armour.png?v=5",
    imageAlt: "Under Armour Sales Associate Application.",
    colSpan: 12,
    hoverBlurb:
      "An internal mobile tool that empowers Under Armour store associates to engage customers on the sales floor, check live inventory, and place orders in real time - without stepping away.",
  },
  {
    id: "spreadfast",
    href: null,
    label: "Spredfast Analytics Dashboard",
    pills: [
      "Data Visualization",
      "Dashboard Design",
      "Enterprise UX",
      "Design Systems",
      "Social Media",
    ],
    imageSrc: "/images/projects/spreadfast-analytics.png?v=4",
    imageAlt: "Spredfast Analytics Dashboard.",
    colSpan: 6,
    hoverBlurb:
      "An enterprise reporting tool for social media marketers to track, measure, and analyze campaign performance across multiple social channels from a single dashboard.",
  },
  {
    id: "beam",
    href: null,
    label: "Beam Connect Home App",
    pills: [
      "Mobile Design",
      "IoT UX",
      "Information Architecture",
      "Cross-Platform Design",
      "New Product Launch",
    ],
    imageSrc: "/images/projects/beam.png?v=2",
    imageAlt: "Beam Connect Home App.",
    colSpan: 6,
    hoverBlurb:
      "A mobile app built at the dawn of the connected home movement, giving users one place to control a wide range of smart devices - lights, outlets, and thermostats - regardless of manufacturer.",
  },
  {
    id: "general-motors",
    href: null,
    label: "General Motors Augmented Reality Manual",
    pills: [
      "AR/XR",
      "Emerging Tech",
      "Prototyping",
      "User Research",
      "New Product Launch",
    ],
    imageSrc: "/images/projects/general-motors.png?v=5",
    imageAlt: "General Motors Augmented Reality Manual.",
    colSpan: 12,
    hoverBlurb:
      "An early-stage AR concept that uses the phone's camera to overlay step-by-step instructions for routine vehicle maintenance tasks like jumping a battery or changing a tire.",
  },
  {
    id: "cigna",
    href: null,
    label: "Cigna Insurance Mobile Wallet",
    pills: [
      "Mobile Design",
      "Healthcare UX",
      "Information Architecture",
      "Design Systems",
      "User Research",
    ],
    imageSrc: "/images/projects/cigna-dashboard.png?v=3",
    imageAlt: "Cigna Insurance Mobile Wallet.",
    colSpan: 6,
    hoverBlurb:
      "An all-in-one insurance app that helps members stay on top of deductibles, manage their HSA, access digital insurance cards, and find in-network providers - all from their phone.",
  },
  {
    id: "scotts",
    href: null,
    label: "Scotts Mobile Gardening Guide",
    pills: [
      "Mobile Design",
      "Content Strategy",
      "User Research",
      "Personalization",
      "Marketing UX",
    ],
    imageSrc: "/images/projects/scotts-gallery.png?v=3",
    imageAlt: "Scotts Mobile Gardening Guide.",
    colSpan: 6,
    hoverBlurb:
      "A marketing initiative from Scotts designed to bring younger audiences into gardening through personalized how-to content and themed garden ideas tailored to the user's growing location.",
  },
  {
    id: "i-mutualmobile",
    href: null,
    label: "Mutual Mobile Internal Allocation Tool",
    pills: [
      "Internal Tooling",
      "Enterprise UX",
      "Information Architecture",
      "Stakeholder Collaboration",
      "New Product Launch",
    ],
    imageSrc: "/images/projects/i-mutualmobile-final.png",
    imageAlt: "Mutual Mobile Internal Allocation Tool.",
    colSpan: 12,
    startAtColumnOne: true,
    hoverBlurb:
      "An internal resource and budget management tool built for digital agencies, bringing visibility and control to project-by-project planning, employee allocation, and budget tracking.",
  },
];

function TileFigure({ tile }: { tile: ProjectTile }) {
  const blurb = tile.hoverBlurb ?? projectTileHoverPlaceholder;
  return (
    <div
      className={`projectsTileFigure projectsTileFigure--image${tile.imageBleedBottom ? " projectsTileFigure--imageBleedBottom" : ""}`}
    >
      <img src={tile.imageSrc} alt={tile.imageAlt} className="projectsTileImage" loading="lazy" />
      <div className="projectsTileOverlay" aria-hidden="true">
        <h3 className="projectsTileOverlayHeading">Overview</h3>
        <p className="projectsTileOverlayText">{blurb}</p>
        {tile.pills?.length ? (
          <ul className="projectsTileOverlayPills">
            {tile.pills.map((pill) => (
              <li key={pill} className="projectsTileOverlayPill">
                {pill}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="container pageShell">
      <SiteHeader active="projects" />

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

      <ul className="projectsIndexGrid">
        {projectTiles.map((tile) => {
          const spanClass =
            tile.colSpan === 12 ? " projectsIndexTile--span12" : tile.colSpan === 6 ? " projectsIndexTile--span6" : " projectsIndexTile--span4";
          const tileClassName = `projectsIndexTile${spanClass}${tile.startAtColumnOne ? " projectsIndexTile--start1" : ""}${tile.id === "i-mutualmobile" ? " projectsIndexTile--mutualmobile" : ""}`;
          const label = <span className="projectsTileLabel">{tile.label}</span>;

          if (tile.href) {
            return (
              <li key={tile.id} className={tileClassName}>
                <Link href={tile.href} className="projectsTileLink">
                  <TileFigure tile={tile} />
                  {label}
                </Link>
              </li>
            );
          }

          return (
            <li key={tile.id} className={tileClassName}>
              <div className="projectsTileStatic">
                <TileFigure tile={tile} />
                {label}
              </div>
            </li>
          );
        })}
      </ul>

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
