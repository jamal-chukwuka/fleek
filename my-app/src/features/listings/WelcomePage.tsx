// src/features/listings/WelcomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex-col center">
      <h2>Welcome, Neha!</h2>

      <div
        className="new-listing-box"
        onClick={() => navigate('/listing/photos')}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && navigate('/listing/photos')}
      >
        <p>+ Create New Listing</p>
      </div>
    </div>
  );
};

export default WelcomePage;
