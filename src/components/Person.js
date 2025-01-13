import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Console from './Console'; 

const Person = ({ onAlignmentChange, content, openMindedness, criticality, confirmationBias, swayability, onSwayabilityChange, onResetLogs, }) => {
  const [alignment, setAlignment] = useState({
    cyan: 33.3,
    magenta: 33.3,
    yellow: 33.3,
  });

  const [logs, setLogs] = useState([]);

const roundToOneDecimal = (value) => {
    const clampedValue = Math.min(Math.max(value, 0), 100); 
    return parseFloat(clampedValue.toFixed(1)); 
  };
  
  const resetLogs = () => {
    setLogs([]); 
  };

  useEffect(() => {
    if (onResetLogs) {
      onResetLogs(resetLogs); 
    }
  }, [onResetLogs]);

  const processContent = (content) => {
    if (!content) return;

    const logEntries = [...logs]; 

    // Step 1: Check if the content should be processed based on openMindedness
    const preferentialAlignment = alignment.cyan > alignment.magenta && alignment.cyan > alignment.yellow
      ? 'cyan'
      : alignment.magenta > alignment.yellow
      ? 'magenta'
      : 'yellow';
      
    let statusMessage = `${content.color} Persuasiveness: ${roundToOneDecimal(content.validity)}`;

    if (content.color !== preferentialAlignment) {
      const chance = Math.random() * 100;
      if (chance > openMindedness) {
        statusMessage += ` <br /> REJECTED Closed minded`;
        logEntries.push(statusMessage); 
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
        statusMessage += ` <br /> REJECTED Not convincing enough`;
      logEntries.push(statusMessage); 
      setLogs(logEntries);
      return;
    }

  // Step 4: Calculate alignment change based on content color and swayability
  const swayFactor = swayability / 100;
  const PolarizationInfluence = content.Polarization / 100; 
  const totalInfluence = swayFactor * PolarizationInfluence;

  let newAlignment = { ...alignment }; 
  if (content.color === 'cyan') { 
    newAlignment.cyan = roundToOneDecimal(totalInfluence * 100 + (1 - totalInfluence) * alignment.cyan);
    newAlignment.magenta = roundToOneDecimal(totalInfluence * 0 + (1 - totalInfluence) * alignment.magenta);
    newAlignment.yellow = roundToOneDecimal(totalInfluence * 0 + (1 - totalInfluence) * alignment.yellow);
  } else if (content.color === 'magenta') { 
    newAlignment.cyan = roundToOneDecimal(totalInfluence * 0 + (1 - totalInfluence) * alignment.cyan);
    newAlignment.magenta = roundToOneDecimal(totalInfluence * 100 + (1 - totalInfluence) * alignment.magenta);
    newAlignment.yellow = roundToOneDecimal(totalInfluence * 0 + (1 - totalInfluence) * alignment.yellow);
  } else if (content.color === 'yellow') { 
    newAlignment.cyan = roundToOneDecimal(totalInfluence * 0 + (1 - totalInfluence) * alignment.cyan);
    newAlignment.magenta = roundToOneDecimal(totalInfluence * 0 + (1 - totalInfluence) * alignment.magenta);
    newAlignment.yellow = roundToOneDecimal(totalInfluence * 100 + (1 - totalInfluence) * alignment.yellow);
  }

  // Decaying swayability due to lost of plastic thinking
    const updatedSwayability = Math.max(swayability - 1, 0);
    onSwayabilityChange(updatedSwayability);
    setAlignment(newAlignment);
    onAlignmentChange(newAlignment);

    statusMessage += ` ACCEPTED`;
    logEntries.push(statusMessage); 
    setLogs(logEntries);
  };
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
