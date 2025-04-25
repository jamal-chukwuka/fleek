// src/features/buyer/pages/ConfirmationRatingPage.tsx
import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ListingDetails } from '../components/Card';

const ConfirmationRatingPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listing = (state as ListingDetails) || null;

  // If no listing in state, bounce back
  if (!listing) {
    navigate('/for-you');
    return null;
  }

  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    console.log('Submitted rating', rating, 'for', listing.id);
    // TODO: persist rating to your backend/Firestore
    navigate('/for-you');
  };

  return (
    <div className="container flex-col center">
      <h2>Rate Your Purchase</h2>
      <p className="form-group">
        How would you rate <strong>{listing.title}</strong>?
      </p>

      <div className="rating-stars">
        {[1,2,3,4,5].map((n) => (
          <Star
            key={n}
            className={n <= rating ? 'star filled' : 'star'}
            onClick={() => setRating(n)}
            role="button"
            tabIndex={0}
            onKeyPress={e => e.key === 'Enter' && setRating(n)}
          />
        ))}
      </div>

      <button disabled={rating === 0} onClick={handleSubmit}>
        Submit Rating
      </button>
    </div>
  );
};

export default ConfirmationRatingPage;
