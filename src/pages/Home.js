
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startTutorial = () => {
    navigate('/page/1');
  };

  return (
    <div>
      <h1>Hello, Thinker!</h1>
      <p>Investigate and visualize how people think in the face of cognitive biases and information sources.</p>
      <Button variant="contained" onClick={startTutorial}>
        Start Tutorial
      </Button>
    </div>
  );
};

export default Home;
