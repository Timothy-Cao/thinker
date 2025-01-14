import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Page5 = () => {
  const navigate = useNavigate(); 

  const handleBackToPage4 = () => {
    navigate('/page/4'); 
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
    }}>
      <Typography variant="h4" gutterBottom>
        Peculiar Property #1
      </Typography>
      <Typography variant="body1" paragraph>
        Have you discovered anything peculiar after playing with the settings?
      </Typography>
      <Typography variant="body1" paragraph> Try this: Set  
  <span style={{ color: 'red' }}> OpenMindedness to 100</span>, 
  and <span style={{ color: 'red' }}>Criticality to 0</span>.
</Typography>

      <Typography variant="body1" paragraph>
        Now adjust the 
        <span style={{ color: 'red' }}> confirmation bias from 0 to 50 to 100</span>. What do you notice about the alignments? How does confirmation bias affect those who are never critical and always open?
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToPage4}>
        Go Back to Page 4
      </Button>
    </Box>
  );
};

export default Page5;
