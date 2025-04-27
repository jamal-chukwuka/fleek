// src/features/buyer/pages/PurchaseConfirmationPage.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ListingDetails {
  id: string;
  title: string;
  price: number;
  thumbnailURL: string;
  brand: string;
  category: string;
}

const PurchaseConfirmationPage: React.FC = () => {
  const { state } = useLocation();
  const listing = (state as ListingDetails) || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!listing) {
      navigate('/for-you');
    }
  }, [listing, navigate]);

  if (!listing) {
    return null;
  }

  return (
    <div className="container flex-col center">
      <div className="flex-row muted-text small-text">
        <span>Listing &gt; Confirmation</span>
      </div>

      <h2>Success!</h2>
      <p>{listing.title} is almost yours!</p>
      <p>We'll notify you when the item is ready for pickup.</p>

      <button onClick={() => navigate('/for-you')}>
        Keep Browsing
      </button>
    </div>
  );
};

export default PurchaseConfirmationPage;
