// src/features/buyer/pages/ListingDetailsPage.tsx
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../app/firebase';
import ImageCarousel from '../../listing/components/ImageCarousel';

interface FullListing {
  id: string;
  title: string;
  brand: string;
  price: number;
  description: string;
  photoURLs: string[];
}

const ListingDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<FullListing | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      const docRef = doc(db, 'listings', id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setListing({
          id: snap.id,
          title: data.title || '',
          brand: data.brand || '',
          price: data.price || 0,
          description: data.description || '',
          photoURLs: Array.isArray(data.photoURLs) ? data.photoURLs : [],
        });
      } else {
        console.error('No such listing!');
        navigate('/for-you');
      }
    };

    fetchListing();
  }, [id, navigate]);

  if (!listing) {
    return <div className="container center">Loading...</div>;
  }

  return (
    <div className="container flex-col">
      {/* Breadcrumb */}
      <div className="flex-row muted-text small-text">
        <span>Listing &gt; View details</span>
      </div>

      {/* Title and Price */}
      <h2>{listing.title}</h2>
      <h3>${listing.price.toFixed(2)}</h3>

      {/* Image Carousel */}
      <ImageCarousel images={listing.photoURLs} />

      {/* Description */}
      <div className="form-group">
        <p>{listing.description}</p>
      </div>

      {/* Seller Info */}
      <div className="seller-info flex-col">
        <p><strong>👤 Neka_in_Fleek_22</strong></p>
        <p>🗓️ On Fleek since 2023</p>
        <p>⭐ Rating: 4.9/5</p>
        <p>✔️ Verified Super Seller</p>
      </div>

      {/* Continue button */}
      <button onClick={() => navigate(`/for-you/review/${listing.id}`, {
        state: {
          ...listing,
          thumbnailURL: listing.photoURLs?.[0] || '',
        }
      })}>
          Continue to Purchase
      </button>
    </div>
  );
};

export default ListingDetailsPage;
