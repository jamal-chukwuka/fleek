// src/features/buyer/pages/ListingDetailsPage.tsx
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ImageCarousel from '../../listing/components/ImageCarousel';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../app/firebase';
import { ListingDetails } from '../components/Card';

const ListingDetailsPage: FC = () => {
  const { id: listingId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const locationState = useLocation().state as Partial<ListingDetails> | null;

  const [listing, setListing] = useState<ListingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we were passed full details (e.g. via state), use them
    if (locationState?.photoURLs?.length) {
      setListing(locationState as ListingDetails);
      setLoading(false);
      return;
    }

    // Otherwise, fetch the listing from Firestore by ID
    if (!listingId) {
      navigate('/for-you');
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'listings', listingId);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          navigate('/for-you');
          return;
        }
        const data = snap.data();
        // Build a ListingDetails object from Firestore data
        setListing({
          id:          snap.id,
          title:       data.title,
          price:       data.price,
          thumbnailURL: Array.isArray(data.photoURLs) && data.photoURLs[0],
          photoURLs:   Array.isArray(data.photoURLs) ? data.photoURLs : [],
          category:    data.category,
          brand:       data.brand,
          description: data.description,
        });
      } catch (err) {
        console.error('Error loading listing:', err);
        navigate('/for-you');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [listingId, locationState, navigate]);

  if (loading) {
    return <div className="container center">Loading listing…</div>;
  }

  if (!listing) {
    // In case fetch failed without redirect
    navigate('/for-you');
    return null;
  }

  const { id, title, brand, category, description, photoURLs, price } = listing;

  return (
    <div className="container flex-col">
      <h2>{title}</h2>

      <div className="flex-row center form-group">
        <span className="badge">{category}</span>
        {brand && <span className="badge">{brand}</span>}
      </div>

      <p className="card-price large center">${price.toFixed(2)}</p>

      {/* Now that we fetched real photoURLs, images will render */}
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
