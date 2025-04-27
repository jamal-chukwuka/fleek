// src/features/buyer/components/Slider.tsx
import React, { FC, useRef, useState, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  items: React.ReactNode[];
}

const Slider: FC<SliderProps> = ({ items }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // On mount and on resize, update arrow visibility
  useLayoutEffect(() => {
    const el = sliderRef.current!;
    const updateArrows = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };
    updateArrows();
    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const scrollLeft = () => {
    const el = sliderRef.current!;
    const step = el.clientWidth; // one “page”
    el.scrollBy({ left: -step, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const el = sliderRef.current!;
    const step = el.clientWidth;
    el.scrollBy({ left: +step, behavior: 'smooth' });
  };

  return (
    <div className="slider-container">
      {canScrollLeft && (
        <button
          className="slider-arrow left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div className="slider" ref={sliderRef}>
        {items.map((child, i) => (
          <div className="slider-item" key={i}>
            {child}
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          className="slider-arrow right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Slider;
