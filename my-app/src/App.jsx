import { Routes, Route } from 'react-router-dom';
import WelcomePage  from './features/listings/WelcomePage'
import AddPhotosPage from './features/listings/pages/AddPhotosPage';
import PhotoReviewPage from './features/listings/pages/PhotoReviewPage';
import EnterDetailsPage from './features/listing/components/EnterDetailsPage';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/listing/photos" element={<AddPhotosPage />} />
      <Route path="/listing/review-photos" element={<PhotoReviewPage />} />
      <Route path="/listing/details" element={<EnterDetailsPage />} />
      <Route path="/listing/price" element={<EnterDetailsPage />} />

     </Routes>
  );
};

export default App
