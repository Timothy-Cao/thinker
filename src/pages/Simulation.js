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

  const [animatedTVIndex, setAnimatedTVIndex] = useState(null);
  const [newspapers, setNewspapers] = useState([]); // Use an array to store multiple newspapers

  const personRef = useRef(null);
  const tvRefs = useRef([]);

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
        const personCenterX = window.innerWidth / 2; // Horizontal center of the viewport
        const personCenterY = window.innerHeight - window.innerHeight * 0.2 - 75; // Bottom 20% and half the person's height (75px)

        // Add new newspaper to the list of newspapers with unique id
        setNewspapers((prevNewspapers) => [
          ...prevNewspapers,
          {
            id: Date.now(), // Use a unique ID based on current timestamp or some other unique value
            startX: tvRect.left + tvRect.width / 2 - 25, // Center the newspaper on the TV
            startY: tvRect.top + tvRect.height / 2 - 25, // Center the newspaper on the TV
            endX: personCenterX - 25, // Center the newspaper on the person
            endY: personCenterY - 25, // Center the newspaper on the person
          },
        ]);

        // Trigger content processing after animation starts
        setTimeout(() => {
          const selectedContent = {
            color: tvAttributes[selectedIndex].color,
            validity: normalRandom(tvAttributes[selectedIndex].validity, 35), // Generate validity
            aggression: tvAttributes[selectedIndex].aggression,
          };

          setContent(selectedContent); // Trigger content processing in Person
          setAnimatedTVIndex(selectedIndex);

          setTimeout(() => setAnimatedTVIndex(null), 300);
        }, 50); // Small delay to ensure the animation starts first
      }
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
            <div ref={(el) => (tvRefs.current[index] = el)}>
              <TV
                color={tv.color}
                validity={tv.validity}
                popularity={tv.popularity}
                aggression={tv.aggression}
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
          openMindedness={controlValues.openMindedness}
          swayability={controlValues.swayability}
          confirmationBias={controlValues.confirmationBias}
          criticality={controlValues.criticality}
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
        <Button variant="contained" color="primary" onClick={pickTV}>
          Watch TV
        </Button>
      </Box>

      {/* Render all newspapers */}
      {newspapers.map((newspaper) => (
        <Newspaper
          key={newspaper.id} // Use unique key instead of index
          startX={newspaper.startX}
          startY={newspaper.startY}
          endX={newspaper.endX}
          endY={newspaper.endY}
          onEnd={() => {
            setNewspapers((prevNewspapers) =>
              prevNewspapers.filter((n) => n.id !== newspaper.id) // Use id to filter out the correct newspaper
            );
          }}
        />
      ))}

      <BarGraph alignment={alignment} />
      <ControlPanel onValuesChange={setControlValues} />
    </Box>
  );
};

export default Simulation;
