// src/features/listings/pages/PhotoReviewPage.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageCarousel from '../../listing/components/ImageCarousel';

interface LocationState {
  photoURLs: string[];
}

const PhotoReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const photoURLs = (state as LocationState)?.photoURLs || [];
  

  useEffect(() => {
    if (!photoURLs.length) {
      navigate('/listing/photos');
    }
  }, [navigate, photoURLs]);

  if (!photoURLs.length) {
    return null;
  }



  const handleNext = () => {
    navigate('/listing/details', { state: { photoURLs } });
  };

  return (
    <div className="container flex-col center">
      <div className="flex-row small-text muted-text">
        <span>New Listing &gt; Review Photos</span>
      </div>

      {/* Carousel */}
      <ImageCarousel images={photoURLs} />

      {/* Next Button */}
      <button onClick={handleNext} className="form-group">
        Next
      </button>
<button
  type="button"
  className="btn-muted"
  onClick={() => navigate('/listing/photos')}
>
  Back
</button>
    </div>
  );
};

export default PhotoReviewPage;
 