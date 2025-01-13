import React, { useState, useRef } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TV from '../components/TV';
import Person from '../components/Person';
import BarGraph from '../components/BarGraph';
import ControlPanel from '../components/ControlPanel';
import Newspaper from '../components/Newspaper';

const Simulation = () => {
  const theme = useTheme();

  const tvAttributes = [
    { color: 'cyan', validity: 25, popularity: 75, Polarization: 75 },
    { color: 'magenta', validity: 50, popularity: 33, Polarization: 50 },
    { color: 'yellow', validity: 75, popularity: 33, Polarization: 25 },
  ];

  const [alignment, setAlignment] = useState({
    cyan: 33.3,
    magenta: 33.3,
    yellow: 33.3,
  });

  const [content, setContent] = useState(null);
  const [controlValues, setControlValues] = useState({
    openMindedness: 80,
    criticality: 70,
    confirmationBias: 15,
    swayability: 50,
  });

  const resetLogsRef = useRef(null); 
  const handleReset = () => {
    setAlignment({ cyan: 33.3, magenta: 33.3, yellow: 33.3 });
    setControlValues({
      openMindedness: 70,
      criticality: 50,
      confirmationBias: 15,
      swayability: 60,
    });
    
    if (resetLogsRef.current) {
      resetLogsRef.current(); 
    }
  };

  const normalRandom = (mean, stdDev) => {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z0 * stdDev;
  };

  const [animatedTVIndex, setAnimatedTVIndex] = useState(null);
  const [newspapers, setNewspapers] = useState([]);

  const personRef = useRef(null);
  const tvRefs = useRef([]);
  const holdTimeoutRef = useRef(null);
  const autoClickIntervalRef = useRef(null);

  const pickTV = () => {
    const totalPopularity = tvAttributes.reduce((acc, tv) => acc + tv.popularity, 0);
    const randomValue = Math.random() * totalPopularity;
    let cumulativePopularity = 0;

    let selectedIndex = null;
    for (let i = 0; i < tvAttributes.length; i++) {
      cumulativePopularity += tvAttributes[i].popularity;
      if (randomValue <= cumulativePopularity) {
        selectedIndex = i;
        break;
      }
    }

    if (selectedIndex !== null) {
      const selectedTV = tvRefs.current[selectedIndex];
      const personElement = personRef.current;

      if (selectedTV && personElement) {
        const tvRect = selectedTV.getBoundingClientRect();
        const personCenterX = window.innerWidth / 2;
        const personCenterY = window.innerHeight - window.innerHeight * 0.2 - 75;

        setNewspapers((prevNewspapers) => [
          ...prevNewspapers,
          {
            id: Date.now(),
            startX: tvRect.left + tvRect.width / 2 - 25,
            startY: tvRect.top + tvRect.height / 2 - 25,
            endX: personCenterX - 25,
            endY: personCenterY - 25,
          },
        ]);

        setTimeout(() => {
          const selectedContent = {
            color: tvAttributes[selectedIndex].color,
            validity: normalRandom(tvAttributes[selectedIndex].validity, 35),
            Polarization: tvAttributes[selectedIndex].Polarization,
          };

          setContent(selectedContent);
          setAnimatedTVIndex(selectedIndex);

          setTimeout(() => setAnimatedTVIndex(null), 300);
        }, 50);
      }
    }
  };

  const handleMouseDown = () => {
    holdTimeoutRef.current = setTimeout(() => {
      autoClickIntervalRef.current = setInterval(() => {
        pickTV();
      }, 100); //speed of watching
    }, 0); 
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimeoutRef.current);
    clearInterval(autoClickIntervalRef.current);
  };

  const handleMouseLeave = handleMouseUp;

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
            <div ref={(el) => (tvRefs.current[index] = el)}>
              <TV
                color={tv.color}
                validity={tv.validity}
                popularity={tv.popularity}
                Polarization={tv.Polarization}
                isSelected={index === animatedTVIndex}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <div ref={personRef}>
        <Person
        content={content}
        onAlignmentChange={setAlignment}
        onSwayabilityChange={(newSwayability) =>
          setControlValues((prev) => ({ ...prev, swayability: newSwayability }))
        }
        openMindedness={controlValues.openMindedness}
        swayability={controlValues.swayability}
        confirmationBias={controlValues.confirmationBias}
        criticality={controlValues.criticality}
        onResetLogs={(resetLogs) => (resetLogsRef.current = resetLogs)}
      />
      </div>
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          Hold to Watch TV
        </Button>
      </Box>

      {newspapers.map((newspaper) => (
        <Newspaper
          key={newspaper.id}
          startX={newspaper.startX}
          startY={newspaper.startY}
          endX={newspaper.endX}
          endY={newspaper.endY}
          onEnd={() => {
            setNewspapers((prevNewspapers) =>
              prevNewspapers.filter((n) => n.id !== newspaper.id)
            );
          }}
        />
      ))}

      <BarGraph alignment={alignment} />
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleReset}>
          Reset
        </Button>
      </Box>
      <ControlPanel
      values={controlValues}
      onValuesChange={setControlValues}
/>
    </Box>
  );
};

export default Simulation;
