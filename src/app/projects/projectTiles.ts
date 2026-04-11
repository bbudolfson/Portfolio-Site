/** Placeholder until real case-study blurbs are wired up. */
export const projectTileHoverPlaceholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";

export type ProjectTile = {
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

export const projectTiles: ProjectTile[] = [
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
      "At Logixboard, I was brought in to champion the design team and elevate product consistency through a refined design system. Leveraging MUI as a foundation, I partnered with design and engineering to build a scalable system adopted across the entire product.",
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
