import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <FormControlLabel
      control={<Switch checked={theme === 'dark'} onChange={toggleTheme} />}
      label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    />
  );
};

export default ThemeToggle;
