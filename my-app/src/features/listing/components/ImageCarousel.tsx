import React from 'react';
import { FC, useState, TouchEvent } from 'react';

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
    const [idx, setIdx] = useState(0);

    // Handlers for buttons
    const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

      // Optional: basic swipe support
  let startX = 0;
  const onTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) prev();
    else if (dx < -50) next();
  };

  return (
    <div
      className="carousel-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
    >
      <button
        onClick={prev}
        className="carousel-nav left"
        style={{ position: 'absolute', left: 8, top: '50%' }}
      >
        ‹
      </button>

      <img
        src={images[idx]}
        alt={`Slide ${idx + 1}`}
        className="carousel-image"
        style={{ width: '100%', objectFit: 'contain' }}
      />

      <button
        onClick={next}
        className="carousel-nav right"
        style={{ position: 'absolute', right: 8, top: '50%' }}
      >
        ›
      </button>
    </div>
  );

};

export default ImageCarousel;
