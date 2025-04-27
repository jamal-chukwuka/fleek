// src/features/buyer/pages/PurchaseReviewPage.tsx
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ImageCarousel from '../../listing/components/ImageCarousel';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../app/firebase';
import { ListingDetails } from '../components/Card';

const PurchaseReviewPage: FC = () => {
  const { id: listingId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const locationState = useLocation().state as Partial<ListingDetails> | null;

  const [listing, setListing] = useState<ListingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use passed-in state if available
    if (locationState?.photoURLs?.length) {
      setListing(locationState as ListingDetails);
      setLoading(false);
      return;
    }
    // Otherwise fetch from Firestore by ID
    if (!listingId) {
      navigate('/for-you');
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const ref = doc(db, 'listings', listingId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          navigate('/for-you');
          return;
        }
        const data = snap.data();
        setListing({
          id:           snap.id,
          title:        data.title,
          price:        data.price,
          thumbnailURL: Array.isArray(data.photoURLs) ? data.photoURLs[0] : '',
          photoURLs:    Array.isArray(data.photoURLs) ? data.photoURLs : [],
          category:     data.category,
          brand:        data.brand,
          description:  data.description,
        });
      } catch (err) {
        console.error('Error fetching listing for review:', err);
        navigate('/for-you');
      } finally {
        setLoading(false);
      }
    })();
  }, [listingId, locationState, navigate]);

  if (loading) {
    return (
      <div className="container center">
        Loading your purchase review…
      </div>
    );
  }

  if (!listing) {
    navigate('/for-you');
    return null;
  }

  // Calculate 10% deposit
  const deposit = (listing.price * 0.1).toFixed(2);

  // Ask confirmation before canceling
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your purchase?')) {
      // Redirect back to the listing details page
      navigate(`/for-you`);
    }
  };

  return (
    <div className="container flex-col">
      {/* Image carousel */}
      <ImageCarousel images={listing.photoURLs} />

      {/* Title */}
      <h2 className="center">{listing.title}</h2>

      {/* Deposit info */}
      <p className="center">
        <strong>Deposit due now:</strong> ${deposit}
      </p>

      {/* Confirm & Cancel buttons */}
      <div className="flex-row center">
        <button onClick={() => navigate('/for-you/confirmation', { state: listing })}>
          Confirm & Purchase
        </button>
        <button className="btn-muted" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PurchaseReviewPage;
