import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import TutorialPage from './pages/PageHandler';
import { Box } from '@mui/material';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <div
          style={{
            height: '100vh',  
            margin: 0,      
            overflow: 'hidden',  
            display: 'flex',  
            flexDirection: 'column',
          }}
        >
          <Box sx={{ padding: '10px' }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page/:pageNum" element={<TutorialPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
