import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const styleLogBubble = (log) => {
  if (log.includes('ACCEPTED')) {
    return { backgroundColor: 'rgba(0, 128, 0, 0.2)', content: log.replace('ACCEPTED', '') };
  }
  if (log.includes('REJECTED')) {
    return { backgroundColor: 'rgba(255, 0, 0, 0.2)', content: log.replace('REJECTED', '') };
  }
  return { backgroundColor: 'transparent', content: log };
};

const colorizeLog = (log) => {
  let coloredLog = log;

  coloredLog = coloredLog.replace(/\bRed\b/g, '<span style="color: red;">Red</span>');
  coloredLog = coloredLog.replace(/\bBlue\b/g, '<span style="color: blue;">Blue</span>');
  coloredLog = coloredLog.replace(/\bGreen\b/g, '<span style="color: green;">Green</span>');

  return coloredLog;
};

const Console = ({ logs }) => {
  const consoleRef = useRef();

  const trimmedLogs = logs.slice(-20);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]); 

  return (
    <Box
      ref={consoleRef}
      sx={{
        position: 'fixed',
        top: -600,
        right: -800,
        width: 400,
        height: 300,
        overflowY: 'auto', 
        color: 'white',
        padding: 2,
        borderRadius: 2,
      }}
    >
      {trimmedLogs.map((log, index) => {
        const { backgroundColor, content } = styleLogBubble(log);
        const coloredContent = colorizeLog(content); 
        return (
          <Paper
            key={index}
            sx={{
              padding: 1,
              marginBottom: 1,
              backgroundColor: backgroundColor, 
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              component="div" 
              dangerouslySetInnerHTML={{ __html: coloredContent }} 
            />
          </Paper>
        );
      })}
    </Box>
  );
};

export default Console;
