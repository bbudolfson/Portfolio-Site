"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

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

export function CaseStudyCarousel({ slides }: CaseStudyCarouselProps) {
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

  useEffect(() => {
    if (!emblaApi) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (slides.length === 0) {
    return <p className="caseStudyEmpty">No slides available.</p>;
  }

  return (
    <div className="caseStudyCarousel">
      <div className="caseStudyCarouselStage">
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

      <p className="caseStudyCarouselCounter" aria-live="polite">
        Slide {selectedIndex + 1} of {slides.length}
      </p>
    </div>
  );
}
