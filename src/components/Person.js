import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Console from './Console'; // Import the Console component

const Person = ({ onAlignmentChange, content, openMindedness, criticality, confirmationBias, swayability }) => {
  // Initial alignment values for red, blue, and green
  const [alignment, setAlignment] = useState({
    red: 33.3,
    blue: 33.3,
    green: 33.3,
  });

  const [logs, setLogs] = useState([]);

const roundToOneDecimal = (value) => {
    const clampedValue = Math.min(Math.max(value, 0), 100); 
    return parseFloat(clampedValue.toFixed(1)); 
  };
  
  const getColorName = (hex) => {
    switch (hex) {
      case '#FF0000':
        return 'Red';
      case '#0000FF':
        return 'Blue';
      case '#008000':
        return 'Green';
      default:
        return 'Unknown';
    }
  };

  const processContent = (content) => {
    if (!content) return;

    const logEntries = [...logs]; 

    // Step 1: Check if the content should be processed based on openMindedness
    const preferentialAlignment = alignment.red > alignment.blue && alignment.red > alignment.green
      ? '#FF0000'
      : alignment.blue > alignment.green
      ? '#0000FF'
      : '#008000';

    let statusMessage = `Incoming Content: ${getColorName(content.color)} - Validity: ${roundToOneDecimal(content.validity)}`;

    if (content.color !== preferentialAlignment) {
      const chance = Math.random() * 100;
      if (chance > openMindedness) {
        statusMessage += ` | REJECTED (Open-mindedness: ${roundToOneDecimal(chance)} < ${roundToOneDecimal(openMindedness)})`;
        logEntries.push(statusMessage); // Log rejection reason
        setLogs(logEntries);
        return;
      }
    }

    // Step 2: Apply confirmation bias if content matches alignment
    let adjustedValidity = content.validity;
    if (content.color === preferentialAlignment) {
      adjustedValidity += confirmationBias;
      adjustedValidity = Math.min(Math.max(adjustedValidity, 0), 100); 
    }
    if (content.color !== preferentialAlignment) {
      adjustedValidity -= confirmationBias;
      adjustedValidity = Math.min(Math.max(adjustedValidity, 0), 100); 
    }

    // Step 3: Check if adjusted validity passes criticality threshold
    if (adjustedValidity < criticality) {
      statusMessage += ` | REJECTED (Validity): ${roundToOneDecimal(adjustedValidity)} < Criticality: ${roundToOneDecimal(criticality)})`;
      logEntries.push(statusMessage); // Log rejection reason
      setLogs(logEntries);
      return;
    }

    // Step 4: Calculate alignment change based on content color and swayability
    const swayFactor = swayability / 100;
    let newAlignment = { ...alignment }; 
    if (content.color === '#FF0000') { // Red content
      newAlignment.red = roundToOneDecimal(swayFactor * 100 + (1 - swayFactor) * alignment.red);
      newAlignment.blue = roundToOneDecimal(swayFactor * 0 + (1 - swayFactor) * alignment.blue);
      newAlignment.green = roundToOneDecimal(swayFactor * 0 + (1 - swayFactor) * alignment.green);
    } else if (content.color === '#0000FF') { // Blue content
      newAlignment.red = roundToOneDecimal(swayFactor * 0 + (1 - swayFactor) * alignment.red);
      newAlignment.blue = roundToOneDecimal(swayFactor * 100 + (1 - swayFactor) * alignment.blue);
      newAlignment.green = roundToOneDecimal(swayFactor * 0 + (1 - swayFactor) * alignment.green);
    } else if (content.color === '#008000') { // Green content
      newAlignment.red = roundToOneDecimal(swayFactor * 0 + (1 - swayFactor) * alignment.red);
      newAlignment.blue = roundToOneDecimal(swayFactor * 0 + (1 - swayFactor) * alignment.blue);
      newAlignment.green = roundToOneDecimal(swayFactor * 100 + (1 - swayFactor) * alignment.green);
    }

    setAlignment(newAlignment);
    onAlignmentChange(newAlignment);

    statusMessage += ` | ACCEPTED`;
    logEntries.push(statusMessage); 
    setLogs(logEntries);
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
          <Console logs={logs} />
    </Box>
  );
};

export default Person;
