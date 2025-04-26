import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../app/firebase';

const ReviewListingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state: {
      photoURLs: string[];
      title: string;
      brand: string;
      category: string;
      description: string;
      price: number;
    };
  };

  const handleSubmit = async () => {
    try {
      // ✅ Saving everything into Firestore here:
      await addDoc(collection(db, 'listings'), {
        title: state.title,
        brand: state.brand,
        category: state.category,
        description: state.description,
        photoURLs: state.photoURLs,               // ✅ Includes your Base64 images here
        price: state.price,
        createdAt: serverTimestamp(),             // ✅ Adds a timestamp
      });

      console.log('Listing saved to Firestore!');
      navigate('/listing/confirmation', { state });  // ✅ Send user to confirmation page after saving
    } catch (error) {
      console.error('Error saving listing:', error);
      alert('Failed to submit your listing. Please try again.');
    }
  };

  return (
    <div className="container flex-col">
      <h2>Review Your Listing ✨</h2>

      <div className="form-group">
        <h3>{state.title}</h3>
        <p><strong>Brand:</strong> {state.brand}</p>
        <p><strong>Category:</strong> {state.category}</p>
        <p><strong>Description:</strong> {state.description}</p>
        <p><strong>Price:</strong> ${state.price}</p>
      </div>

      <h4>Photos:</h4>
      <div className="preview-grid">
        {state.photoURLs.map((src, idx) => (
          <img key={idx} src={src} alt={`preview ${idx}`} className="thumb" />
        ))}
      </div>

      <button onClick={handleSubmit}>Submit Listing ✅</button>
    </div>
  );
};

export default ReviewListingPage;
