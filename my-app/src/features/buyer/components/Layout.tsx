// src/components/Layout.tsx
import React, { FC, ReactNode } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="flex-col">
    <Header />
    <main className="container" >
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
