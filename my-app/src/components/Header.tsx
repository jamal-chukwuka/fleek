// src/components/Header.tsx
import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="header top-bar flex-row">
      <div className="logo">[Logo]</div>
      <div className="hamburger">
        <span>☰</span>
      </div>
    </header>
  );
};

export default Header;
