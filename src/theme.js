
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
      paper: '#f4f6f8',
    },
    text: {
      primary: '#000000',
      secondary: '#4a4a4a',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});
