import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const Page2 = () => {
  const navigate = useNavigate(); 

  const handleNextStep = () => {
    navigate(`/page/4`); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        overflow: 'hidden', 
        maxWidth: '700px',  
        margin: '0 auto',  
        padding: 2,        
      }}
    >
      <Typography variant="h4" gutterBottom>
        Defining terms
      </Typography>
      <br />
      <Typography variant="body1" paragraph>
        The goal of this simulation is to explore how factors like open-mindedness, criticality, confirmation bias, and swayability 
        influence the way we process and digest information.
      </Typography>
      <Typography variant="body1" paragraph>
        We will also investigate how the validity, frequency, and aggressiveness of information sources affect people's perceptions 
        and acceptance of information.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleNextStep}>
        Definitions
      </Button>
    </Box>
  );
};

export default Page2;
