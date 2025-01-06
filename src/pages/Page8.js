import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Page2 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        overflow: 'hidden', 
      }}
    >
      <Typography variant="h4" gutterBottom>
        Exploring Perceptions of Information
      </Typography>
      <Typography variant="body1" paragraph>
        The goal of this simulation is to explore how factors like open-mindedness, criticality, confirmation bias, and swayability 
        influence the way we process and digest information.
      </Typography>
      <Typography variant="body1" paragraph>
        We will also investigate how the validity, frequency, and aggressiveness of information sources affect people's perceptions 
        and acceptance of information.
      </Typography>
      <Button variant="contained" color="primary">
        Next Step
      </Button>
    </Box>
  );
};

export default Page2;
