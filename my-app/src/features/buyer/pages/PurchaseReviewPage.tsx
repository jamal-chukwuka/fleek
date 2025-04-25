// src/features/buyer/pages/PurchaseReviewPage.tsx
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListingDetails } from '../components/Card';

const PurchaseReviewPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listing = (state as ListingDetails) || null;

  // Redirect home if someone lands here without state
  if (!listing) {
    navigate('/for-you');
    return null;
  }

  // Calculate a 10% deposit
  const deposit = (listing.price * 0.1).toFixed(2);

  return (
    <div className="container flex-col">
      <h2 className="center">Review Your Purchase</h2>

      <p className="center"><strong>{listing.title}</strong></p>

      <div className="form-group">
        <p>Deposit due now: <strong>${deposit}</strong></p>
      </div>

      <button onClick={() => navigate('/for-you/confirmation', { state: listing })}>
        Confirm and purchase
      </button>

      <button 
        className="btn-muted" 
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  );
};

export default PurchaseReviewPage;
