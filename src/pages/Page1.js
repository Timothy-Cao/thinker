import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Page1 = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Page 1
      </Typography>
      <Typography variant="body1" paragraph>
        This is a template page. You can add your content here as part of the tutorial.
      </Typography>
      <Button variant="contained" color="primary">
        Example Button
      </Button>
    </Box>
  );
};

export default Page1;
