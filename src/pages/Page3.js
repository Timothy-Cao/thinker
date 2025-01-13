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
        {/* Validity */}
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Validity:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            Represents the hidden variable indicating the truthfulness of content. For a TV, it reflects the average truthfulness of its content.
          </Typography>
        </Grid>

        {/* Popularity */}
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Popularity:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            Correlates with how often content is produced for consumers. TV channels are randomized in a selection bag based on their weights to determine which one produces content.
          </Typography>
        </Grid>

        {/* Polarization & Swayability */}
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Polarization & Swayability:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            Both affect how much a person’s alignment changes after consuming content. Polarization applies to TVs, while swayability describes the user. Swayability decreases over time due to fatigue.
          </Typography>
        </Grid>

        {/* Confirmation Bias */}
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Confirmation Bias:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            Represents the tendency to favor content that aligns with one's beliefs. It adds to the score of aligned content and reduces the score of misaligned content.
          </Typography>
        </Grid>

        {/* Criticality */}
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            Criticality:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            The threshold above which information is impactful enough to change beliefs. Content validity must exceed this threshold to influence the individual.
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
