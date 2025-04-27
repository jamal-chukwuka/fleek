// src/features/listing/components/ImageCarousel.tsx
import React, { FC, useState, TouchEvent } from 'react';

interface ImageCarouselProps {
  images?: string[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setCurrent(c => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === images.length - 1 ? 0 : c + 1));

  // Swipe handlers
  let startX = 0;
  const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
  const onTouchEnd = (e: TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
  };

  return (
    <div className="carousel-container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="carousel-image"
      />

      {/* Dots below */}
      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
