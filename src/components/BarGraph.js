import React from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const BarGraph = ({ alignment }) => {
  const data = [
    {
      name: 'Alignment',
      red: alignment.red,
      blue: alignment.blue,
      green: alignment.green,
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
          <Bar dataKey="red" name="Red" fill="#FF0000" />
          <Bar dataKey="blue" name="Blue" fill="#0000FF" />
          <Bar dataKey="green" name="Green" fill="#008000" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarGraph;
