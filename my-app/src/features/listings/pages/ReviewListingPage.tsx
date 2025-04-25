// src/features/listing/pages/ReviewListingPage.tsx
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageCarousel from '../../listing/components/ImageCarousel';

interface Listing {
  title: string;
  brand: string;
  category: string;
  description: string;
  photoURLs: string[];
  price: number;
}

const ReviewListingPage: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const listing = (state as Listing) || null;

  if (!listing) {
    navigate('/');
    return null;
  }

  const { photoURLs, title, brand, category, description, price } = listing;

  const handleEdit = (path: string) => {
    navigate(path, { state: listing });
  };

  const handleSubmit = () => {
    console.log('Submitting listing:', listing);
    navigate('/listing/confirmation', { state: listing });
  };

  return (
    <div className="container flex-col">
      <h2 className="center">Review Your Listing</h2>

      {/* Photos */}
      <div className="flex-col form-group">
        <h3>Photos</h3>
        <ImageCarousel images={photoURLs} />
        <button onClick={() => handleEdit('/listing/photos')}>
          Edit Photos
        </button>
      </div>

      {/* Details */}
      <div className="flex-col form-group">
        <h3>Details</h3>
        <div className="flex-col">
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Brand:</strong> {brand}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Description:</strong> {description}</p>
        </div>
        <button onClick={() => handleEdit('/listing/details')}>
          Edit Details
        </button>
      </div>

      {/* Price */}
      <div className="flex-col form-group">
        <h3>Price</h3>
        <p><strong>USD</strong> ${price.toFixed(2)}</p>
        <button onClick={() => handleEdit('/listing/price')}>
          Edit Price
        </button>
      </div>

      {/* Final submit */}
      <button onClick={handleSubmit}>
        Submit Listing
      </button>
    </div>
  );
};

export default ReviewListingPage;
