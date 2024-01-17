import { useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AppLinks } from '../AppMain';
import OpenAI from 'openai';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// MUI
import {
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Paper,
  ListItem,
} from '@mui/material';

const parseOpenAIResponse = (responseString) => {
  const lines = responseString.split('\n');

  const question = lines[0];

  const answer = lines[lines.length - 1].split(': ')[1];

  const arrayOfOptions = lines
    .slice(1, -1)
    .filter((line) => line.trim() !== '');

  const extractedData = arrayOfOptions.map((option) => {
    const letter = option.split(') ')[0];
    const choice = option.split(') ')[1];

    return { letter, choice };
  }); // Extracted Data is an array of objects with letter and choice as keys

  return { question, extractedData, answer };
};

export default function QuizAI({ user }) {
  // state for openai's response
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [indexOfQuestion, setIndexOfQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [selectedAnswerCorrectness, setSelectedAnswerCorrectness] =
    useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);

  const [loading, setLoading] = useState(false);

  const [quizCategory, setQuizCategory] = useState('');

  const quizDataNatureParks = [
    {
      question: 'Bukit Timah Nature Reserve',
      index: 0,
      category: 'Nature Parks',
    },
    { question: 'MacRitchie Reservoir', index: 1 },
    { question: 'Sungei Buloh Wetland Reserve', index: 2 },
    { question: 'Labrador Nature Reserve', index: 3 },
    { question: 'Pulau Ubin', index: 4 },
    { question: 'Coney Island Park', index: 5 },
    { question: 'Pasir Ris Park', index: 6 },
    { question: 'East Coast Park', index: 7 },
    { question: 'Kent Ridge Park', index: 8 },
    { question: 'Fort Canning Park', index: 9 },
    { question: 'dummy question', index: 10, counter: 0 },
  ];

  const quizDataHistoricalLandmarks = [
    { question: 'Raffles Hotel', index: 0, category: 'Historical Landmarks' },
    { question: 'Old Hill Street Police Station', index: 1 },
    { question: 'Former Ford Factory', index: 2 },
    { question: 'Changi Chapel And Museum', index: 3 },
    { question: 'Kranji War Memorial', index: 4 },
    { question: 'Reflections At Bukit Chandu', index: 5 },
    { question: 'Fort Canning Hill', index: 6 },
    { question: 'Civilian War Memorial', index: 7 },
    { question: 'Old Parliament House', index: 8 },
    { question: 'The Fullerton Building', index: 9 },
    { question: 'Victoria Theatre And Concert Hall', index: 10 },
    { question: 'City Hall And Old Supreme Court Building', index: 11 },
    { question: 'Battlebox At Fort Canning', index: 12 },
    { question: 'Alkaff Mansion', index: 13 },
    { question: 'Tiong Bahru Air Raid Shelter', index: 14 },
    { question: 'Lim Bo Seng Memorial', index: 15 },
    { question: 'Labrador Battery', index: 16 },
    { question: 'Singapore Conference Hall', index: 17 },
    { question: 'National Museum Of Singapore', index: 18 },
    { question: 'dummy question', index: 19, counter: 0 },
  ];

  const quizDataPoliticalLandmarks = [
    { question: 'ParliamentHouse', index: 0, category: 'Political Landmarks' },
    { question: 'Istana', index: 1 },
    { question: 'SupremeCourt', index: 2 },
    { question: 'CityHall', index: 3 },
    { question: 'NationalGallerySingapore', index: 4 },
    { question: 'CivilianWarMemorial', index: 5 },
    { question: 'OldParliamentHouse', index: 6 },
    { question: 'VictoriaTheatreConcertHall', index: 7 },
    { question: 'AsianCivilisationsMuseum', index: 8 },
    { question: 'NationalMuseumofSingapore', index: 9 },
    { question: 'ThePadang', index: 10 },
    { question: 'FortCanningHill', index: 11 },
    { question: 'TheFullertonBuilding', index: 12 },
    { question: 'SingaporeConferenceHall', index: 13 },
    { question: 'RafflesPlace', index: 14 },
    { question: 'dummy question', index: 15, counter: 0 },
  ];

  const getQuizFromOpenAI = async (argument) => {
    setLoading(true);
    setQuizCategory(argument.category);

    if (answerSelected === true) {
      setAnswerSelected(false);
    }

    const landmark = argument.question;
    try {
      const prompt = `Generate a multiple choice question about ${landmark} where the options are labelled in capital letters, A), B), C), D). Don't leave any empty lines between the question and options. Put just the answer letter at the bottom as Answer: answer letter and don't put Question at the beginning`;

      const response = await fetch('http://localhost:3002/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await response.json();

      const { question, extractedData, answer } = parseOpenAIResponse(
        data.message,
      );

      setQuestion(question);
      setOptions(extractedData);
      setAnswer(answer);

      setIndexOfQuestion(argument.index);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(`Error sending message due to: ${err}`);
    }
  };

  const handleAnswerClick = async (selectedAnswer) => {
    if (selectedAnswer === answer && counter === 0) {
      // Increase counter by 1 so that user cannot click the same answer more than twice to increase score
      setScore(score + 1);
      setCounter(counter + 1);
      setSelectedAnswerCorrectness(true);
    } else {
      setSelectedAnswerCorrectness(false);
    }
    setAnswerSelected(true);
  };

  const moveToNextQuestion = () => {
    setQuestion('');
    setOptions([]);
    setCounter(0);
    setSelectedAnswerCorrectness(null);
    setAnswerSelected(false);

    if (quizCategory === 'Nature Parks') {
      getQuizFromOpenAI(quizDataNatureParks[indexOfQuestion + 1]);
      setQuizCategory('Nature Parks');
    }

    if (quizCategory === 'Historical Landmarks') {
      getQuizFromOpenAI(quizDataHistoricalLandmarks[indexOfQuestion + 1]);
      setQuizCategory('Historical Landmarks');
    }

    if (quizCategory === 'Political Landmarks') {
      getQuizFromOpenAI(quizDataPoliticalLandmarks[indexOfQuestion + 1]);
      setQuizCategory('Political Landmarks');
    }
  };

  const resetQuiz = () => {
    setQuestion('');
    setOptions([]);
    setIndexOfQuestion(0);
    setAnswer('');
    setScore(0);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box className="link-container">
          <AppLinks />
        </Box>
        <Box className="drawer-links">
          <ListItem>
            <Link to="/">
              <ArrowBackIcon
                sx={{
                  marginRight: '300px',
                  color: (theme) => theme.palette.primary.main,
                }}
              />
            </Link>
          </ListItem>
        </Box>
      </Box>
      <Button onClick={() => getQuizFromOpenAI(quizDataNatureParks[0])}>
        Start Quiz on Nature Parks!
      </Button>
      <Button onClick={() => getQuizFromOpenAI(quizDataHistoricalLandmarks[0])}>
        Start Quiz on Historical Landmarks!
      </Button>
      <Button onClick={() => getQuizFromOpenAI(quizDataPoliticalLandmarks[0])}>
        Start Quiz on Political Landmarks!
      </Button>

      {question ? (
        <Typography
          variant="h4"
          sx={{
            width: '900px',
            marginBottom: '20px',
            marginTop: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Question: {question}
        </Typography>
      ) : null}

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <Box>
            {options ? (
              <Grid container spacing={2} justifyContent="center">
                {/* Wrap options in a separate Grid container */}
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  spacing={2}
                  justifyContent="center"
                >
                  {options.map((option, index) => {
                    const { letter, choice } = option;
                    const isCorrect =
                      answer === letter && selectedAnswerCorrectness === true;
                    const isWrong =
                      answer !== letter && selectedAnswerCorrectness === false;
                    return (
                      <Grid item key={index} xs={6}>
                        <Paper
                          elevation={3}
                          sx={{
                            padding: '10px',
                            textAlign: 'center',
                            width: '250px',
                            height: '100px',
                          }}
                        >
                          <Grid item xs={3}>
                            <Typography
                              variant="h4"
                              sx={{
                                color: isCorrect
                                  ? 'green'
                                  : isWrong
                                  ? 'red'
                                  : 'inherit',
                              }}
                            >
                              {letter}
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <Button
                              onClick={() => handleAnswerClick(letter)}
                              disabled={answerSelected}
                              fullWidth
                            >
                              {choice}
                            </Button>
                          </Grid>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </Box>
      )}
      {question &&
      indexOfQuestion < quizDataHistoricalLandmarks.length - 2 &&
      quizCategory === 'Historical Landmarks' ? (
        <Button onClick={moveToNextQuestion}>Move to next question</Button>
      ) : null}
      {question &&
      indexOfQuestion < quizDataNatureParks.length - 2 &&
      quizCategory === 'Nature Parks' ? (
        <Button onClick={moveToNextQuestion}>Move to next question</Button>
      ) : null}
      {question &&
      indexOfQuestion < quizDataPoliticalLandmarks.length - 2 &&
      quizCategory === 'Political Landmarks' ? (
        <Button onClick={moveToNextQuestion}>Move to next question</Button>
      ) : null}
      {quizCategory === 'Nature Parks' &&
      indexOfQuestion >= quizDataNatureParks.length - 2 ? (
        <Button onClick={resetQuiz}>Reset Nature Parks Quiz</Button>
      ) : null}
      {quizCategory === 'Historical Landmarks' &&
      indexOfQuestion >= quizDataHistoricalLandmarks.length - 2 ? (
        <Button onClick={resetQuiz}>Reset Historical Landmarks Quiz</Button>
      ) : null}
      {quizCategory === 'Political Landmarks' &&
      indexOfQuestion >= quizDataPoliticalLandmarks.length - 2 ? (
        <Button onClick={resetQuiz}>Reset Political Landmarks Quiz</Button>
      ) : null}
      <Typography variant="h5">Your score: {score}</Typography>
    </Box>
  );
}
