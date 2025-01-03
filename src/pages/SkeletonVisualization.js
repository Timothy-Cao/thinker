import React from 'react';
import { Box, Grid, Slider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import ControlPanel from '../components/ControlPanel';

const SkeletonVisualization = () => {
  const theme = useTheme(); 

  const data = [
    { name: 'Alignment', red: 33.3, blue: 33.3, green: 33.3 },
  ];

  return (
    <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative', backgroundColor: theme.palette.background.default }}>
      {/* TVs (Views) */}
      <Grid container justifyContent="center" spacing={20} sx={{ position: 'absolute', top: '10%' }}>
        {[...Array(3)].map((_, index) => {
            const colors = ['#FF0000', '#0000FF', '#008000']; 
            return (
            <Grid item key={index}>
                <Box
                sx={{
                    width: 120, 
                    height: 120,
                    borderRadius: '25px', 
                    backgroundColor: colors[index], 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
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
            </Grid>
            );
        })}
        </Grid>


      {/* Person */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 150,
          height: 150,
          backgroundImage: 'url(/assets/person.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* Bar Graph */}
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

      <ControlPanel />
    </Box>
  );
};

export default SkeletonVisualization;
