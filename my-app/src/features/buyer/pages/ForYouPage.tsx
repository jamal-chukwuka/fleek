// src/features/buyer/pages/ForYouPage.tsx
import React, { FC, useEffect, useState, useRef } from 'react';
import { useNavigate }       from 'react-router-dom';
import Card, { ListingSummary } from '../components/Card';
import NotificationBanner    from '../components/NotificationsBanner';
import { collection, getDocs } from 'firebase/firestore';
import { db }                from '../../../app/firebase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ForYouPage: FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // load listings
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'listings'));
      const items = snap.docs
        .map(doc => {
          const d = doc.data();
          const title = d.title?.trim();
          const price = typeof d.price === 'number' ? d.price : null;
          const photos = Array.isArray(d.photoURLs) ? d.photoURLs : [];
          if (!title || price == null || photos.length === 0) return null;
          return {
            id: doc.id,
            title,
            price,
            thumbnailURL: photos[0],
            category: d.category?.trim() || 'General',
            brand:    d.brand?.trim()    || 'No brand',
          };
        })
        .filter((x): x is ListingSummary => !!x);
      setListings(items);
    })();
  }, []);

  const categories = Array.from(new Set(listings.map(l => l.category)));

  const onClickCard = (id: string) => {
    const item = listings.find(l => l.id === id)!;
    navigate(`/for-you/listing/${id}`, { state: item });
  };

  const scrollRow = (cat: string, dir: -1 | 1) => {
    const el = rowRefs.current[cat];
    if (!el) return;
    el.scrollBy({ left: (el.clientWidth / 2) * dir, behavior: 'smooth' });
  };

  return (
    <div className="container flex-col">
      {/* Page header */}
      <div className="flex-col center form-group">
        <h2>Welcome, Sofia!</h2>
        <p>Amazing fashion finds we think you’ll love...</p>
      </div>

      {/* Notification */}
      <NotificationBanner />

      {/* One container per category */}
      {categories.map(cat => {
        const items = listings.filter(l => l.category === cat);
        if (!items.length) return null;

        return (
          <div key={cat} className="category-container form-group">
            {/* Category header */}
            <div className="category-header">
              <h3>{cat}</h3>
            </div>

            {/* Carousel */}
            <div className="carousel-wrapper inline-flex">
              <button
                className="carousel-arrow left"
                onClick={() => scrollRow(cat, -1)}
                aria-label="Scroll left"
              >
                <ChevronLeft />
              </button>

              <div
                className="scroll-row inline-flex"
                ref={el => { rowRefs.current[cat] = el; }}
              >
                {items.map(item => (
                  <div key={item.id} className="scroll-item">
                    <Card listing={item} onClick={onClickCard} />
                  </div>
                ))}
              </div>

              <button
                className="carousel-arrow right"
                onClick={() => scrollRow(cat, 1)}
                aria-label="Scroll right"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForYouPage;
