// src/features/buyer/pages/ForYouPage.tsx
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { ListingSummary } from '../components/Card';
import NotificationBanner from '../components/NotificationsBanner';

const ForYouPage: FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<ListingSummary[]>([]);

  useEffect(() => {
    // TODO: replace with real data fetch
    setListings([
      {
        id: '1',
        title: 'Vintage NIU Hoodie',
        price: 35.0,
        thumbnailURL: '/assets/niu-hoodie.jpg',
        category: 'Apparel',
        brand: 'NIU',
      },
      {
        id: '2',
        title: 'UIC Laptop Decal',
        price: 5.0,
        thumbnailURL: '/assets/uic-decal.jpg',
        category: 'Accessories',
      },
      // …more
    ]);
  }, []);

  const handleCardClick = (id: string) => {
    const listing = listings.find(l => l.id === id)!;
    navigate(`/for-you/listing/${id}`, { state: listing });
  };

  return (
    <div className="container flex-col">
      <h2 className="center">For You</h2>

      <NotificationBanner />

      {/* One horizontal scroll row */}
      <div className="form-group">
        <h3>Shoes</h3>
        <div className="flex-row scroll-row">
          {listings.map(l => (
            <Card
              key={l.id}
              listing={l}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForYouPage;
