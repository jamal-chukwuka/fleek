// src/features/buyer/pages/PurchaseConfirmationPage.tsx
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListingDetails } from '../components/Card';

const PurchaseConfirmationPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listing = (state as ListingDetails) || null;

  // If navigated here without state, bounce back
  if (!listing) {
    navigate('/for-you');
    return null;
  }

  return (
    <div className="container flex-col center">
      <h2>Success!</h2>
      <p>
        Your deposit for <strong>{listing.title}</strong> has been confirmed.
      </p>
      <p className="form-group">
        We’ll notify you when it’s ready for pickup.
      </p>
      <button onClick={() => navigate('/for-you')}>
        Keep browsing
      </button>
    </div>
  );
};

export default PurchaseConfirmationPage;
