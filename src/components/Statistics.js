import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import BarGraph from '../components/BarGraph';
import FullControlPanel from '../components/FullControlPanel';

const Statistics = () => {
  const [alignmentData, setAlignmentData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const [controlValues, setControlValues] = useState({
    openMindedness: 50,
    criticality: 50,
    confirmationBias: 25,
    swayability: 30,
  });

  const [tvAttributes, setTvAttributes] = useState([
    { color: 'cyan', validity: 25, popularity: 35, polarization: 35 },
    { color: 'magenta', validity: 50, popularity: 15, polarization: 50 },
    { color: 'yellow', validity: 75, popularity: 5, polarization: 75 },
  ]);

  const roundToOneDecimal = (value) => Math.max(0, Math.min(100, parseFloat(value.toFixed(1))));

  const normalRandom = (mean, variance) => {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.round(mean + z * variance);
  };

  const processLikelihood = (contentAlignment, currentAlignment) => {
    if (contentAlignment === currentAlignment) {
      return 1; 
    }
  
    const biasFactor = controlValues.confirmationBias / 100;
    return biasFactor; 
  };
  

  const simulatePerson = () => {
    let alignment = { cyan: 33.3, magenta: 33.3, yellow: 33.3 };
    let swayability = controlValues.swayability;
  
    for (let i = 0; i < 50; i++) {
      if (swayability <= 0) break;
  
      const selectedTV = pickTV();
      const { color, validity, polarization } = selectedTV;
  
      const preferentialAlignment = 
        alignment.cyan > alignment.magenta && alignment.cyan > alignment.yellow
          ? 'cyan'
          : alignment.magenta > alignment.yellow
          ? 'magenta'
          : 'yellow';
  
      let adjustedValidity = normalRandom(validity, 35); 
  
      const processLikelihoodValue = processLikelihood(color, preferentialAlignment);
      if (Math.random() > processLikelihoodValue) {
        continue;
      }
  
      if (color === preferentialAlignment) {
        adjustedValidity += controlValues.confirmationBias;
      } else {
        adjustedValidity -= controlValues.confirmationBias;
      }
  
      if (adjustedValidity < controlValues.criticality) {
        continue;
      }
  
      const swayFactor = swayability / 100;
      const polarizationInfluence = polarization / 100;
      const totalInfluence = swayFactor * polarizationInfluence;
  
      if (color === 'cyan') {
        alignment.cyan = roundToOneDecimal(totalInfluence * 100 + (1 - totalInfluence) * alignment.cyan);
        alignment.magenta = roundToOneDecimal((1 - totalInfluence) * alignment.magenta);
        alignment.yellow = roundToOneDecimal((1 - totalInfluence) * alignment.yellow);
      } else if (color === 'magenta') {
        alignment.cyan = roundToOneDecimal((1 - totalInfluence) * alignment.cyan);
        alignment.magenta = roundToOneDecimal(totalInfluence * 100 + (1 - totalInfluence) * alignment.magenta);
        alignment.yellow = roundToOneDecimal((1 - totalInfluence) * alignment.yellow);
      } else if (color === 'yellow') {
        alignment.cyan = roundToOneDecimal((1 - totalInfluence) * alignment.cyan);
        alignment.magenta = roundToOneDecimal((1 - totalInfluence) * alignment.magenta);
        alignment.yellow = roundToOneDecimal(totalInfluence * 100 + (1 - totalInfluence) * alignment.yellow);
      }
  
      swayability = Math.max(swayability - 1, 0);
    }
  
    return alignment;
  };
  

  const pickTV = () => {
    const totalPopularity = tvAttributes.reduce((acc, tv) => acc + tv.popularity, 0);
    const randomValue = Math.random() * totalPopularity;
    let cumulativePopularity = 0;

    for (let i = 0; i < tvAttributes.length; i++) {
      cumulativePopularity += tvAttributes[i].popularity;
      if (randomValue <= cumulativePopularity) {
        return tvAttributes[i];
      }
    }

    return tvAttributes[0];
  };

  const simulate1000People = () => {
    setIsSimulating(true);
    let results = [];

    for (let i = 0; i < 1000; i++) {
      results.push(simulatePerson());
    }

    setAlignmentData(results);
    setIsSimulating(false);
  };

  const averageAlignment = () => {
    if (alignmentData.length === 0) return { cyan: 0, magenta: 0, yellow: 0 };

    return alignmentData.reduce(
      (acc, alignment) => {
        acc.cyan += alignment.cyan;
        acc.magenta += alignment.magenta;
        acc.yellow += alignment.yellow;
        return acc;
      },
      { cyan: 0, magenta: 0, yellow: 0 }
    );
  };

  const alignmentCounts = () => {
    let counts = { cyan: 0, magenta: 0, yellow: 0 };

    alignmentData.forEach((alignment) => {
      const topAlignment = getTopAlignment(alignment);
      counts[topAlignment] += 1;
    });

    return counts;
  };

  const getTopAlignment = (alignment) => {
    const maxAlignment = Math.max(alignment.cyan, alignment.magenta, alignment.yellow);
    if (maxAlignment === alignment.cyan) return 'cyan';
    if (maxAlignment === alignment.magenta) return 'magenta';
    return 'yellow';
  };

  const displayData = () => {
    const total = alignmentData.length;
    const avgAlignment = averageAlignment();

    return {
      cyan: avgAlignment.cyan / total,
      magenta: avgAlignment.magenta / total,
      yellow: avgAlignment.yellow / total,
    };
  };

  const counts = alignmentCounts();

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <FullControlPanel
        controlValues={controlValues}
        setControlValues={setControlValues}
        tvAttributes={tvAttributes}
        setTvAttributes={setTvAttributes}
      />
      <Button variant="contained" color="primary" onClick={simulate1000People} disabled={isSimulating}>
        {isSimulating ? 'Simulating...' : 'Simulate 1000'}
      </Button>
      <Box sx={{ marginTop: 4 }}>
        {alignmentData.length > 0 && (
          <>
            <h3>Average Alignment After 1000 Simulations</h3>
            <BarGraph alignment={displayData()} />
            <Box sx={{ marginTop: 4 }}>
              <h4>Average Alignment Values:</h4>
              <p>Cyan: {displayData().cyan.toFixed(2)}</p>
              <p>Magenta: {displayData().magenta.toFixed(2)}</p>
              <p>Yellow: {displayData().yellow.toFixed(2)}</p>

              <h4>Number of People with Top Alignment:</h4>
              <p>Cyan: {counts.cyan}</p>
              <p>Magenta: {counts.magenta}</p>
              <p>Yellow: {counts.yellow}</p>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Statistics;
