// src/features/buyer/pages/PurchaseReviewPage.tsx
import React, { useEffect, useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);

// When user clicks Cancel
const handleCancelClick = () => {
  setShowModal(true);
};

// When user confirms in modal
const confirmCancel = () => {
  setShowModal(false);
  navigate('/for-you');
};

// When user decides to stay
const closeModal = () => {
  setShowModal(false);
};

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

      <button type="button" className="btn-muted" onClick={handleCancelClick}>
        Cancel
      </button>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-container">
      <p>Are you sure you want to cancel your purchase?</p>
      <div className="modal-footer">
        <button className="btn-muted" onClick={closeModal}>
          No, stay
        </button>
        <button onClick={confirmCancel}>
          Yes, cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PurchaseReviewPage;
