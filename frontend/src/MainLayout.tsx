import React from 'react';
import Header from './components/Header';
import { ModuleProvider } from './ModuleContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ModuleProvider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <main style={{ flexGrow: 1, overflow: 'hidden' }}>{children}</main>
        </div>
    </ModuleProvider>
  );
};

export default MainLayout;
