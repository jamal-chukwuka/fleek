// src/components/Footer.tsx
import React, { FC } from 'react';

const Footer: FC = () => (
  <footer className="footer">
    © {new Date().getFullYear()} Fleek Marketplace — UIC Student-run
  </footer>
);

export default Footer;
