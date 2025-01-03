import React, { useState, useCallback, useRef } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TV from '../components/TV';
import Person from '../components/Person';
import BarGraph from '../components/BarGraph';
import ControlPanel from '../components/ControlPanel';

const SkeletonVisualization = () => {
  const theme = useTheme();

  const tvAttributes = [
    { color: '#FF0000', validity: 25, popularity: 75, aggression: 75 },
    { color: '#0000FF', validity: 50, popularity: 33, aggression: 50 },
    { color: '#008000', validity: 75, popularity: 33, aggression: 25 },
  ];

  const [alignment, setAlignment] = useState({
    red: 33.3,
    blue: 33.3,
    green: 33.3,
  });

  const [content, setContent] = useState(null);
  const [controlValues, setControlValues] = useState({
    openMindedness: 80,
    criticality: 70,
    confirmationBias: 15,
    swayability: 20,
  });

  const lastUpdateTime = useRef(Date.now());

  // Throttled function to update alignment
  const handleAlignmentChange = useCallback((newAlignment) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 500) {
      return; // Don't process if it's less than 500ms since last update
    }
    lastUpdateTime.current = now;

    setAlignment(newAlignment);
  }, []);

  const handleControlValuesChange = (newValues) => {
    setControlValues(newValues);
  };

  const normalRandom = (mean, stdDev) => {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z0 * stdDev;
  };

  const pickTV = () => {
    const totalPopularity = tvAttributes.reduce((acc, tv) => acc + tv.popularity, 0);
    const randomValue = Math.random() * totalPopularity;
    let cumulativePopularity = 0;

    let selectedTV = null;
    for (let tv of tvAttributes) {
      cumulativePopularity += tv.popularity;
      if (randomValue <= cumulativePopularity) {
        selectedTV = tv;
        break;
      }
    }

    if (selectedTV) {
      // Generate the validity using a normal distribution
      const meanValidity = selectedTV.validity;
      const stdDev = 35; 
      let generatedValidity = normalRandom(meanValidity, stdDev);

      generatedValidity = Math.min(Math.max(generatedValidity, 0), 100);

      const generatedContent = {
        color: selectedTV.color,
        validity: generatedValidity,
        aggression: selectedTV.aggression,
      };

      setContent(generatedContent);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container justifyContent="center" spacing={20} sx={{ position: 'absolute', top: '10%' }}>
        {tvAttributes.map((tv, index) => (
          <Grid item key={index}>
            <TV color={tv.color} validity={tv.validity} popularity={tv.popularity} aggression={tv.aggression} />
          </Grid>
        ))}
      </Grid>
      <Person content={content} onAlignmentChange={handleAlignmentChange} openMindedness={controlValues.openMindedness}
        swayability={controlValues.swayability}
        confirmationBias={controlValues.confirmationBias}
        criticality={controlValues.criticality} />
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button variant="contained" color="primary" onClick={pickTV}>
          Watch TV
        </Button>
      </Box>
      <BarGraph alignment={alignment} />
      <ControlPanel onValuesChange={handleControlValuesChange} />
    </Box>
  );
};

export default SkeletonVisualization;
