// EnterDetailsPage.tsx
import React from 'react';
import { FC, useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  photoURLs: string[];
}

interface ListingDetails {
  title: string;
  brand: string;
  category: string;
  description: string;
  photoURLs: string[];
}

const EnterDetailsPage: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photoURLs = (state as LocationState)?.photoURLs || [];

  // Redirect back if no photos
  if (photoURLs.length === 0) {
    navigate('/listing/photos');
    return null;
  }

  // Form state
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const details: ListingDetails = {
      title,
      brand,
      category,
      description,
      photoURLs,
    };

    // Move to price page, carrying full listing data
    navigate('/listing/price', { state: details });
  };

  return (
    <div className="details-container" style={{ padding: 16, maxWidth: 600, margin: '0 auto' }}>
      <h2>Enter Listing Details</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Vintage leather jacket"
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
        </label>

        <label>
          Brand
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g., Levi's"
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          >
            <option value="" disabled>Select category</option>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Tell buyers more about your item..."
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
        </label>

        <button type="submit" style={{ padding: '12px 24px', marginTop: 16 }}>
          Next: Enter Price
        </button>
      </form>
    </div>
  );
};

export default EnterDetailsPage;
