"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent } from "react";

export type CaseStudySlide = {
  src: string;
  alt: string;
};

type CaseStudyCarouselProps = {
  slides: CaseStudySlide[];
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="caseStudyCarouselChevron"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {direction === "left" ? (
        <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      ) : (
        <path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      )}
    </svg>
  );
}

function FullscreenIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className="caseStudyCarouselFullscreenIcon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {expanded ? (
        <path
          fill="currentColor"
          d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
        />
      )}
    </svg>
  );
}

export function CaseStudyCarousel({ slides }: CaseStudyCarouselProps) {
  const sectionId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
    }
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    if (!emblaApi || !isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      } else if (e.key === "Escape" && isFullscreen) {
        e.preventDefault();
        void exitFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi, isActive, isFullscreen, exitFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const root = sectionRef.current;
      if (!root) return;
      setIsFullscreen(document.fullscreenElement === root);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!sectionRef.current?.contains(e.relatedTarget as Node | null)) {
      setIsActive(false);
    }
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollToStart = useCallback(() => emblaApi?.scrollTo(0), [emblaApi]);

  const toggleFullscreen = useCallback(async () => {
    const root = sectionRef.current;
    if (!root) return;

    if (isFullscreen) {
      await exitFullscreen();
      return;
    }

    if (root.requestFullscreen) {
      try {
        await root.requestFullscreen();
        setIsFullscreen(true);
        return;
      } catch {
        // Fall through to overlay mode (common on iOS).
      }
    }

    setIsFullscreen(true);
  }, [exitFullscreen, isFullscreen]);

  if (slides.length === 0) {
    return <p className="caseStudyEmpty">No slides available.</p>;
  }

  const stageClassName = "caseStudyCarouselStage";

  return (
    <div
      ref={sectionRef}
      className={`caseStudyCarousel${isFullscreen ? " caseStudyCarousel--fullscreen" : ""}`}
      id={sectionId}
      onMouseEnter={activate}
      onMouseLeave={() => setIsActive(false)}
      onFocus={activate}
      onBlur={deactivate}
    >
      <div className={stageClassName}>
        <button
          type="button"
          className="caseStudyCarouselNav caseStudyCarouselNav--prev"
          onClick={scrollPrev}
          disabled={selectedIndex === 0}
          aria-label="Previous slide"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="caseStudyCarouselViewport" ref={emblaRef}>
          <div className="caseStudyCarouselContainer">
            {slides.map((slide, index) => {
              const shouldLoad = Math.abs(index - selectedIndex) <= 2 || index < 2;
              return (
                <div className="caseStudyCarouselSlide" key={slide.src}>
                  {shouldLoad ? (
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="caseStudyCarouselImage"
                      loading={index <= 1 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <div className="caseStudyCarouselPlaceholder" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="caseStudyCarouselNav caseStudyCarouselNav--next"
          onClick={scrollNext}
          disabled={selectedIndex === slides.length - 1}
          aria-label="Next slide"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="caseStudyCarouselFooter">
        <p className="caseStudyCarouselCounter" aria-live="polite">
          Slide {selectedIndex + 1} of {slides.length}
        </p>
        <div className="caseStudyCarouselFooterActions">
          <button
            type="button"
            className="caseStudyCarouselTextBtn"
            onClick={scrollToStart}
            disabled={selectedIndex === 0}
          >
            Reset
          </button>
          <button
            type="button"
            className="caseStudyCarouselTextBtn caseStudyCarouselTextBtn--icon"
            onClick={() => void toggleFullscreen()}
            aria-pressed={isFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <FullscreenIcon expanded={isFullscreen} />
            <span>{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
