import React, { useState } from 'react';
import { Box, Slider, IconButton, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const ControlPanel = () => {
  const [values, setValues] = useState({
    openMindedness: 50,
    confirmationBias: 50,
    swayability: 50,
  });

  const handleSliderChange = (event, newValue, label) => {
    setValues((prevValues) => ({
      ...prevValues,
      [label]: newValue,
    }));
  };

  const labels = ["Closed-Mindedness", "Confirmation Bias", "Swayability"];
  
  const tooltips = [
    "How unlikely one is to digest new content. This value is the required score for new content to take effect.",
    "How much one special preference is given. This value is added to the content's score if it matches the top alignment.",
    "How likely one is to change their opinion",
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '20%',
        right: '5%',
        width: '20%',
        height: '50%',
        borderRadius: '8px',
        padding: 2,
      }}
    >
      {labels.map((label, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tooltip title={tooltips[index]} arrow>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body1" sx={{ flex: 1 }}>
              {label}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'right' }}>
              {values[label.toLowerCase().replace(/\s+/g, '')]}
            </Typography>
          </Box>

          <Slider
            value={values[label.toLowerCase().replace(/\s+/g, '')]}
            onChange={(e, newValue) => handleSliderChange(e, newValue, label.toLowerCase().replace(/\s+/g, ''))}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            min={0}
            max={100}
            sx={{ marginTop: 1 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ControlPanel;
