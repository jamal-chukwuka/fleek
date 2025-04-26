import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { ListingSummary } from '../components/Card';
import NotificationBanner from '../components/NotificationsBanner';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebase';

const ForYouPage: FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<ListingSummary[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'listings'));
        const fetchedListings: ListingSummary[] = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            
            const title = data.title?.trim();
            const price = typeof data.price === 'number' ? data.price : null;
            const brand = data.brand?.trim();
            const category = data.category?.trim();
            const thumbnailURL = data.photoURLs && data.photoURLs.length > 0 ? data.photoURLs[0] : '';
  
            // 🚩 Skip listing if required fields are missing
            if (!title || price === null || !thumbnailURL) {
              console.warn('Skipping incomplete listing:', doc.id, data);
              return null;
            }
  
            return {
              id: doc.id,
              title,
              price,
              thumbnailURL,
              category: category || 'General',
              brand: brand || 'No brand',
            };
          })
          .filter((listing): listing is ListingSummary => listing !== null); // ✅ Remove nulls explicitly
  
        console.log('Fetched complete listings:', fetchedListings); // 🟢 See exactly what's being rendered
        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
  
    fetchListings();
  }, []);
  
  

  const handleCardClick = (id: string) => {
    const listing = listings.find(l => l.id === id)!;
    navigate(`/for-you/listing/${id}`, { state: listing });
  };

  return (
    <div className="container flex-col">
      <h2 className="center">For You ✨</h2>

      <NotificationBanner />

      <div className="form-group">
  <h3>Latest Listings</h3>
  <div className="scroll-row">
    {listings.map(l => (
      <Card key={l.id} listing={l} onClick={handleCardClick} />
    ))}
  </div>
</div>
    </div>
  );
};

export default ForYouPage;