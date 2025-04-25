// src/features/buyer/pages/DemoReviewRedirect.tsx
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingDetails } from '../components/Card';

const mockListing: ListingDetails = {
  id: 'boot-001',
  title: 'Balenciaga Pink Sock Boots',
  price: 150,
  thumbnailURL: '/assets/pink-sock-boots-thumb.jpg',
  photoURLs: [
    '/assets/pink-sock-boots-1.jpg',
    '/assets/pink-sock-boots-2.jpg',
    '/assets/pink-sock-boots-3.jpg',
  ],
  brand: 'Balenciaga',
  category: `Women's Shoes`,
  description:
    "These Balenciaga Women's Pink Sock Boots feature a snug, knitted sock-like fit with a vibrant pink color and a chunky rubber sole—blending luxury and street style.",
};

const DemoReviewRedirect: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // immediately redirect into your review frame
    navigate(`/for-you/review/${mockListing.id}`, { state: mockListing });
  }, [navigate]);

  return null; // nothing to render here
};

export default DemoReviewRedirect;
