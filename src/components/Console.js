import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Console = ({ logs }) => {
  // Create a reference to the container holding the logs
  const consoleRef = useRef();

  // Use effect to scroll to the bottom when logs change
  useEffect(() => {
    if (consoleRef.current) {
      // Scroll to the bottom of the console
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]); // Only run when logs change

  return (
    <Box
      ref={consoleRef}
      sx={{
        position: 'fixed',
        top: -600,
        right: -800,
        width: 400,
        height: 300,
        overflowY: 'auto', // Vertical scrolling
        color: 'white',
        padding: 2,
        borderRadius: 2,
      }}
    >
      {logs.map((log, index) => (
        <Paper key={index} sx={{ padding: 1, marginBottom: 1 }}>
          <Typography variant="body2">{log}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Console;
