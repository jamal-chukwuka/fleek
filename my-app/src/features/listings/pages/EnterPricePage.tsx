// src/features/listing/pages/EnterPricePage.tsx
import React from 'react';
import { FC, useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ListingDetails {
  title: string;
  brand: string;
  category: string;
  description: string;
  photoURLs: string[];
}

interface LocationState extends ListingDetails {}

const EnterPricePage: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const listing = state as LocationState | undefined;

  // If no listing data, send back to start
  if (!listing) {
    navigate('/');
    return null;
  }

  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Prevent empty or zero price
    if (price === '' || price <= 0) return;

    navigate('/listing/review', {
      state: { ...listing, price },
    });
  };

  return (
    <div className="container">
      <h2>Enter a Price (USD)</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Price</label>
                <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    required
                    placeholder="e.g., 49.99"
                />
        </div>

        <button
          type="submit"
          className="form-group"
        >
          Next: Review Listing
        </button>
      </form>
    </div>
  );
};

export default EnterPricePage;
