// src/components/Footer.tsx
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <footer className="footer bottom-nav flex-row">
      <button
        className={pathname === '/listing/new' ? 'active' : ''}
        onClick={() => navigate('/listing/photos')}
      >
        ＋<br/>New listing
      </button>
      <button
        className={pathname.startsWith('/for-you') ? 'active' : ''}
        onClick={() => navigate('/for-you')}
      >
        ✨<br/>For You
      </button>
      <button
        className={pathname === '/search' ? 'active' : ''}
        onClick={() => navigate('/search')}
      >
        🔍<br/>Search
      </button>
    </footer>
  );
};

export default Footer;
