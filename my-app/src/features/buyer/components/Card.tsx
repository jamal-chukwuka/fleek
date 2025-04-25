// src/features/buyer/components/Card.tsx
import React, { FC } from 'react';

export interface ListingSummary {
  id: string;
  title: string;
  price: number;
  thumbnailURL: string;
  category?: string;
  brand?: string;
}

export interface ListingDetails {
    id: string;
    title: string;
    price: number;
    thumbnailURL: string;
    photoURLs: string[];
    brand: string;
    category: string;
    description: string;
  }
  
interface CardProps {
  listing: ListingSummary;
  onClick: (id: string) => void;
}

const Card: FC<CardProps> = ({ listing, onClick }) => {
  const { id, title, price, thumbnailURL, category, brand } = listing;

  return (
    <div
      className="card flex-col"
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick(id)}
    >
      <img
        src={thumbnailURL}
        alt={title}
        className="card-image"
      />

      <div className="card-info flex-col">
        <h4 className="card-title">{title}</h4>
        <p className="card-meta">
          {brand && <span>{brand} • </span>}
          {category}
        </p>
        <p className="card-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
