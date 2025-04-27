// src/features/listings/pages/UploadingPage.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  photoURLs: string[];
}

const UploadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const photoURLs = (state as LocationState)?.photoURLs || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/listing/review-photos', { state: { photoURLs } });
    }, 2000); // fake 2 seconds loading

    return () => clearTimeout(timer);
  }, [navigate, photoURLs]);

  return (
    <div className="container flex-col center">
      <h2>Photos uploading...</h2>

      <div className="progress-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default UploadingPage;
