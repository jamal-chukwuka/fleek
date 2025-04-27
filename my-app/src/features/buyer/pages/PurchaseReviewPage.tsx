// src/features/buyer/pages/PurchaseReviewPage.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

interface ListingDetails {
  id: string;
  title: string;
  price: number;
  thumbnailURL: string;
  brand: string;
  category: string;
  size?: string;
}

const PurchaseReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const listing = (state as ListingDetails) || null;

  useEffect(() => {
    if (!listing) {
      navigate('/for-you');
    }
  }, [listing, navigate]);

  if (!listing) {
    return null;
  }

  const handleConfirm = () => {
    navigate('/for-you/confirmation', { state: listing });
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your purchase?')) {
      navigate('/for-you');
    }
  };

  return (
    <div className="container flex-col">
      {/* Breadcrumb */}
      <div className="flex-row muted-text small-text">
        <span>Listing &gt; Review</span>
      </div>

      <h2>{listing.title}</h2>

      {/* Thumbnail and Details */}
      <div className="flex-row" style={{ alignItems: 'center', gap: '1rem' }}>
        <img
          src={listing.thumbnailURL}
          alt={listing.title}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '8px',
            objectFit: 'cover'
          }}
        />

        <div className="flex-col">
          <p><strong>Brand:</strong> {listing.brand}</p>
          <p><strong>Category:</strong> {listing.category}</p>
          <p><strong>Sold by:</strong> Neka_On_Fleek_22</p>
        </div>
      </div>

      {/* Deposit */}
      <div className="form-group">
        <h3>Deposit Due:</h3>
        <p>${listing.price.toFixed(2)}</p>
      </div>

      {/* Action Buttons */}
      <button onClick={handleConfirm}>
        Confirm and Purchase
      </button>

      <button className="btn-muted" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default PurchaseReviewPage;
