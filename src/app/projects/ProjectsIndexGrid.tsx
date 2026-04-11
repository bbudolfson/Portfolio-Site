"use client";

import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import { projectTileHoverPlaceholder, projectTiles, type ProjectTile } from "./projectTiles";

function TileFigure({ tile }: { tile: ProjectTile }) {
  const blurb = tile.hoverBlurb ?? projectTileHoverPlaceholder;
  return (
    <div
      className={`projectsTileFigure projectsTileFigure--image${tile.imageBleedBottom ? " projectsTileFigure--imageBleedBottom" : ""}`}
    >
      <img src={tile.imageSrc} alt={tile.imageAlt} className="projectsTileImage" loading="lazy" />
      <div className="projectsTileOverlay projectsTileOverlay--desktopHover" aria-hidden="true">
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

function ProjectTileModal({
  tile,
  dialogId,
  titleId,
  onClose,
  closeRef,
}: {
  tile: ProjectTile;
  dialogId: string;
  titleId: string;
  onClose: () => void;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  const blurb = tile.hoverBlurb ?? projectTileHoverPlaceholder;
  return (
    <div className="projectsTileModalBackdrop" role="presentation" onClick={onClose}>
      <div
        id={dialogId}
        className="projectsTileModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="projectsTileModalClose"
          onClick={onClose}
          aria-label="Close overview"
        >
          <span aria-hidden="true">×</span>
        </button>
        <h2 id={titleId} className="projectsTileModalTitle">
          {tile.label}
        </h2>
        <h3 className="projectsTileModalSectionHeading">Overview</h3>
        <p className="projectsTileModalBody">{blurb}</p>
        {tile.pills?.length ? (
          <ul className="projectsTileModalPills">
            {tile.pills.map((pill) => (
              <li key={pill} className="projectsTileModalPill">
                {pill}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectsIndexGrid() {
  const [openTileId, setOpenTileId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-modal-title`;

  const closeModal = useCallback(() => setOpenTileId(null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!openTileId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [openTileId]);

  useEffect(() => {
    if (!openTileId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTileId, closeModal]);

  const openTile = openTileId ? projectTiles.find((t) => t.id === openTileId) : null;

  return (
    <>
      <ul className="projectsIndexGrid">
        {projectTiles.map((tile) => {
          const spanClass =
            tile.colSpan === 12
              ? " projectsIndexTile--span12"
              : tile.colSpan === 6
                ? " projectsIndexTile--span6"
                : " projectsIndexTile--span4";
          const tileClassName = `projectsIndexTile${spanClass}${tile.startAtColumnOne ? " projectsIndexTile--start1" : ""}${tile.id === "i-mutualmobile" ? " projectsIndexTile--mutualmobile" : ""}`;
          const label = <span className="projectsTileLabel">{tile.label}</span>;

          const body = (
            <>
              {tile.href ? (
                <Link href={tile.href} className="projectsTileLink">
                  <TileFigure tile={tile} />
                  {label}
                </Link>
              ) : (
                <div className="projectsTileStatic">
                  <TileFigure tile={tile} />
                  {label}
                </div>
              )}
              <button
                type="button"
                className="projectsTileMobileOverviewBtn"
                onClick={() => setOpenTileId(tile.id)}
                aria-haspopup="dialog"
                aria-expanded={openTileId === tile.id}
                aria-controls={`${baseId}-dialog`}
              >
                Overview
              </button>
            </>
          );

          return (
            <li key={tile.id} className={tileClassName}>
              <div className="projectsTileCardShell">{body}</div>
            </li>
          );
        })}
      </ul>
      {mounted && openTile
        ? createPortal(
            <ProjectTileModal
              tile={openTile}
              dialogId={`${baseId}-dialog`}
              titleId={titleId}
              onClose={closeModal}
              closeRef={closeBtnRef}
            />,
            document.body,
          )
        : null}
    </>
  );
}
