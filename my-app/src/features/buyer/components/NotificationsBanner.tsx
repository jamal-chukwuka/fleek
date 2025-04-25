// src/features/buyer/components/NotificationBanner.tsx
import React, { FC, useState, useEffect } from 'react';
// import PickupModal from './PickupModal';
// import RatingModal from './RatingModal';

const NotificationBanner: FC = () => {
  // these would normally come from your backend or Firestore 
  const [pickupReady, setPickupReady]   = useState(false);
  const [ratingPending, setRatingPending] = useState(false);

  // controls for showing the modals
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    // TODO: replace with real fetch of notification state
    // e.g. Firestore doc that says “orderReady” or “awaitingRating”
    setPickupReady(true);      // simulate “your item is ready”
    // setRatingPending(true); // simulate “please rate your purchase”
  }, []);

  // nothing to show
  if (!pickupReady && !ratingPending) return null;

  return (
    <>
      <div className="notification-banner flex-row center">
        {pickupReady ? (
          <>
            <span>Your order is ready for pickup!</span>
            <button onClick={() => setShowPickupModal(true)}>
              View pickup instructions
            </button>
          </>
        ) : (
          ratingPending && (
            <>
              <span>Please rate your recent purchase</span>
              <button onClick={() => setShowRatingModal(true)}>
                Rate purchase
              </button>
            </>
          )
        )}
      </div>

      {/* {showPickupModal && (
        <PickupModal
          onClose={() => {
            setShowPickupModal(false);
            setPickupReady(false);
          }}
        />
      )} */}
{/* 
      {showRatingModal && (
        <RatingModal
          onClose={() => {
            setShowRatingModal(false);
            setRatingPending(false);
          }}
        />
      )} */}
    </>
  );
};

export default NotificationBanner;
