// src/features/buyer/pages/ListingDetailsPage.tsx
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageCarousel from '../../listing/components/ImageCarousel';
import { ListingDetails } from '../components/Card';

const ListingDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listing = (state as ListingDetails) || null;

  // If no data was passed in, kick back to home
  if (!listing) {
    navigate('/for-you');
    return null;
  }

  const {
    id,
    title,
    brand,
    category,
    description,
    photoURLs,
    price,
  } = listing;

  return (
    <div className="container flex-col">
      <h2>{title}</h2>

      <div className="flex-row center form-group">
        <span className="badge">{category}</span>
        {brand && <span className="badge">{brand}</span>}
      </div>

      <p className="card-price center">${price.toFixed(2)}</p>

      <ImageCarousel images={photoURLs} />

      <p className="form-group">{description}</p>

      <button
        onClick={() =>
          navigate(`/for-you/review/${id}`, { state: listing })
        }
      >
        Continue to purchase
      </button>
    </div>
  );
};

export default ListingDetailsPage;
