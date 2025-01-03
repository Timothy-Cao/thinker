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
        Title 2
      </Typography>
      <Typography variant="body1" paragraph>
        Description 2
      </Typography>
      <Button variant="contained" color="primary">
        Button 2
      </Button>
    </Box>
  );
};

export default Page2;
