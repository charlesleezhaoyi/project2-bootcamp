import { Box, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { hourglass } from 'ldrs';

hourglass.register();

const CountdownTimer = ({
  initialTime,
  moveToNextQuestion,
  indexOfQuestion,
  quizDataPoliticalLandmarks,
  resetQuiz,
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clearing the interval everytime time variable is updated (i.e., 1 second has passed)
    if (time === 0) {
      moveToNextQuestion();
      setTime(initialTime);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [
    time,
    moveToNextQuestion,
    initialTime,
    indexOfQuestion,
    quizDataPoliticalLandmarks,
    resetQuiz,
  ]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        sx={{
          marginLeft: '30px',
          marginRight: '30px',
          marginBottom: '30px',
          color: 'maroon',
          fontWeight: 'bold',
        }}
        variant="h5"
      >
        {time} seconds left to next question!
      </Typography>

      <l-hourglass
        size="40"
        bg-opacity="0.1"
        speed="1.75"
        color="maroon"
      ></l-hourglass>
    </Box>
  );
};

export default CountdownTimer;
