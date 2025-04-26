// src/components/Header.tsx
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Header: FC = () => (
  <header className="header">
    <nav className="nav">
      <NavLink to="/"       className="nav-link">Sell</NavLink>
      <NavLink to="/for-you" className="nav-link">Buy</NavLink>
      <NavLink to="/demo-notification" className="nav-link">Demo</NavLink>
    </nav>
  </header>
);

export default Header;
