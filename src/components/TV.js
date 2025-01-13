import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const growShrinkAnimation = `
  @keyframes growShrink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ProgressBar = ({ label, value, barColor }) => (
  <Box sx={{ position: 'relative', width: '120px', marginBottom: 1 }}>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: '20px',
        borderRadius: '5px',
        width: '100%',
        backgroundColor: '#f0f0f0',
        '& .MuiLinearProgress-bar': {
          backgroundColor: barColor,
        },
      }}
    />
    <Typography
      variant="body2"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#000',
      }}
    >
      {label}
    </Typography>
  </Box>
);

const TV = ({ color, validity, popularity, Polarization, isSelected }) => {
  const [animationKey, setAnimationKey] = useState(0);

  // trigger animation key upon isSelected changes
  useEffect(() => {
    if (isSelected) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [isSelected]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ProgressBar label="Validity" value={validity} barColor="#999999" />
      <ProgressBar label="Frequency" value={popularity} barColor="#999999" />
      <ProgressBar label="Polarization" value={Polarization} barColor="#999999" />

      <Box
        key={animationKey}
        sx={{
          width: 120,
          height: 120,
          borderRadius: '25px',
          backgroundColor: color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          animation: 'growShrink 0.2s ease-in-out',
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundImage: 'url(/assets/tv.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
          }}
        />
      </Box>
      <style>{growShrinkAnimation}</style>
    </Box>
  );
};

export default TV;
