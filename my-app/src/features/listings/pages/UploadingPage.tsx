import React, { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  photoURLs: string[];
}

const UploadingPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const photoURLs = (state as LocationState)?.photoURLs || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/listing/review-photos', { state: { photoURLs } });
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigate, photoURLs]);

  return (
    <div className="container flex-col center uploading-box">
      <h2>Uploading...</h2>
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <div className="spinner"></div>
      <p className="small-text muted-text">Hang tight, almost done...</p>
    </div>
  );
};

export default UploadingPage;
