import { createTheme } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#303030',
      },
    },
  });

export default getTheme;
