// src/features/buyer/pages/ForYouPage.tsx
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { ListingSummary } from '../components/Card';
import NotificationBanner from '../components/NotificationsBanner';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebase';
import ScrollCarousel from '../components/ScrollCarousel';

const ForYouPage: FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<ListingSummary[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const qs = await getDocs(collection(db, 'listings'));
      const maybe = qs.docs.map(doc => {
        const d = doc.data();
        const title = d.title?.trim();
        const price = typeof d.price === 'number' ? d.price : null;
        const thumb = Array.isArray(d.photoURLs) ? d.photoURLs[0] : '';
        if (!title || price == null || !thumb) return null;
        return {
          id: doc.id,
          title,
          price,
          thumbnailURL: thumb,
          category: d.category?.trim()  || 'General',
          brand:    d.brand?.trim()     || 'No brand',
        };
      });
      setListings(maybe.filter((l): l is ListingSummary => !!l));
    };
    fetchListings();
  }, []);

  // Group by category
  const categories = Array.from(
    new Set(listings.map(l => l.category))
  );

  const onClick = (id: string) => {
    const item = listings.find(x => x.id === id)!;
    navigate(`/for-you/listing/${id}`, { state: item });
  };

  return (
    <div className="container flex-col">
      <div className="flex-col center form-group">
        <h2>Welcome, Sofia!</h2>
        <p>Amazing fashion finds we think you’ll love...</p>
      </div>

      <NotificationBanner />

      {categories.map(cat => {
        const items = listings.filter(l => l.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat} className="form-group">
            <h3>{cat}</h3>
            <ScrollCarousel>
                {items.map(l => (
                  <Card key={l.id} listing={l} onClick={onClick} />
                ))}
            </ScrollCarousel>
          </div>
        );
      })}
    </div>
  );
};

export default ForYouPage;
