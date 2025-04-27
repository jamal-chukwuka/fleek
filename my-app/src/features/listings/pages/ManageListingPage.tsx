// src/features/listings/pages/ManageListingsPage.tsx
import React, { FC, useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../app/firebase';

interface ListingSummary {
  id: string;
  title: string;
  price: number;
}

const ManageListingsPage: FC = () => {
  const [listings, setListings] = useState<ListingSummary[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const snap = await getDocs(collection(db, 'listings'));
      const items = snap.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || '(No title)',
        price: doc.data().price || 0,
      }));
      setListings(items);
    };
    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    await deleteDoc(doc(db, 'listings', id));
    setListings(prev => prev.filter(listing => listing.id !== id));
  };

  return (
    <div className="container flex-col">
      <h2>Manage Listings</h2>
      {listings.map(listing => (
        <div key={listing.id} className="manage-listing-row flex-row">
          <div className="flex-col">
            <strong>{listing.title}</strong>
            <span>${listing.price.toFixed(2)}</span>
          </div>
          <button className="btn-delete" onClick={() => handleDelete(listing.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageListingsPage;
