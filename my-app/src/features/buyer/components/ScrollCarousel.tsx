// src/features/buyer/components/ScrollCarousel.tsx
import React, { FC, useRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollCarouselProps {
  children: ReactNode[];
}

const ScrollCarousel: FC<ScrollCarouselProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const el = containerRef.current;
    if (!el) return;
    // scroll by half of the visible width
    const distance = (el.offsetWidth / 2) * direction;
    el.scrollTo({
      left: el.scrollLeft + distance,
      behavior: 'smooth',
    });
  };

  return (
    <div className="carousel-wrapper">
      <button
        className="carousel-arrow left"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>

      <div ref={containerRef} className="scroll-row">
        {children}
      </div>

      <button
        className="carousel-arrow right"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ScrollCarousel;
