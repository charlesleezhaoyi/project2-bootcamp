import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
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
import generateCertificate from '../Services/CreateCertificate';
import CountdownTimer from './CountdownTimer';
import { update } from 'firebase/database';

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

  const [fullName, setFullName] = useState('');

  // MUI Theme
  const theme = useTheme();

  const navigate = useNavigate();

  const quizDataNatureParks = [
    {
      question: 'Bukit Timah Nature Reserve',
      index: 0,
      category: 'Nature Parks',
      img: 'https://www.nparks.gov.sg/-/media/nparks-real-content/gardens-parks-and-nature/parks-and-nature-reserve/bukit-timah-nature-reserve/btnr-media/btnr-visitor-centre.ashx',
    },
    {
      question: 'MacRitchie Reservoir',
      index: 1,
      img: 'https://lp-cms-production.imgix.net/2019-06/a2aa48e66952bf8816898991072e32f5-macritchie-reservoir.jpg',
    },
    {
      question: 'Sungei Buloh Wetland Reserve',
      index: 2,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/79/27/9e/photo2jpg.jpg?w=1200&h=-1&s=1',
    },
    {
      question: 'Labrador Nature Reserve',
      index: 3,
      img: 'https://www.visitsingapore.com/see-do-singapore/nature-wildlife/reserves/labrador-nature-reserve/jcr:content/par/mobile_21_content_sl/sliderccpar1/content_img_insta/content/item_1.thumbnail.image-path.560.315.jpg',
    },
    {
      question: 'Pulau Ubin',
      index: 4,
      img: 'https://media.timeout.com/images/106041246/image.jpg',
    },
    {
      question: 'Coney Island Park Singapore',
      index: 5,
      img: 'https://www.nparks.gov.sg/-/media/coney-island-1.ashx',
    },
    {
      question: 'Pasir Ris Park',
      index: 6,
      img: 'https://www.nparks.gov.sg/-/media/nparks-real-content/gardens-parks-and-nature/parks-and-nature-reserve/pasir-ris-park/p3290233.ashx',
    },
    {
      question: 'East Coast Park',
      index: 7,
      img: 'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/nature-wildlife/east-coast-park-carousel01-square.jpg',
    },
    {
      question: 'Kent Ridge Park',
      index: 8,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/39/e9/54/kent-ridge-park.jpg?w=1200&h=1200&s=1',
    },
    {
      question: 'Fort Canning Park',
      index: 9,
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Fort_Canning_Park_sign%2C_Singapore_-_20110506.jpg',
    },
    {
      question: 'Singapore HortPark',
      index: 10,
      img: 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2023/09/hiking-trekking-in-singapore-henderson-waves-view.png',
    },
    {
      question: 'Upper Seletar Reservoir Park',
      index: 11,
      img: 'https://www.justrunlah.com/wp-content/uploads/2016/01/upper-seletar_thumb.jpg',
    },
    {
      question: 'Singapore Mount Faber Park',
      index: 12,
      img: 'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/nature-wildlife/mount-faber-carouse01-1670x940.jpg',
    },
    {
      question: 'Sembawang Park Singapore',
      index: 13,
      img: 'https://thesmartlocal.com/wp-content/uploads/2021/03/image9-10.jpg',
    },
    {
      question: 'Singapore Botanic Gardens',
      index: 14,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/7f/e5/ce/beautiful-botanic-gardens.jpg?w=1200&h=-1&s=1',
    },
    { question: 'dummy question', index: 15, counter: 0 },
  ];

  const quizDataHistoricalLandmarks = [
    {
      question: 'Raffles Hotel',
      index: 0,
      category: 'Historical Landmarks',
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/260384694.jpg?k=266e84eda8e73591a5c4a7c25f29775ee304349a310eff011e93d3ec8f256d0b&o=&hp=1',
    },
    {
      question: 'Old Hill Street Police Station Singapore',
      index: 1,
      img: 'https://cdn.myportfolio.com/645ef5b2f82fdeaf819364ecd9d55d6c/fdeb2ab3-9a92-434b-a146-eb8248455aaa_rw_1920.jpg?h=ec338e15212ca1ee517236e2b9139081',
    },
    {
      question: 'Former Ford Factory Singapore',
      index: 2,
      img: 'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/history/former-ford-factory-carousel-940x940.jpg',
    },
    {
      question: 'Changi Chapel And Museum',
      index: 3,
      img: 'https://www.visitsingapore.com/see-do-singapore/history/history-museums/changi-museum/jcr:content/par-carousel/carousel_detailpage/carousel/item0.thumbnail.carousel-img.600.338.jpg',
    },
    {
      question: 'Kranji War Memorial',
      index: 4,
      img: 'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/history/kranji-war-memorial-carousel01-rect.jpeg',
    },
    {
      question: 'Reflections At Bukit Chandu',
      index: 5,
      img: 'https://www.visitsingapore.com/content/dam/desktop/global/see-do-singapore/history/BAU_Shot-of-Reflections-at-Bukit-Chandu---Photo-credit-to-Reflections-at-Bukit-Chandu_Carousel-Image-1-1640x940.jpg',
    },
    {
      question: 'Fort Canning Hill',
      index: 6,
      img: 'https://www.visitsingapore.com/see-do-singapore/nature-wildlife/parks-gardens/fort-canning-park/jcr:content/par/column_control/ccpar1/content_img_insta/content/item0.thumbnail.image-path.560.315.jpg',
    },
    {
      question: 'Civilian War Memorial Singapore',
      index: 7,
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Civilian_War_Memorial_2019.jpg',
    },
    {
      question: 'Old Parliament House Singapore',
      index: 8,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Old_Parliament_House_3%2C_Singapore%2C_Feb_06.JPG/640px-Old_Parliament_House_3%2C_Singapore%2C_Feb_06.JPG',
    },
    {
      question: 'The Fullerton Building',
      index: 9,
      img: 'https://www.executivetraveller.com/photos/view/size:1200,675/5b4d5e3b79204eba9e0e5871dd799463-Depositphotos_188606566_xl-2015%20(Large).jpg',
    },
    {
      question: 'Victoria Theatre And Concert Hall',
      index: 10,
      img: 'https://www.visitsingapore.com/see-do-singapore/arts/performance-arts/victoria-theatre-concert-hall/jcr:content/par/column_control/ccpar1/content_img_insta/content/item_2.thumbnail.image-path.560.315.jpg',
    },
    {
      question: 'City Hall And Old Supreme Court Building Singapore',
      index: 11,
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Old_Supreme_Court_Building_and_City_Hall_from_the_Padang%2C_Singapore_-_20110205.jpg',
    },
    {
      question: 'Battlebox At Fort Canning Singapore',
      index: 12,
      img: 'https://media.cntraveler.com/photos/5a8f31e6723a834885e152f5/16:9/w_2560,c_limit/Fort-Canning-Battlebox__2018_Battlebox-Entrance.jpg',
    },
    {
      question: 'Alkaff Mansion Singapore',
      index: 13,
      img: 'https://cdn.tatlerasia.com/asiatatler/i/sg/2019/07/29134250-the-alkaff-mansion-exterior_cover_1600x1012.jpg',
    },
    {
      question: 'Tiong Bahru Air Raid Shelter',
      index: 14,
      img: 'https://visittiongbahru.com/wp-content/uploads/2019/04/Visitors-touring-the-Tiong-Bahru-Air-Raid-Shelter-during-BSG-2017.jpg',
    },
    // {
    //   question: 'Lim Bo Seng Memorial',
    //   index: 15,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Lim_Bo_Seng_Memorial_2%2C_Aug_06.JPG',
    // },
    // {
    //   question: 'Labrador Battery Singapore',
    //   index: 16,
    //   img: 'https://thesmartlocal.com/wp-content/uploads/2023/11/labrador-battery-history.jpg',
    // },
    // {
    //   question: 'Singapore Conference Hall',
    //   index: 17,
    //   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Singapore_Conference_Hall.JPG/1200px-Singapore_Conference_Hall.JPG',
    // },
    // {
    //   question: 'National Museum Of Singapore',
    //   index: 18,
    //   img: 'https://static.toiimg.com/photo/45067776.cms',
    // },
    { question: 'dummy question', index: 15, counter: 0 },
  ];

  const quizDataPoliticalLandmarks = [
    {
      question: 'Parliament House Singapore',
      index: 0,
      category: 'Political Landmarks',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Parliament_House_Singapore.jpg/800px-Parliament_House_Singapore.jpg',
    },
    {
      question: 'Istana',
      index: 1,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Istana_%28Singapore%29.jpg/1200px-Istana_%28Singapore%29.jpg',
    },
    {
      question: 'Supreme Court Singapore',
      index: 2,
      img: 'https://arquitecturaviva.com/assets/uploads/obras/39971/av_imagen_vertical.webp?h=efd58982',
    },
    {
      question: 'City Hall Singapore',
      index: 3,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/City_Hall_4%2C_Singapore%2C_Jan_06.JPG/1200px-City_Hall_4%2C_Singapore%2C_Jan_06.JPG',
    },
    {
      question: 'National Gallery Singapore',
      index: 4,
      img: 'https://media.cntraveler.com/photos/5730aaf14b5c247421e0b51b/master/pass/08-museums-national-gallery-singapore-cr-courtesy.jpg',
    },
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
    { question: 'dummy question', index: 5, counter: 0 },
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

  const getUserData = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);

      const userDocSnapshot = await getDoc(userDocRef);

      // console.log(userDocSnapshot);
      // console.log(userDocSnapshot.data().name);

      setFullName(userDocSnapshot.data().name);
    } catch (error) {
      console.error('Error getting user data: ', error);
    }
  };

  getUserData();

  const updateScoreInFirestore = async (uid, newScore) => {
    const userDocRef = doc(db, 'users', uid);
    console.log(userDocRef);

    // Checking if user document exists, otherwise make one
    const userDocSnapshotExists = await getDoc(userDocRef);
    console.log(userDocSnapshotExists.document);

    // if (!userDocSnapshotExists.document) {
    //   await setDoc(userDocRef, {});
    // }

    // After userDocRef is created, create scores collection
    const scoresCollectionRef = collection(userDocRef, 'scores');

    const scoresQuerySnapshot = await getDocs(scoresCollectionRef);
    console.log(scoresQuerySnapshot.size, score);

    if (scoresQuerySnapshot.size === 0) {
      // Add a new document with current score if there is no collection in scores
      const newScoreDocRef = await addDoc(scoresCollectionRef, {
        score: newScore,
      });
      console.log(newScoreDocRef.id);
    } else if (scoresQuerySnapshot.size === 1) {
      // Update the existing score document in the scores collection if there is already a score doc
      const existingScoreDocRef = doc(
        scoresCollectionRef,
        scoresQuerySnapshot.docs[0].id, // takes the first element's id of the docs array
      );

      await updateDoc(existingScoreDocRef, { score: newScore - 1 });
    } else {
    }
  };

  // const addCourseFieldToFireStore = async () => {
  //   const uid = user.uid;
  //   const userDocRef = doc(db, 'users', uid);

  //   console.log(userDocRef);
  //   console.log(uid);

  //   const emailField = 'email';
  //   const valueEmail = user.email;

  //   const courseField = 'course';
  //   const valueCourse = quizCategory;
  //   console.log(quizCategory);

  //   try {
  //     await updateDoc(userDocRef, {
  //       [emailField]: valueEmail,
  //       [courseField]: valueCourse,
  //     });
  //   } catch (err) {
  //     console.error('Error adding field: ', err);
  //   }
  // };

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
    setImage('');
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
    setQuizCategory('');
    setOptions([]);
    setIndexOfQuestion(0);
    setAnswer('');
    setScore(0);
    setImage('');
    setAnswerColor('');
    setAnswerSelected(false);
    setIsResetting(true);
  };

  console.log(answer);
  console.log(indexOfQuestion, quizDataPoliticalLandmarks.length);

  // const paddingValue = theme.breakpoints.up('md') ? '80px' : '10px';

  return (
    <Box>
      {errorStatus ? (
        <ErrorOpenAI />
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ marginBottom: '20px' }} className="link-container">
              <AppLinks />
            </Box>
            {/* <Button onClick={handleAnswerClickFirestore}>Test Firestore</Button> */}
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
          {quizCategory !== '' ? null : (
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button
                sx={{ margin: '20px' }}
                variant="contained"
                color="error"
                onClick={() => getQuizFromOpenAI(quizDataNatureParks[0])}
              >
                Start Quiz on Nature Parks!
              </Button>
              <Button
                sx={{ margin: '20px' }}
                variant="contained"
                color="error"
                onClick={() =>
                  getQuizFromOpenAI(quizDataHistoricalLandmarks[0])
                }
              >
                Start Quiz on Historical Landmarks!
              </Button>
              <Button
                sx={{ margin: '20px' }}
                variant="contained"
                color="error"
                onClick={() => getQuizFromOpenAI(quizDataPoliticalLandmarks[0])}
              >
                Start Quiz on Political Landmarks!
              </Button>
            </Box>
          )}

          {question ? (
            <Box
              sx={{
                width: '900px',
                marginBottom: '20px',
                marginTop: '55px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'maroon' }} variant="h4">
                Question: {question}
              </Typography>
            </Box>
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
                  marginBottom: '20px',
                  marginTop: '20px',
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
                              marginBottom: '20px',
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
                              <Typography
                                sx={{ fontWeight: 'bold' }}
                                variant="h4"
                              >
                                {letter}
                              </Typography>
                            </Grid>
                            <Grid item xs={9}>
                              <Button
                                sx={{ color: 'maroon' }}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {question &&
            indexOfQuestion < quizDataHistoricalLandmarks.length - 2 &&
            quizCategory === 'Historical Landmarks' ? (
              <Button
                variant="contained"
                color="error"
                onClick={moveToNextQuestion}
              >
                Move to next question
              </Button>
            ) : null}
            {question &&
            indexOfQuestion < quizDataNatureParks.length - 2 &&
            quizCategory === 'Nature Parks' ? (
              <Button
                variant="contained"
                color="error"
                onClick={moveToNextQuestion}
              >
                Move to next question
              </Button>
            ) : null}
            {question &&
            indexOfQuestion < quizDataPoliticalLandmarks.length - 2 &&
            quizCategory === 'Political Landmarks' ? (
              <Button
                variant="contained"
                color="error"
                sx={{ margin: '30px' }}
                onClick={moveToNextQuestion}
              >
                Move to next question
              </Button>
            ) : null}

            {quizCategory === 'Nature Parks' &&
            indexOfQuestion >= quizDataNatureParks.length - 2 ? (
              <>
                <Button variant="contained" color="error" onClick={resetQuiz}>
                  Finish Nature Parks Quiz
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    updateScoreInFirestore(user.uid, score + 1);
                    generateCertificate(
                      fullName,
                      quizCategory,
                      score.toString(),
                    );
                  }}
                >
                  Generate your certificate!
                </Button>
              </>
            ) : null}
            {quizCategory === 'Historical Landmarks' &&
            indexOfQuestion >= quizDataHistoricalLandmarks.length - 2 ? (
              <>
                <Button variant="contained" color="error" onClick={resetQuiz}>
                  Finish Historical Landmarks Quiz
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    console.log(fullName);
                    updateScoreInFirestore(user.uid, score + 1);
                    generateCertificate(
                      fullName,
                      quizCategory,
                      score.toString(),
                    );
                  }}
                >
                  Generate your certificate!
                </Button>
              </>
            ) : null}
            {quizCategory === 'Political Landmarks' &&
            indexOfQuestion >= quizDataPoliticalLandmarks.length - 2 ? (
              <>
                <Button
                  sx={{ marginLeft: '30px' }}
                  variant="contained"
                  color="error"
                  onClick={resetQuiz}
                >
                  Finish Political Landmarks Quiz
                </Button>
                <Button
                  sx={{ margin: '30px' }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    updateScoreInFirestore(user.uid, score + 1);
                    generateCertificate(
                      fullName,
                      quizCategory,
                      score.toString(),
                    );
                  }}
                >
                  Generate your certificate!
                </Button>
              </>
            ) : null}

            {/* Countdown Timer */}
            {loading ||
            quizCategory === '' ||
            indexOfQuestion === quizDataPoliticalLandmarks.length - 2 ? null : (
              <CountdownTimer
                initialTime={30}
                moveToNextQuestion={moveToNextQuestion}
                indexOfQuestion={indexOfQuestion}
                quizDataPoliticalLandmarks={quizDataPoliticalLandmarks}
                resetQuiz={resetQuiz}
              />
            )}

            {quizCategory === '' || loading ? null : (
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
                Your score: {score}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

// indexOfQuestion < quizDataHistoricalLandmarks.length - 2;
