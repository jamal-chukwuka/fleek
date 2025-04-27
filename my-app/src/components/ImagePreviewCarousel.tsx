// src/features/listings/components/ImagePreviewCarousel.tsx

import React, { FC, useState, TouchEvent } from 'react';

interface ImagePreviewCarouselProps {
  images: string[];
}

const ImagePreviewCarousel: FC<ImagePreviewCarouselProps> = ({ images }) => {
  const [idx, setIdx] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

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
    <div className="carousel-container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Main Image */}
      <img src={images[idx]} alt={`preview ${idx + 1}`} className="carousel-image" />

      {/* Dot Navigation */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === idx ? 'active' : ''}`}
            onClick={() => setIdx(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewCarousel;
