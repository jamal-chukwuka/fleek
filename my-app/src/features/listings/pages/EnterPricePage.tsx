// src/features/listings/pages/EnterPricePage.tsx
import React, { FC, useEffect, useState, FormEvent } from 'react';
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

  const [loading, setLoading] = useState(true);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [customPrice, setCustomPrice] = useState<number | ''>('');

  useEffect(() => {
    if (!listing) {
      navigate('/listing/photos');
      return;
    }

    // Fake "generating price"
    setTimeout(() => {
      const randomPrice = Math.floor(Math.random() * (200 - 20 + 1)) + 20; // random between $20 and $200
      setSuggestedPrice(randomPrice);
      setLoading(false);
    }, 1500); // 1.5 seconds fake loading
  }, [listing, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const finalPrice = customPrice || suggestedPrice;
    if (!finalPrice || finalPrice <= 0) return;

    navigate('/listing/review', {
      state: { ...listing, price: finalPrice },
    });
  };

  const handleDifferentAmount = () => {
    setCustomPrice('');
  };

  if (!listing) return null; // prevent crash

  return (
    <div className="container flex-col center">
      <h2>New listing &gt; Enter price</h2>

      {loading ? (
        <div className="flex-col center">
          <div className="spinner" /> {/* You can style a simple spinner */}
          <p>Generating price...</p>
          <p>Based on the details you submitted, we are estimating the best price for your item.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-col center">
          {customPrice === '' ? (
            <>
              <h3>Suggested price:</h3>
              <h1>${suggestedPrice}</h1>
              <p>Based on the resale value, we recommend pricing at ${suggestedPrice}.</p>

              <button type="submit">Set price at ${suggestedPrice}</button>

              <button
                type="button"
                className="btn-muted"
                onClick={() => setCustomPrice(0)}
              >
                Enter different amount
              </button>
            </>
          ) : (
            <>
              <label className="form-group">
                Enter your price:
                <input
                  type="number"
                  min="1"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  placeholder="e.g., 49.99"
                  required
                />
              </label>
              <button type="submit">Set Price</button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default EnterPricePage;
