// src/features/listing/pages/ConfirmationPage.tsx
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Listing {
  title: string;
  brand: string;
  category: string;
  description: string;
  photoURLs: string[];
  price: number;
}

const ConfirmationPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listing = (state as Listing) || null;

  // If somehow navigated here without data, go home
  if (!listing) {
    navigate('/');
    return null;
  }

  return (
    <div className="container flex-col center">
      <h2>🎉 Your listing is live!</h2>
      <p>
        Congratulations—your <strong>{listing.title}</strong> is now visible to buyers.
        You’ll receive notifications when someone shows interest.
      </p>

      <button onClick={() => navigate('/')}>
        Create another listing
      </button>
    </div>
  );
};

export default ConfirmationPage;
