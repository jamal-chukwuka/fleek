// src/components/Header.tsx
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigating
  };


  return (
    <header className="header flex-row center space-between" style={{ padding: '1rem', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#1A1A1A' }}>
      <img src="/fleek-logo.png" 
            alt="Fleek Logo" 
            className="logo-image" 
            onClick={() => navigate('/for-you')}
            />
      </div>
      {/* <div className="menu-icon">
        <div style={{ width: 25, height: 2, background: '#1A1A1A', marginBottom: 5 }}></div>
        <div style={{ width: 25, height: 2, background: '#1A1A1A', marginBottom: 5 }}></div>
        <div style={{ width: 25, height: 2, background: '#1A1A1A' }}></div>
      </div> */}


<div className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {menuOpen && (
        <div className="hamburger-menu">
          <button onClick={() => handleNavigate('/for-you')}>For You</button>
          <button onClick={() => handleNavigate('/listing/photos')}>New Listing</button>
        </div>
      )}
    </header>
  );
};

export default Header;
