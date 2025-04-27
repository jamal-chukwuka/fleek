// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header flex-row center space-between" style={{ padding: '1rem', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#1A1A1A' }}>
        [Logo]
      </div>
      <div className="menu-icon">
        <div style={{ width: 25, height: 2, background: '#1A1A1A', marginBottom: 5 }}></div>
        <div style={{ width: 25, height: 2, background: '#1A1A1A', marginBottom: 5 }}></div>
        <div style={{ width: 25, height: 2, background: '#1A1A1A' }}></div>
      </div>
    </header>
  );
};

export default Header;
