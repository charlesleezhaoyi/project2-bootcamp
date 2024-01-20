import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
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
import { useTheme } from '@mui/material/styles';

import ErrorOpenAI from './ErrorOpenAI';

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
  const [image, setImage] = useState('');
  const [options, setOptions] = useState([]);
  const [indexOfQuestion, setIndexOfQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [selectedAnswerCorrectness, setSelectedAnswerCorrectness] =
    useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const [quizCategory, setQuizCategory] = useState('');

  const [imageLoading, setImageLoading] = useState(true);

  const [answerColor, setAnswerColor] = useState('');

  const [isResetting, setIsResetting] = useState(false);

  // MUI Theme
  const theme = useTheme();

  const navigate = useNavigate();

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
    { question: 'Old Hill Street Police Station Singapore', index: 1 },
    { question: 'Former Ford Factory Singapore', index: 2 },
    { question: 'Changi Chapel And Museum', index: 3 },
    { question: 'Kranji War Memorial', index: 4 },
    { question: 'Reflections At Bukit Chandu', index: 5 },
    { question: 'Fort Canning Hill', index: 6 },
    { question: 'Civilian War Memorial Singapore', index: 7 },
    { question: 'Old Parliament House Singapore', index: 8 },
    { question: 'The Fullerton Building', index: 9 },
    { question: 'Victoria Theatre And Concert Hall', index: 10 },
    {
      question: 'City Hall And Old Supreme Court Building Singapore',
      index: 11,
    },
    { question: 'Battlebox At Fort Canning Singapore', index: 12 },
    { question: 'Alkaff Mansion Singapore', index: 13 },
    { question: 'Tiong Bahru Air Raid Shelter', index: 14 },
    { question: 'Lim Bo Seng Memorial', index: 15 },
    { question: 'Labrador Battery Singapore', index: 16 },
    { question: 'Singapore Conference Hall', index: 17 },
    { question: 'National Museum Of Singapore', index: 18 },
    { question: 'dummy question', index: 19, counter: 0 },
  ];

  const quizDataPoliticalLandmarks = [
    {
      question: 'Parliament House Singapore',
      index: 0,
      category: 'Political Landmarks',
      // testing imgs
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Parliament_House_Singapore.jpg/800px-Parliament_House_Singapore.jpg',
    },
    {
      question: 'Istana',
      index: 1,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Istana_%28Singapore%29.jpg/1200px-Istana_%28Singapore%29.jpg',
    },
    // {
    //   question: 'Supreme Court Singapore',
    //   index: 2,
    //   img: 'https://arquitecturaviva.com/assets/uploads/obras/39971/av_imagen_vertical.webp?h=efd58982',
    // },
    // {
    //   question: 'City Hall Singapore',
    //   index: 3,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/City_Hall_4%2C_Singapore%2C_Jan_06.JPG/1200px-City_Hall_4%2C_Singapore%2C_Jan_06.JPG',
    // },
    // {
    //   question: 'National Gallery Singapore',
    //   index: 4,
    //   img: 'https://media.cntraveler.com/photos/5730aaf14b5c247421e0b51b/master/pass/08-museums-national-gallery-singapore-cr-courtesy.jpg',
    // },
    // {
    //   question: 'Civilian War Memorial Singapore',
    //   index: 5,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Civilian_War_Memorial_2019.jpg',
    // },
    // {
    //   question: 'Old Parliament House Singapore',
    //   index: 6,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/20190819_The_Arts_House-1.jpg/1200px-20190819_The_Arts_House-1.jpg',
    // },
    // {
    //   question: 'Victoria Theatre Concert Hall Singapore',
    //   index: 7,
    //   img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/6a/01/67/victoria-theatre-and.jpg?w=1200&h=-1&s=1',
    // },
    // {
    //   question: 'Asian Civilisations Museum Singapore',
    //   index: 8,
    //   img: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_2500,h_1600,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/zhz5njqqv9ys57enmd3a/AsianCivilisationsMuseumTicketinSingapore-KlookAustralia.jpg',
    // },
    // {
    //   question: 'National Museum of Singapore',
    //   index: 9,
    //   img: 'https://mediaim.expedia.com/destination/9/aeeab16d1fdf41e6202a491266b52d8d.jpg',
    // },
    // {
    //   question: 'The Padang',
    //   index: 10,
    //   img: 'https://cdn.tatlerasia.com/tatlerasia/i/2022/08/08173413-padang_cover_1500x1000.jpg',
    // },
    // {
    //   question: 'Fort Canning Hill Singapore',
    //   index: 11,
    //   img: 'https://static.honeykidsasia.com/wp-content/uploads/2021/04/fort-canning-park-singapore-guide-honeykids-asia-900x643.jpg',
    // },
    // {
    //   question: 'The Fullerton Building Singapore',
    //   index: 12,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2016_Singapur%2C_Downtown_Core%2C_Hotel_Fullerton_%2801%29.jpg/1200px-2016_Singapur%2C_Downtown_Core%2C_Hotel_Fullerton_%2801%29.jpg',
    // },
    // {
    //   question: 'Singapore Conference Hall',
    //   index: 13,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Singapore_Conference_Hall.JPG/1200px-Singapore_Conference_Hall.JPG',
    // },
    // {
    //   question: 'Raffles Place Singapore',
    //   index: 14,
    //   img: 'https://a.cdn-hotels.com/gdcs/production156/d1955/6d67865b-01b6-4f5a-8fef-a38b822d0cdb.jpg',
    // },
    { question: 'dummy question', index: 2, counter: 0 },
  ];

  // Reset loading state when a new image is set
  useEffect(() => {
    setImageLoading(true);
  }, [image]);

  // When image has loaded on onLoad, set imageLoading to false
  const handleImageLoad = () => {
    setImageLoading(false);
  };

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

      if (!response.ok) {
        navigate('/error');
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      const { question, extractedData, answer } = parseOpenAIResponse(
        data.message,
      );

      setQuestion(question);
      setOptions(extractedData);
      setAnswer(answer);

      // TEST
      setImage(argument.img);
      console.log(answer);

      setIndexOfQuestion(argument.index);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorStatus(true);
      navigate('/error');
      console.error(`Error sending message due to: ${err}`);
    }
  };

  const handleAnswerClick = async (selectedAnswer) => {
    if (selectedAnswer === answer && counter === 0) {
      // Increase counter by 1 so that user cannot click the same answer more than twice to increase score
      setScore(score + 1);
      setCounter(counter + 1);
      setSelectedAnswerCorrectness(true);
      setAnswerColor('green');
    } else {
      setSelectedAnswerCorrectness(false);
      setAnswerColor('red');
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
    setImage('');
    setAnswerColor('');
    setAnswerSelected(false);
    setIsResetting(true);
  };

  // const paddingValue = theme.breakpoints.up('md') ? '80px' : '10px';

  return (
    <Box>
      {errorStatus ? (
        <ErrorOpenAI />
      ) : (
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
          <Button
            onClick={() => getQuizFromOpenAI(quizDataHistoricalLandmarks[0])}
          >
            Start Quiz on Historical Landmarks!
          </Button>
          <Button
            onClick={() => getQuizFromOpenAI(quizDataPoliticalLandmarks[0])}
          >
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
          {image ? (
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={image}
                alt="test"
                className="image-2"
                onLoad={handleImageLoad}
                style={{
                  height: '450px',
                  width: '450px',
                  borderRadius: '7%',
                  opacity: imageLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            </Box>
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
                    // justifyContent="center"
                  >
                    {options.map((option, index) => {
                      const { letter, choice } = option;
                      const isCorrect =
                        answer === letter && selectedAnswerCorrectness === true;
                      const isWrong =
                        answer !== letter &&
                        selectedAnswerCorrectness === false;
                      return (
                        <Grid
                          item
                          key={index}
                          xs={6}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Paper
                            elevation={3}
                            sx={{
                              padding: '10px',
                              textAlign: 'center',
                              width: '100%',
                              height: '180px',
                              borderRadius: '12%',
                              // marginLeft: paddingValue,
                              // marginRight: paddingValue,
                              backgroundColor: isCorrect
                                ? answerColor
                                : isWrong
                                ? answerColor
                                : isResetting
                                ? null
                                : 'inherit',
                            }}
                          >
                            <Grid item xs={3}>
                              <Typography variant="h4">{letter}</Typography>
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
      )}
    </Box>
  );
}
