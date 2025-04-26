// src/features/buyer/components/ScrollCarousel.tsx
import React, { FC, useRef, useState, useEffect, TouchEvent, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollCarouselProps {
  children: ReactNode[];
}

const ScrollCarousel: FC<ScrollCarouselProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update arrow visibility
  const updateArrows = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  // On mount and on scroll/resize
  useEffect(() => {
    updateArrows();
    const el = containerRef.current;
    el?.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  // Arrow clicks scroll by 80% width
  const scrollByPage = (dir: -1 | 1) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  // Swipe support
  let startX = 0;
  const onTouchStart = (e: TouchEvent)   => startX = e.touches[0].clientX;
  const onTouchEnd   = (e: TouchEvent)   => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) scrollByPage(-1);
    if (dx < -50) scrollByPage(1);
  };

  return (
    <div className="carousel-wrapper">
      {canScrollLeft && (
        <button
          className="carousel-arrow left"
          onClick={() => scrollByPage(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
      )}

      <div
        ref={containerRef}
        className="scroll-row"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          className="carousel-arrow right"
          onClick={() => scrollByPage(1)}
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default ScrollCarousel;
