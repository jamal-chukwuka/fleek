import { Routes, Route } from 'react-router-dom';
import WelcomePage  from './features/listings/WelcomePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
     </Routes>
  );
};

export default App
