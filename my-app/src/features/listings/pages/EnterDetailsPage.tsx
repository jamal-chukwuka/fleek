// src/features/listings/pages/EnterDetailsPage.tsx
import React, { FC, FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  photoURLs: string[];
}

interface ListingDetails {
  title: string;
  brand: string;
  category: string;
  size: string;
  description: string;
  photoURLs: string[];
}

const EnterDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const photoURLs = (state as LocationState)?.photoURLs || [];

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');

  const [showModal, setShowModal] = useState(false);

const handleCancelConfirm = () => {
  navigate('/for-you');
};

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const details: ListingDetails = {
      title,
      brand,
      category,
      size,
      description,
      photoURLs,
    };

    navigate('/listing/price', { state: details });
  };

  const handleCancel = () => {
    navigate('/for-you');
  };

  const handleBack = () => {
    navigate('/listing/photos');
  };

  return (
    <div className="container flex-col">
      <h2>New listing - Enter details</h2>

      <form onSubmit={handleSubmit} className="flex-col form-group">
        {/* Item Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter item name"
          required
        />

        {/* Brand */}
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand (optional)"
        />

        {/* Category + Size */}
        <div className="flex-row">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select category</option>
            <option value="Women's Apparel">Women's Apparel</option>
            <option value="Men's Apparel">Men's Apparel</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Textbooks">Textbooks</option>
            <option value="School Supplies">School Supplies</option>
            <option value="Furniture">Furniture</option>
            <option value="Dorm Essentials">Dorm Essentials</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Art Supplies">Art Supplies</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Gaming">Gaming</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="" disabled>Select size (optional)</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="One Size">One Size</option>
            <option value="N/A">N/A</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter brief description"
          rows={4}
          required
        />

        {/* Action Buttons */}
        <div className="flex-col center" style={{ gap: '0.5rem', marginTop: '1rem' }}>
          <button type="submit">Next</button>
          <button 
              type="button"
              className="btn-muted"
              onClick={() => navigate(-1)}>
                Back
          </button>          
  <button type="button" onClick={handleOpenModal} className="btn-muted">Cancel</button>
          </div>

      </form>
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-header">
        <h4>Cancel Listing</h4>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to cancel? Your progress will be lost.</p>
      </div>
      <div className="modal-footer flex-col">
        <button onClick={handleCancelConfirm}>Yes, Cancel</button>
        <button onClick={handleCloseModal} className="btn-muted">No, Stay</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EnterDetailsPage;
