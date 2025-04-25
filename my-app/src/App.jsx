import { Routes, Route } from 'react-router-dom';
import WelcomePage  from './features/listings/WelcomePage'
import AddPhotosPage from './features/listings/pages/AddPhotosPage';
import PhotoReviewPage from './features/listings/pages/PhotoReviewPage';
import EnterDetailsPage from './features/listings/pages/EnterDetailsPage'
import EnterPricePage from './features/listings/pages/EnterPricePage';
import ReviewListingPage from './features/listings/pages/ReviewListingPage';
import ConfirmationPage from './features/listings/pages/ConfirmationPage';
import ListingDetailsPage from './features/buyer/pages/ListingDetailsPage'
import PurchaseReviewPage from './features/buyer/pages/PurchaseReviewPage';
import ForYouPage from './features/buyer/pages/ForYouPage';
import DemoReviewRedirect from './features/buyer/pages/DemoReviewRedirect';
import PurchaseConfirmationPage from './features/buyer/pages/PurchaseConfirmationPage';
import ConfirmationRatingPage from './features/buyer/pages/ConfirmationRatingPage';
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


      <Route path="/for-you"                element={<ForYouPage />} />
      <Route path="/for-you/listing/:id"    element={<ListingDetailsPage />} />
      <Route path="/for-you/review/:id"     element={<PurchaseReviewPage />} />
      <Route path="/for-you/confirmation" element={<PurchaseConfirmationPage />} />
      <Route path="/for-you/rate" element={<ConfirmationRatingPage />} />
      <Route path="/demo-review" element={<DemoReviewRedirect />} />

     </Routes>
  );
};

export default App
