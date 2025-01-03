import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar } from '@mui/material';

const Person = ({ onAlignmentChange, content, openMindedness, criticality, confirmationBias, swayability }) => {
  // Initial alignment values for red, blue, and green
  const [alignment, setAlignment] = useState({
    red: 33.3,
    blue: 33.3,
    green: 33.3,
  });

  // Snackbar for "IGNORED" message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const processContent = (content) => {
    if (!content) return;

    // Step 1: Check if the content should be processed based on openMindedness
    const preferentialAlignment = alignment.red > alignment.blue && alignment.red > alignment.green
      ? '#FF0000'
      : alignment.blue > alignment.green
      ? '#0000FF'
      : '#008000';

    if (content.color !== preferentialAlignment) {
      const chance = Math.random() * 100;
      if (chance > openMindedness) {
        setOpenSnackbar(true); // Display the "IGNORED" message
        return;
      }
    }

    // Step 2: Apply confirmation bias if content matches alignment
    let adjustedValidity = content.validity;
    if (content.color === preferentialAlignment) {
      adjustedValidity += confirmationBias;
      adjustedValidity = Math.min(Math.max(adjustedValidity, 0), 100); // Ensure validity stays within 0-100 range
    }
    if (content.color !== preferentialAlignment) {
        adjustedValidity -= confirmationBias;
        adjustedValidity = Math.min(Math.max(adjustedValidity, 0), 100); // Ensure validity stays within 0-100 range
      }

    // Step 3: Check if adjusted validity passes criticality threshold
    if (adjustedValidity < criticality) {
      setOpenSnackbar(true); // Display the "IGNORED" message
      return;
    }

    // Step 4: Calculate alignment change based on content color and swayability
    const swayFactor = swayability / 100;
    let newAlignment = { ...alignment }; 
    if (content.color === '#FF0000') { // Red content
      newAlignment.red = swayFactor * 100 + (1 - swayFactor) * alignment.red;
      newAlignment.blue = swayFactor * 0 + (1 - swayFactor) * alignment.blue;
      newAlignment.green = swayFactor * 0 + (1 - swayFactor) * alignment.green;
    } else if (content.color === '#0000FF') { // Blue content
      newAlignment.red = swayFactor * 0 + (1 - swayFactor) * alignment.red;
      newAlignment.blue = swayFactor * 100 + (1 - swayFactor) * alignment.blue;
      newAlignment.green = swayFactor * 0 + (1 - swayFactor) * alignment.green;
    } else if (content.color === '#008000') { // Green content
      newAlignment.red = swayFactor * 0 + (1 - swayFactor) * alignment.red;
      newAlignment.blue = swayFactor * 0 + (1 - swayFactor) * alignment.blue;
      newAlignment.green = swayFactor * 100 + (1 - swayFactor) * alignment.green;
    }
    setAlignment(newAlignment);
    onAlignmentChange(newAlignment);
  };

  // Call processContent whenever content is updated
  useEffect(() => {
    processContent(content);
  }, [content]);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 150,
        height: 150,
        backgroundImage: 'url(/assets/person.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >

      {/* Non-intrusive "IGNORED" message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="IGNORED"
      />
    </Box>
  );
};

export default Person;
