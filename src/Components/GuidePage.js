import React, { useEffect, useRef } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import { AppLinks } from '../AppMain';
import App from '../App';

const GuidePage = () => {
  const sliderRef = useRef();

  useEffect(() => {
    const slides = document.querySelectorAll('.slide'); // returns an array of the slides
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
      );
    };

    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      console.log(curSlide);
      goToSlide(curSlide);
    };

    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      console.log(curSlide);
      goToSlide(curSlide);
    };

    const init = function () {
      goToSlide(0);
    };

    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prevSlide();
      e.key === 'ArrowRight' && nextSlide();
    });
  }, []);

  return (
    <Box
      ref={sliderRef}
      sx={{
        backgroundImage: 'linear-gradient(to bottom, #f5f5f5, #d9d9d9)',
        // display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      >
        <AppLinks />
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          marginTop: '20px',
          mx: '50px',
          borderRadius: '2%',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: '2.25rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
          }}
        >
          User Guide
        </Typography>

        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
            }}
          >
            Getting Started
          </Typography>
          <Typography sx={{ marginBottom: '1rem', color: '#667' }}>
            Welcome to our app! Getting started is a breeze. Upon launching,
            you'll find a user-friendly interface guiding you through the
            essentials. Follow the prompts to set up your preferences, explore
            features, and make the most out of your experience. Let's embark on
            this journey together!
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
            }}
          >
            How to Use the Maps
          </Typography>
          <Typography sx={{ marginBottom: '1rem', color: '#667' }}>
            Uncover the world with our interactive maps feature! Navigate
            through nature parks, historical landmarks, and political landmarks.
            Each landmark is marked with informative pills. Click on them to
            unveil AI-generated responses.
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
            }}
          >
            How to Use the Quizzes
          </Typography>
          <Typography sx={{ marginBottom: '1rem', color: '#667' }}>
            Engage your mind with our dynamic and AI-generated quizzes! Tailored
            to the categories of nature parks, historical landmarks, and
            political landmarks, these quizzes offer a fun and educational
            experience. The quizzes adapt to your preferences, providing a
            personalized learning journey. Enjoy the thrill of discovery and
            knowledge!
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
            }}
          >
            Troubleshooting Tips
          </Typography>
          <Typography sx={{ marginBottom: '1rem', color: '#667' }}>
            Encountering an issue? We've got you covered. If you find yourself
            unable to access certain features or encounter delays, it might be
            due to the rate limit on requests to the OpenAI API. Our system is
            designed to prevent spamming and ensure fair usage. If you receive
            an error message, please be patient and refrain from excessive
            requests. The rate limit will reset after 24 hours, allowing you to
            resume your exploration hassle-free. Thank you for your
            understanding and cooperation as we strive to provide you with a
            seamless and enjoyable experience.
          </Typography>
        </Box>

        {/* Add more sections as needed */}
      </Paper>
      {/* Slider for reviews */}
      <Box
        className="slider"
        sx={{
          marginTop: 'auto',
          height: '50rem',
          maxWidth: '100rem',
          margin: '0 auto',
          position: 'relative',
          // display: 'flex',
          overflow: 'hidden',
        }}
      >
        <Box className="slide slide--1">
          <Box className="testimonial">
            <Typography
              variant="h5"
              sx={{
                fontSize: '2.25rem',
                fontWeight: '500',
                marginBottom: '1.5rem',
              }}
            >
              Awesome AI functionality!
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: '1.7rem', marginBottom: '3.5rem', color: '#667' }}
            >
              The AI responses were helpful and accurate to the information of
              the landmarks in Singapore. Will definitely recommend this to
              friends and family
            </Typography>
            <address className="testimonial__author">
              <img
                src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY="
                alt=""
                className="testimonial__photo"
              />
              <Typography variant="h6">Ian Chow</Typography>
              <Typography variant="p" className="testimonial__location">
                Ang Mo Kio, Singapore
              </Typography>
            </address>
          </Box>
        </Box>

        <Box
          className="slide slide--2"
          sx={{
            '@media all and (max-width: 500px)': {
              marginTop: '40px',
            },
          }}
        >
          <Box className="testimonial">
            <Typography
              variant="h5"
              sx={{
                fontSize: '2.25rem',
                fontWeight: '500',
                marginBottom: '1.5rem',
              }}
            >
              Really sick maps!
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: '1.7rem', marginBottom: '3.5rem', color: '#667' }}
            >
              Love the design of the UI and the maps look just like the one on
              Google Maps! Will definitely be showing my kids how to use this to
              learn! I recommend adding more landmarks to different countries
              around the globe.
            </Typography>
            <address className="testimonial__author">
              <img
                src="https://t3.ftcdn.net/jpg/04/60/91/88/360_F_460918802_XVCymFr7MoziFpnInbTDvrlblYhvAOi2.jpg"
                alt=""
                className="testimonial__photo"
              />
              <Typography variant="h6">Charles Lee</Typography>
              <Typography variant="p" className="testimonial__location">
                Tiong Bahru
              </Typography>
            </address>
          </Box>
        </Box>

        <Box
          className="slide slide--3"
          sx={{
            '@media all and (max-width: 500px)': {
              marginTop: '40px',
            },
          }}
        >
          <Box className="testimonial">
            <Typography
              variant="h5"
              sx={{
                fontSize: '2.25rem',
                fontWeight: '500',
                marginBottom: '1.5rem',
              }}
            >
              Quizzes are challenging!
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: '1.7rem', marginBottom: '3.5rem', color: '#667' }}
            >
              I learnt so many interesting facts about Singapore's political
              landmarks when taking the quizzes. The fact that the questions are
              AI-generated and different everytime I go back is also cherry on
              top!
            </Typography>
            <address className="testimonial__author">
              <img
                src="https://media.istockphoto.com/id/1350800599/photo/happy-indian-business-man-leader-manager-standing-in-office-headshot-portrait.webp?b=1&s=170667a&w=0&k=20&c=pz5kwfLy64_AQIwiv9FDDJWWkAzb2Lf1F5fjZW23dBo="
                alt=""
                className="testimonial__photo"
              />
              <Typography variant="h6">Rob Kolsek</Typography>
              <Typography variant="p" className="testimonial__location">
                Marina Bay Sands
              </Typography>
            </address>
          </Box>
        </Box>

        <Box className="dots"></Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            zIndex: '10',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-around',

            paddingRight: '220px',
            '@media all and (max-width: 500px)': {
              top: '40%',
              justifyContent: 'space-between',
            },
          }}
        >
          <Button
            className="slider__btn slider__btn--left"
            sx={{ fontSize: '2.25rem', color: 'maroon' }}
          >
            &larr;
          </Button>
          <Button
            className="slider__btn slider__btn--right"
            sx={{ fontSize: '2.25rem', color: 'maroon' }}
          >
            &rarr;
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GuidePage;
