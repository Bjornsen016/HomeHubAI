import React from 'react';
import MainLayout from './MainLayout';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeContextProvider, useThemeContext } from './ThemeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { UserAuthProvider } from './UserAuthProvider';


const AppContent: React.FC = () => {
  const { darkMode } = useThemeContext();
  const theme = useTheme();

  const backgroundColor = darkMode
    ? theme.palette.background.default
    : theme.palette.background.paper;

  return (
    <Router>
      <div style={{ backgroundColor }}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  const { darkMode } = useThemeContext();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
};

export default function AppWrapper() {
  return (
    <UserAuthProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </UserAuthProvider>
  );
}
