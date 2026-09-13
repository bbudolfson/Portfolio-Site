"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";

import { ProjectImage } from "../../components/ProjectImage";
import { projectTileHoverPlaceholder, projectTiles, type ProjectTile } from "./projectTiles";

function TileFigure({
  tile,
  priority,
  overviewOpen,
  overviewId,
}: {
  tile: ProjectTile;
  priority?: boolean;
  overviewOpen: boolean;
  overviewId: string;
}) {
  const blurb = tile.hoverBlurb ?? projectTileHoverPlaceholder;
  const image = (
    <ProjectImage
      src={tile.imageSrc}
      alt={tile.imageAlt}
      className="projectsTileImage"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );

  return (
    <div
      className={`projectsTileFigure projectsTileFigure--image${tile.imageBleedBottom ? " projectsTileFigure--imageBleedBottom" : ""}`}
    >
      {tile.href ? (
        <Link href={tile.href} className="projectsTileLink projectsTileImageLink" tabIndex={overviewOpen ? -1 : undefined}>
          {image}
        </Link>
      ) : (
        <div className="projectsTileStatic projectsTileImageLink">{image}</div>
      )}
      {overviewOpen ? (
        <div
          id={overviewId}
          className="projectsTileOverlay"
          role="region"
          aria-label={`${tile.label} overview`}
        >
          <div className="projectsTileOverlayContent">
            <h3 className="projectsTileOverlayHeading">Overview</h3>
            <p className="projectsTileOverlayText">{blurb}</p>
            {tile.role ? (
              <div className="projectsTileRole">
                <h3 className="projectsTileOverlayHeading">Role</h3>
                <ul className="projectsTileOverlayPills">
                  <li className="projectsTileOverlayPill">{tile.role}</li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ProjectsIndexGrid() {
  const [openTileId, setOpenTileId] = useState<string | null>(null);
  const baseId = useId();

  const closeOverview = useCallback(() => setOpenTileId(null), []);

  useEffect(() => {
    if (!openTileId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverview();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        closeOverview();
        return;
      }
      // Overview buttons handle their own open/close/switch.
      if (target.closest(".projectsTileOverviewBtn")) return;
      closeOverview();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openTileId, closeOverview]);

  return (
    <ul className="projectsIndexGrid">
      {projectTiles.map((tile, index) => {
        const spanClass =
          tile.colSpan === 12
            ? " projectsIndexTile--span12"
            : tile.colSpan === 6
              ? " projectsIndexTile--span6"
              : " projectsIndexTile--span4";
        const tileClassName = `projectsIndexTile${spanClass}${tile.startAtColumnOne ? " projectsIndexTile--start1" : ""}${tile.id === "i-mutualmobile" ? " projectsIndexTile--mutualmobile" : ""}`;
        const overviewId = `${baseId}-${tile.id}-overview`;
        const overviewOpen = openTileId === tile.id;
        const label = <span className="projectsTileLabel">{tile.label}</span>;

        return (
          <li key={tile.id} className={tileClassName}>
            <div className="projectsTileCardShell">
              <TileFigure
                tile={tile}
                priority={index === 0}
                overviewOpen={overviewOpen}
                overviewId={overviewId}
              />
              <div className="projectsTileMeta">
                {tile.href ? (
                  <Link href={tile.href} className="projectsTileLabelLink">
                    {label}
                  </Link>
                ) : (
                  label
                )}
                <button
                  type="button"
                  className="projectsTileOverviewBtn"
                  onClick={() => setOpenTileId(overviewOpen ? null : tile.id)}
                  aria-expanded={overviewOpen}
                  aria-controls={overviewId}
                >
                  Overview
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
