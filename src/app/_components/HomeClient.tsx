"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Slide = {
  id: string;
  label: string;
  accent: "accent" | "accent2";
};

const slides: Slide[] = [
  { id: "s1", label: "Project preview (image)", accent: "accent" },
  { id: "s2", label: "Project preview (image)", accent: "accent2" },
  { id: "s3", label: "Case study (video placeholder)", accent: "accent" },
];

function MediaCarousel() {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const selectedIndexRef = React.useRef(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const snapCount = slides.length;

  const scrollToIndex = useCallback((index: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const width = el.clientWidth || 1;
    el.scrollTo({ left: index * width, behavior: "smooth" });
  }, []);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.clientWidth || 1;
      const index = Math.round(el.scrollLeft / width);
      const clamped = Math.max(0, Math.min(snapCount - 1, index));
      setSelectedIndex(clamped);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [snapCount]);

  // Simple autoplay for the skeleton (safe to remove later).
  useEffect(() => {
    const t = setInterval(() => {
      const next = (selectedIndexRef.current + 1) % snapCount;
      scrollToIndex(next);
    }, 5200);
    return () => clearInterval(t);
  }, [scrollToIndex, snapCount]);

  const goPrev = useCallback(() => {
    const next = (selectedIndex + snapCount - 1) % snapCount;
    scrollToIndex(next);
  }, [selectedIndex, scrollToIndex, snapCount]);

  const goNext = useCallback(() => {
    const next = (selectedIndex + 1) % snapCount;
    scrollToIndex(next);
  }, [selectedIndex, scrollToIndex, snapCount]);

  return (
    <div className="mediaBlock">
      <div className="carouselHeader">
        <div>
          <h2 className="h2">Media</h2>
          <p className="muted">A carousel skeleton for images and videos.</p>
        </div>
        <div className="carouselControls">
          <button type="button" className="btn" onClick={goPrev} aria-label="Previous slide">
            Prev
          </button>
          <button type="button" className="btn" onClick={goNext} aria-label="Next slide">
            Next
          </button>
        </div>
      </div>

      <div className="carouselWrap">
        <div className="carouselViewport" ref={viewportRef}>
          <div className="carouselContainer">
            {slides.map((s, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <div className="carouselSlide" key={s.id} aria-label={s.label}>
                  <div
                    className={`slideCard ${s.accent} ${isActive ? "active" : ""}`}
                    role="img"
                    aria-label={s.label}
                  >
                    <div className="slideBadge">{idx + 1}</div>
                    <div className="slideTitle">{s.label}</div>
                    <div className="slideHint">Swap this placeholder with your assets.</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="carouselDots" aria-label="Slide position">
          {Array.from({ length: snapCount }).map((_, i) => {
            const active = i === selectedIndex;
            return <span key={i} className={`dot ${active ? "active" : ""}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = useMemo(
    () => [
      { title: "Interactive Portfolio", desc: "Animated overlays, motion-driven UI, and tokenized styling." },
      { title: "Case Study System", desc: "Reusable layout patterns for interview-ready storytelling." },
      { title: "Media Showcase", desc: "Carousels for images/videos with accessible controls and fallbacks." },
    ],
    []
  );

  return (
    <section className="section">
      <h2 className="h2">Projects</h2>
      <p className="muted">A starting set of cards (replace with your real work).</p>
      <div className="grid3">
        {projects.map((p) => (
          <article key={p.title} className="card">
            <h3 className="h3">{p.title}</h3>
            <p className="p">{p.desc}</p>
            <div className="cardFooter">
              <span className="chip">React</span>
              <span className="chip">Motion</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <>
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding: 72px 0 48px;
        }
        .heroBg {
          position: absolute;
          inset: -140px -140px auto -140px;
          height: 460px;
          background: radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.45), transparent 52%),
            radial-gradient(circle at 70% 40%, rgba(34, 197, 94, 0.32), transparent 52%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06), transparent);
          filter: blur(0.2px);
          pointer-events: none;
        }
        .heroInner {
          position: relative;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .heroInner {
            grid-template-columns: 1fr;
          }
        }
        .kicker {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          margin-bottom: 18px;
        }
        .kickerDot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--color-accent);
          box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.15);
        }
        .h1 {
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1.03;
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }
        .lead {
          font-size: 18px;
          line-height: 1.6;
          margin: 0 0 26px;
          color: var(--color-muted);
        }
        .btnRow {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 18px;
        }
        .btn {
          appearance: none;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: inherit;
          padding: 10px 14px;
          border-radius: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }
        .btn:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.22);
        }
        .heroPanel {
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 18px;
          box-shadow: var(--shadow-lg);
        }
        .heroPanelTitle {
          font-family: var(--app-font-body), var(--font-body);
          font-weight: var(--font-weight-semi-bold);
          font-size: var(--text-h3-size);
          line-height: var(--text-h3-line-height);
          color: inherit;
          margin: 0 0 10px;
        }
        .heroList {
          display: grid;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .heroListItem {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 10px 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .heroListIcon {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.35);
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }
        .section {
          padding: 48px 0;
        }
        .h2 {
          font-size: 28px;
          line-height: 1.2;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }
        .h3 {
          font-family: var(--app-font-body), var(--font-body);
          font-weight: var(--font-weight-semi-bold);
          font-size: var(--text-h3-size);
          line-height: var(--text-h3-line-height);
          color: inherit;
          margin: 0 0 8px;
        }
        .muted {
          color: var(--color-muted);
          margin: 0 0 18px;
        }
        .p {
          margin: 0;
          line-height: 1.6;
          color: var(--color-muted);
        }
        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 980px) {
          .grid3 {
            grid-template-columns: 1fr;
          }
        }
        .card {
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 16px;
          transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
        }
        .card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .cardFooter {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }
        .chip {
          font-size: 13px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.88);
        }
        .mediaBlock {
          padding: 48px 0;
        }
        .carouselHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 18px;
        }
        @media (max-width: 900px) {
          .carouselHeader {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .carouselControls {
          display: flex;
          gap: 10px;
        }
        .carouselWrap {
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px;
        }
        .carouselViewport {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none; /* Firefox */
        }
        .carouselViewport::-webkit-scrollbar {
          display: none; /* WebKit */
        }
        .carouselContainer {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          margin: 0;
        }
        .carouselSlide {
          position: relative;
          min-width: 100%;
          padding: 6px;
          scroll-snap-align: start;
        }
        .slideCard {
          min-height: 260px;
          border-radius: calc(var(--radius-lg) - 6px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.02)
          );
          display: grid;
          align-items: start;
          padding: 18px;
          gap: 10px;
          transition: transform 220ms ease, border-color 220ms ease;
          transform: scale(0.985);
        }
        .slideCard.accent {
          box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.2), 0 24px 70px rgba(124, 58, 237, 0.18);
        }
        .slideCard.accent2 {
          box-shadow: 0 0 0 1px rgba(34, 197, 94, 0.2), 0 24px 70px rgba(34, 197, 94, 0.12);
        }
        .slideCard.active {
          transform: scale(1);
          border-color: rgba(255, 255, 255, 0.22);
        }
        .slideBadge {
          width: 44px;
          height: 44px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-weight: 900;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .slideTitle {
          font-weight: 900;
          letter-spacing: -0.01em;
          font-size: 22px;
        }
        .slideHint {
          color: var(--color-muted);
          line-height: 1.6;
        }
        .carouselDots {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 14px 0 2px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }
        .dot.active {
          width: 22px;
          background: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.55);
        }
      `}</style>

      <main>
        <section className="hero">
          <div className="heroBg" />
          <div className="container heroInner">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="kicker">
                  <span className="kickerDot" />
                  <span style={{ fontWeight: 700 }}>Interview-ready portfolio</span>
                </div>
                <h1 className="h1">Motion, overlays, and clean stories for hiring teams.</h1>
                <p className="lead">
                  This is a starting point built to let you swap in your real projects, media, and Figma-based
                  tokens. Replace the placeholders and deploy to Netlify when ready.
                </p>
                <div className="btnRow">
                  <a className="btn" href="#projects">
                    View Projects
                  </a>
                  <a className="btn" href="#media">
                    View Media
                  </a>
                  <a className="btn" href="/interaction-rules">
                    Interaction Rules
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
              className="heroPanel"
            >
              <h3 className="heroPanelTitle">What this template includes</h3>
              <ul className="heroList">
                <li className="heroListItem">
                  <span className="heroListIcon">✓</span>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>Static-friendly</div>
                    <div className="p">Deploys to Netlify via `out/` with no git required.</div>
                  </div>
                </li>
                <li className="heroListItem">
                  <span className="heroListIcon" style={{ background: "rgba(34,197,94,0.22)", borderColor: "rgba(34,197,94,0.34)" }}>
                    ✓
                  </span>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>Tokenized styling</div>
                    <div className="p">Swap colors/radii/shadows by editing `figma-tokens.json`.</div>
                  </div>
                </li>
                <li className="heroListItem">
                  <span className="heroListIcon" style={{ background: "rgba(124,58,237,0.18)", borderColor: "rgba(124,58,237,0.35)" }}>
                    ✓
                  </span>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>Media carousel</div>
                    <div className="p">Placeholder slides ready for your images/videos.</div>
                  </div>
                </li>
              </ul>
            </motion.aside>
          </div>
        </section>

        <div className="container">
          <div id="projects" />
          <ProjectsSection />
        </div>

        <div id="media" />
        <MediaCarousel />
      </main>

      <footer className="container" style={{ paddingBottom: 48 }}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: 22,
            color: "var(--color-muted)",
            lineHeight: 1.6,
          }}
        >
          Built for interview week. Replace placeholders with your real work and deploy to Netlify.
        </div>
      </footer>
    </>
  );
}

