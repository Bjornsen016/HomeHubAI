import React from 'react';
import { useAuth } from '../AuthProvider';
import { useThemeContext } from '../ThemeContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header: React.FC = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const { toggleDarkMode } = useThemeContext();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" flexGrow={1}>
          Home Hub AI
        </Typography>
        <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
          {document.body.classList.contains('MuiTheme-root') ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        {user ? (
          <Box>
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ marginRight: 1 }}
            >
              {user.displayName}
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Sign out
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={handleSignIn}>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
