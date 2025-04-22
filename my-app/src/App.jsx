import { Routes, Route } from 'react-router-dom';
import WelcomePage  from './features/listings/WelcomePage'
import AddPhotosPage from './features/listings/pages/AddPhotosPage';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/listing/photos" element={<AddPhotosPage />} />

     </Routes>
  );
};

export default App
