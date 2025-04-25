// src/features/listing/components/ImageCarousel.tsx
import React, { FC, useState, TouchEvent } from 'react';

interface ImageCarouselProps {
  images?: string[];   // make it optional
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images = [] }) => {
  // If no images, render nothing (or a placeholder)
  if (images.length === 0) {
    return null; 
    // or return <div className="container center">No images available</div>;
  }

  const [idx, setIdx] = useState(0);

  const prev = () => setIdx(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx(i => (i === images.length - 1 ? 0 : i + 1));

  let startX = 0;
  const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
  const onTouchEnd   = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) prev();
    else if (dx < -50) next();
  };

  return (
    <div 
      className="carousel-container" 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd}
    >
      <button onClick={prev} className="carousel-nav left">‹</button>
      <img
        src={images[idx]}
        alt={`Slide ${idx + 1}`}
        className="carousel-image"
      />
      <button onClick={next} className="carousel-nav right">›</button>
    </div>
  );
};

export default ImageCarousel;
