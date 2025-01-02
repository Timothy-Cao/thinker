import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startTutorial = () => {
    navigate('/page/1');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Hello, fellow thinker!
      </Typography>
      <Typography variant="body1" paragraph>
        Simulate the act of thinking in the face of cognitive biases.
      </Typography>
      <Button variant="contained" color="primary" onClick={startTutorial}>
        Start simulation
      </Button>
    </Box>
  );
};

export default Home;
