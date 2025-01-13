import React from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const BarGraph = ({ alignment }) => {
  const data = [
    {
      name: 'Alignment',
      cyan: alignment.cyan,
      magenta: alignment.magenta,
      yellow: alignment.yellow,
    },
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '20%',
        height: '50%',
        borderRadius: '8px',
        padding: 2,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="5px">
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Bar dataKey="cyan" name="cyan" fill="#00FFFF" />
          <Bar dataKey="magenta" name="magenta" fill="#FF00FF" />
          <Bar dataKey="yellow" name="yellow" fill="#FFFF00" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarGraph;
