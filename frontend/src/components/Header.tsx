// src/components/Header.tsx
import React from 'react';
import { useAuth } from '../AuthProvider';

const Header: React.FC = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <h1>HomeHubAI</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName || user.email}</p>
          <button className="login-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button className="login-logout-btn" onClick={signInWithGoogle}>
          Login with Google
        </button>
      )}
    </header>
  );
};

export default Header;
