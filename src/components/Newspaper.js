import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const Newspaper = ({ startX, startY, endX, endY, onEnd }) => {
  const [position, setPosition] = useState({ left: startX, top: startY });

  useEffect(() => {
    const moveNewspaper = () => {
      setPosition({ left: endX, top: endY });

      const endTimeout = setTimeout(() => {
        onEnd();
      }, 300); 

      return () => clearTimeout(endTimeout);
    };

    const timer = setTimeout(moveNewspaper, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [endX, endY, onEnd]);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        width: 50,
        height: 50,
        backgroundImage: 'url(/assets/newspaper.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transition: 'all 0.2s ease-in-out',
      }}
    />
  );
};

export default Newspaper;
