import React, { useState, useEffect } from 'react';
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

const TV = ({ color, validity, popularity, aggression, isSelected }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isSelected) {
      
      setIsAnimating(false);
      const animationResetTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 0); 

      return () => clearTimeout(animationResetTimer);
    }
  }, [isSelected]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', width: '120px', marginBottom: 1 }}>
        <LinearProgress
          variant="determinate"
          value={validity}
          sx={{
            height: '20px',
            borderRadius: '5px',
            width: '100%',
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#76c7c0',
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
          Validity
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: '120px', marginBottom: 1 }}>
        <LinearProgress
          variant="determinate"
          value={popularity}
          sx={{
            height: '20px',
            borderRadius: '5px',
            width: '100%',
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#ffcc00',
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
          Popularity
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: '120px', marginBottom: 2 }}>
        <LinearProgress
          variant="determinate"
          value={aggression}
          sx={{
            height: '20px',
            borderRadius: '5px',
            width: '100%',
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#ff5733',
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
          Aggression
        </Typography>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '25px',
          backgroundColor: color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          animation: isAnimating ? 'growShrink 0.2s ease-in-out' : 'none',
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
