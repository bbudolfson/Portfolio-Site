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

function spanClassFor(tile: ProjectTile) {
  return tile.colSpan === 12
    ? " projectsIndexTile--span12"
    : tile.colSpan === 6
      ? " projectsIndexTile--span6"
      : tile.colSpan === 4
        ? " projectsIndexTile--span4"
        : " projectsIndexTile--span3";
}

export function ProjectsIndexGrid() {
  const mainTiles = projectTiles.filter((tile) => !tile.tileColor);
  const otherTiles = projectTiles.filter((tile) => tile.tileColor);

  return (
    <>
      <ul className="projectsIndexGrid">
        {mainTiles.map((tile, index) => {
          const tileClassName = `projectsIndexTile${spanClassFor(tile)}${tile.startAtColumnOne ? " projectsIndexTile--start1" : ""}`;
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

      {otherTiles.length > 0 ? (
        <div className="projectsOtherSection">
          <h2 className="projectsOtherHeading">Other Projects</h2>
          <ul className="projectsOtherGrid">
            {otherTiles.map((tile) => {
              const tileClassName = `projectsIndexTile${spanClassFor(tile)}`;
              const blurb = tile.hoverBlurb ?? projectTileHoverPlaceholder;

              return (
                <li key={tile.id} className={tileClassName}>
                  <div className="projectsColorTile" style={{ backgroundColor: tile.tileColor }}>
                    <span className="projectsTileLabel">{tile.label}</span>
                    <p className="projectsTileOverviewText">{blurb}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
