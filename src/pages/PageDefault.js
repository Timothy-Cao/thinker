import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PageDefault = ({pageNum}) => {
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
        Title {pageNum}
      </Typography>
      <Typography variant="body1" paragraph>
        Description {pageNum}
      </Typography>
      <Button variant="contained" color="primary">
        Button {pageNum}
      </Button>
    </Box>
  );
};

export default PageDefault;
