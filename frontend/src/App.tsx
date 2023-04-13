import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from './Home';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
