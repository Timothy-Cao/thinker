import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Page3 = () => {
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
        maxWidth: '900px',
        margin: '0 auto',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Defining Terms
      </Typography>
      <br />

      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Validity:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            A variable from 0 - 100 that is examined by the consumer to determine if the content will be digested.
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Frequency:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            A variable from 1 - 100. When content is randomly generated, the TV's weight determines the likelihodd of that TV generating content. 
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Polarization & Swayability:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            Both are variables from 0 - 100. They are multiplied together as a percentage to determine how much alignment changes when digesting content. Product of 0% implies an unchanging opinion. 
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Confirmation Bias:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            A variable from 0 - 100 that is added to a consumer percieved content validity. A 100 will cause the user to always pick their current alignment. 
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Criticality:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            A variable from 0 - 100 which is the minimum percieved validity for the user to digest content it recieves. 
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
          OpenMindedness:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            A variable from 0 - 100 which is the probability a non-top-alignment content is rejected without consideration. 
          </Typography>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleNextStep} sx={{ mt: 3 }}>
        Run Simulations
      </Button>
    </Box>
  );
};

export default Page3;
