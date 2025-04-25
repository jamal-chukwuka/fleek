// src/features/listing/pages/EnterDetailsPage.tsx
import React, { FC, useState, FormEvent } from 'react';
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
  if (!photoURLs.length) {
    navigate('/listing/photos');
    return null;
  }

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/listing/price', {
      state: { title, brand, category, description, photoURLs },
    });
  };

  return (
    <div className="container">
      <h2>Enter Listing Details</h2>

      <form onSubmit={handleSubmit} className="flex-col">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="e.g., Vintage leather jacket"
          />
        </div>

        {/* Brand */}
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={e => setBrand(e.target.value)}
            placeholder="e.g., Levi's"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select category</option>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            placeholder="Tell buyers more about your item..."
          />
        </div>

        {/* Submit */}
        <button type="submit">Next: Enter Price</button>
      </form>
    </div>
  );
};

export default EnterDetailsPage;
