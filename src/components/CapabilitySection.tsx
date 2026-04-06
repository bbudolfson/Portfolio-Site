"use client";

import { useId, useState } from "react";

export type CapabilityItem = {
  title: string;
  body: string;
  processPoints: string[];
};

export function CapabilitySection({ title, body, processPoints }: CapabilityItem) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <article className="capability">
      <h2 className="capabilityTitle">{title}</h2>
      <p className="capabilityBody">{body}</p>
      <button
        type="button"
        className="processPointsCta"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
      >
        <span className="processPointsCtaIcon" aria-hidden="true">
          {open ? "\u2212" : "+"}
        </span>
        {open ? "Hide Process Points" : "Show Process Points"}
      </button>
      {open ? (
        <ul id={listId} className="processPointsList">
          {processPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
