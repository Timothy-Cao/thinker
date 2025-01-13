import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const styleLogBubble = (log) => {
  if (log.includes('ACCEPTED')) {
    return { backgroundColor: 'rgba(0, 255, 0, 0.2)', content: log.replace('ACCEPTED', '') };
  }
  if (log.includes('REJECTED')) {
    return { backgroundColor: 'rgba(255, 0, 0, 0.2)', content: log.replace('REJECTED', '') };
  }
  return { backgroundColor: 'transparent', content: log };
};

const colorizeLog = (log) => {
  let colocyanLog = log;
  colocyanLog = colocyanLog.replace(/\bcyan\b/g, '<span style="color: cyan; display: inline-block; width: 50px;">■ _ _</span>');
  colocyanLog = colocyanLog.replace(/\bmagenta\b/g, '<span style="color: magenta; display: inline-block; width: 50px;">_ ■ _</span>');
  colocyanLog = colocyanLog.replace(/\byellow\b/g, '<span style="color: yellow; display: inline-block; width: 50px;">_ _ ■</span>');
  

  return colocyanLog;
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
        const colocyanContent = colorizeLog(content); 
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
              dangerouslySetInnerHTML={{ __html: colocyanContent }} 
            />
          </Paper>
        );
      })}
    </Box>
  );
};

export default Console;
