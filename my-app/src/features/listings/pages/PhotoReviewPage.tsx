// PhotoReviewPage.tsx
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import ImageCarousel from '../../listing/components/ImageCarousel';

interface LocationState {
  photoURLs: string[];
}

const PhotoReviewPage: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photoURLs = (state as LocationState)?.photoURLs || [];

  // If nobody uploaded photos, go back
  if (photoURLs.length === 0) {
    navigate('/listing/photos');
    return null;
  }

  const handleNext = () => {
    // pass the URLs forward (or they’re already in context)
    navigate('/listing/details', { state: { photoURLs } });
  };

  return (
    <div className="review-container">
      <h2>Review your photos</h2>
      <ImageCarousel images={photoURLs} />

      <button onClick={handleNext} style={{ marginTop: 16 }}>
        Next: Enter details
      </button>
    </div>
  );
};

export default PhotoReviewPage;
