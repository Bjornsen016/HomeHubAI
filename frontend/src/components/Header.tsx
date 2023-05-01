import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../ThemeContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUserAuthContext } from '../UserAuthProvider';

declare var google: any;

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const { accessToken, setAccessToken, userInfo, setUserInfo } =
    useUserAuthContext();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setAccessToken(null);
      setUserInfo(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = async () => {
    const clientId =
      '448042669503-ktadb30nns4j7pvo4os0eutgilcb9ipp.apps.googleusercontent.com';

    const client = google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope:
        'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks.readonly',
      ux_mode: 'popup',
      callback: async (response: any) => {
        var newResponse = await fetch(
          'http://localhost:5001/api/auth/authenticate',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: response.code,
              authuser: response.authuser,
            }),
          }
        );

        if (newResponse.ok) {
          const data = await newResponse.json();
          const userEmail = data.email;
          const resp = await fetch(`http://localhost:5001/api/user/updateSettings/${userEmail}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ darkMode: darkMode })
          });

          setAccessToken({
            token: data.accessToken,
            expiryTime: new Date(data.accessTokenExpirationTime),
          });
          setUserInfo({
            name: data.name,
            picture: data.picture,
            email: data.email,
          });
        } else {
          throw new Error('Authentication failed');
        }
      },
    });

    try {
      await client.requestCode();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6" component="div">
            Home Hub AI
          </Typography>
          <Typography variant="h6" component="div">
            {currentTime.toLocaleTimeString()}
          </Typography>
          <Box display="flex">
            <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
              {document.body.classList.contains('MuiTheme-root') ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {userInfo ? (
              <Box>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ margin: 1 }}
                >
                  {userInfo?.name}
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
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
