// src/components/Footer.tsx
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <footer className="footer flex-row center space-around" style={{ backgroundColor: '#fff', borderTop: '1px solid #ddd', padding: '0.5rem 0' }}>
      <button className="footer-btn flex-col center" onClick={() => navigate('/listing/photos')}>
        <PlusIcon className="icon" style={{ height: 24, color: isActive('/listing') ? '#660099' : '#4D4D4D' }} />
        <span className={isActive('/listing') ? 'footer-active' : ''}>New Listing</span>
      </button>

      <button className="footer-btn flex-col center" onClick={() => navigate('/for-you')}>
        <SparklesIcon className="icon" style={{ height: 24, color: isActive('/for-you') ? '#660099' : '#4D4D4D' }} />
        <span className={isActive('/for-you') ? 'footer-active' : ''}>For You</span>
      </button>
    </footer>
  );
};

export default Footer;
