import Link from "next/link";

import { ProjectImage } from "../../components/ProjectImage";
import { projectTileHoverPlaceholder, projectTiles, type ProjectTile } from "./projectTiles";

function TileFigure({ tile, priority }: { tile: ProjectTile; priority?: boolean }) {
  const image = tile.comingSoon ? (
    <div className="projectsTileComingSoon" role="img" aria-label={tile.imageAlt}>
      <span className="projectsTileComingSoonText">Coming soon</span>
    </div>
  ) : (
    <ProjectImage
      src={tile.imageSrc ?? ""}
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
        <Link href={tile.href} className="projectsTileLink projectsTileImageLink">
          {image}
        </Link>
      ) : (
        <div className="projectsTileStatic projectsTileImageLink">{image}</div>
      )}
    </div>
  );
}

export function ProjectsIndexGrid() {
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
        const blurb = tile.hoverBlurb ?? projectTileHoverPlaceholder;
        const label = <span className="projectsTileLabel">{tile.label}</span>;

        return (
          <li key={tile.id} className={tileClassName}>
            <div className="projectsTileCardShell">
              <TileFigure tile={tile} priority={index === 0} />
              <div className="projectsTileMeta">
                {tile.href ? (
                  <Link href={tile.href} className="projectsTileLabelLink">
                    {label}
                  </Link>
                ) : (
                  label
                )}
                <p className="projectsTileOverviewText">{blurb}</p>
                {tile.role ? (
                  <ul className="projectsTileOverviewPills">
                    <li className="projectsTileOverviewPill">{tile.role}</li>
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
