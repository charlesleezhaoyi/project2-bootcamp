import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { quantum } from 'ldrs';
import { chaoticOrbit } from 'ldrs';
import { useNavigate } from 'react-router-dom';

chaoticOrbit.register();

// Default values shown

quantum.register();

const ErrorOpenAI = ({ app }) => {
  const navigate = useNavigate();
  return (
    <Box
      className="overlay"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Typography>
          Too many requests! Please try again in 24 hours!
        </Typography>

        <Button
          sx={{ display: 'flex', justifyContent: 'center' }}
          onClick={() => {
            navigate('/');
          }}
        >
          Go back
        </Button>
      </Box>

      <l-chaotic-orbit size="35" speed="1.5" color="black"></l-chaotic-orbit>
    </Box>
  );
};

export default ErrorOpenAI;
