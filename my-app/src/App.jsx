import { Routes, Route } from 'react-router-dom';
import WelcomePage  from './features/listings/WelcomePage'
import AddPhotosPage from './features/listings/pages/AddPhotosPage';
import PhotoReviewPage from './features/listings/pages/PhotoReviewPage';
import EnterDetailsPage from './features/listings/pages/EnterDetailsPage'
import EnterPricePage from './features/listings/pages/EnterPricePage';
import ReviewListingPage from './features/listings/pages/ReviewListingPage';
import ConfirmationPage from './features/listings/pages/ConfirmationPage';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/listing/photos" element={<AddPhotosPage />} />
      <Route path="/listing/review-photos" element={<PhotoReviewPage />} />
      <Route path="/listing/details" element={<EnterDetailsPage />} />
      <Route path="/listing/price" element={<EnterPricePage />} />
      <Route path="/listing/review" element={<ReviewListingPage />} />
      <Route path="/listing/confirmation" element={<ConfirmationPage />} />


     </Routes>
  );
};

export default App
