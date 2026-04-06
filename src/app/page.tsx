import { CapabilitySection } from "../components/CapabilitySection";
import { SiteHeader } from "../components/SiteHeader";

const capabilities = [
  {
    title: "Research",
    body: "Good design starts with genuine curiosity about the people using it. I run customer interviews, gather stakeholder perspectives, and create journey maps that help uncover the friction points and opportunities to focus on. Where it makes sense, I use AI for a base level of knowledge, role play scenarios, and assisted synthesis of notes to pressure-test assumptions early, so the team aligns on the real problem before committing to a direction.",
    processPoints: [
      "Customer & stakeholder interviews",
      "Journey mapping & review sessions",
      "AI-assisted research synthesis",
      "AI role play for empathy and learning",
    ],
  },
  {
    title: "Craft",
    body: "Craft is what separates something that works from something people love. I care deeply about the interaction details — the flows, the states, the moments of friction that most teams deprioritize until they ship and hear about it from users. I care about the leading, the tracking, the rag. Sketching is thinking for me. I explore in low fidelity before committing, which means fewer wrong turns and more time on what matters.",
    processPoints: [
      "Sketching is thinking",
      "Typography matters",
      "Explore the details",
      "Design critiques",
    ],
  },
  {
    title: "Systems",
    body: "Design systems are living, and only useful if they're set up in a way that can be scaled and shared between design and development. I build the foundations — variables, tokens, components, rules — in a way that fits how people work, not just how it lives in the design software. The pace of AI requires structure to ensure consistency and polish as teams are empowered to move faster and autonomously.",
    processPoints: [
      "Design token & variable systems",
      "Rule definition & documentation",
      "Component library setup",
      "Tooling & AI landscape guidance",
    ],
  },
  {
    title: "Leadership",
    body: "Design doesn't happen in isolation. I work with teams on the culture and fluency that makes good design possible — through mentorship, critique culture, and design education that meets people where they are. Whether you're a founding team figuring out how design fits, or an established team looking to level up, I can help build the habits and shared language that stick.",
    processPoints: [
      "Design mentorship",
      "Continued education",
      "Growth culture",
    ],
  },
];

const logos = [
  "1800contacts",
  "gm",
  "logixboard",
  "scotts",
  "honeywell",
  "under-armour",
  "cisco",
  "shipwell",
  "cigna",
  "google",
  "khoros",
];

const compactClientLogos = new Set(["1800contacts", "logixboard"]);

export default function Page() {
  return (
    <main className="container pageShell">
      <SiteHeader active="profile" />

      <section className="profileGrid">
        <h1 className="heroTitle">
          Product designer &amp; director with deep experience in team development and B2B SaaS for
          enterprise companies. Persistent advocate of targeted, elegant solutions across complex
          systems that alleviate friction, uncover efficiencies, and create value and delight for
          their users and tech squads alike. Proponent of responsible AI.
        </h1>

        <div className="profilePhotoColumn">
          <figure className="profileImageWrap">
            <img
              src="/images/profile/brent-profile.png?v=1"
              alt="Brent Budolfson"
              className="profileImage"
            />
          </figure>
        </div>

        <div className="capabilitiesColumn">
          {capabilities.map((item) => (
            <CapabilitySection key={item.title} title={item.title} body={item.body} processPoints={item.processPoints} />
          ))}
        </div>

        <div id="profile-client-logos" className="profileLogosBleed surfacePrimaryFullBleed">
          <section className="logoGrid" aria-label="Client logos">
            <div className="logoGridRows">
              <div className="logoGridRow logoGridRow--5">
                {logos.slice(0, 5).map((logo) => (
                  <img
                    key={logo}
                    src={`/logos/clients/${logo}.svg`}
                    alt={`${logo} logo`}
                    className={`clientLogo${compactClientLogos.has(logo) ? " clientLogo--compact" : ""}`}
                  />
                ))}
              </div>
              <div className="logoGridRow logoGridRow--6">
                {logos.slice(5).map((logo) => (
                  <img
                    key={logo}
                    src={`/logos/clients/${logo}.svg`}
                    alt={`${logo} logo`}
                    className={`clientLogo${compactClientLogos.has(logo) ? " clientLogo--compact" : ""}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

