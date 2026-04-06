import fs from "node:fs";
import path from "node:path";

import ReactMarkdown from "react-markdown";

export default async function InteractionRulesPage() {
  const mdPath = path.join(process.cwd(), "docs", "interaction-rules.md");
  const markdown = fs.readFileSync(mdPath, "utf8");

  return (
    <main className="container" style={{ padding: "56px 0 80px" }}>
      <h1 className="h2" style={{ fontSize: 34, marginBottom: 16 }}>
        Interaction Rules
      </h1>
      <div
        style={{
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.04)",
          padding: 18,
          color: "var(--color-fg)",
        }}
      >
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </main>
  );
}

