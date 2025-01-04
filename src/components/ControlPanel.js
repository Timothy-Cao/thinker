import React, { useState } from 'react';
import { Box, Slider, IconButton, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const ControlPanel = ({ onValuesChange }) => {
  const [values, setValues] = useState({
    openMindedness: 80,
    criticality: 70,
    confirmationBias: 15,
    swayability: 20,
  });

  const handleSliderChange = (event, newValue, key) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues, [key]: newValue };
      onValuesChange(newValues); 
      return newValues;
    });
  };

  const sliders = [
    { label: "Open-mindedness", key: "openMindedness", tooltip: "How often one allows content to be considered for digestion when it doesn't match their alignment." },
    { label: "Criticality", key: "criticality", tooltip: "How high is the bar for content digestion. This value is the required score for new content to take effect." },
    { label: "Confirmation Bias", key: "confirmationBias", tooltip: "How much one special preference is given. This value is added to the content's score if it matches the top alignment, and removed from other scores." },
    { label: "Swayability", key: "swayability", tooltip: "How much one's opinion is swayed when new content is digested." },
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
      {sliders.map((slider, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tooltip title={slider.tooltip} arrow>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body1" sx={{ flex: 1 }}>
              {slider.label}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'right' }}>
              {values[slider.key]}
            </Typography>
          </Box>

          <Slider
            value={values[slider.key]}
            onChange={(e, newValue) => handleSliderChange(e, newValue, slider.key)}
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
