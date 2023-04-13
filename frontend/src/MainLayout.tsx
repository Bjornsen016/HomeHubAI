import React from 'react';
import Header from './components/Header';
import { ModuleProvider } from './ModuleContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ModuleProvider>
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </ModuleProvider>
  );
};

export default MainLayout;
