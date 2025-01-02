import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Page2 = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Page 2
      </Typography>
      <Typography variant="body1" paragraph>
        This is another template page. Content for the second step in the tutorial goes here.
      </Typography>
      <Button variant="contained" color="secondary">
        Example Button
      </Button>
    </Box>
  );
};

export default Page2;
