import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import './App.css';
import AuthFormTesting from './Components/AuthFormTesting';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Quiz from './Components/Quizzes';

import App from './App';
import QuizAI from './Components/QuizzesAI';
import { Box } from '@mui/material';

import SignInPage from './SignInPage';
import GuidePage from './Components/GuidePage';
import Protected from './Components/Protected';
import Onboarding from './Components/OnboardingForm';
import { useNavigate } from 'react-router-dom';
import ErrorOpenAI from './Components/ErrorOpenAI';

const libraries = ['places'];

const linkStyle = {
  marginRight: '50px',
  marginLeft: '50px',
  marginTop: '10px',
  marginBottom: '10px',
  textDecoration: 'none',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '30px',
  display: 'flex',
  // flexDirection: 'column',
};

// A separate component to render Links
const AppLinks = () => (
  <>
    <Box
      className="link-container"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Link to="/" style={linkStyle}>
        Map
      </Link>
      <Link to="/quizzes" style={linkStyle}>
        Quizzes
      </Link>
      <Link to="/quizzesAI" style={linkStyle}>
        Quizzes AI
      </Link>
      {/* <Link to="/onboarding" style={linkStyle}>
        Onboarding
      </Link> */}
      <Link to="/guide" style={linkStyle}>
        Guide
      </Link>
    </Box>
  </>
);

// Testing grounds

const AppMain = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // Track whether the authentication state is still being determined by onAuthStateChanged
  const [loading, setLoading] = useState(true);

  // Old useEffect that does not work as onAuthStateChanged takes some time to authenticate whether user is logged in
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //       setUser(user);
  //     }
  //   });
  // }, []);

  // onAuthStateChanged's callback is called when browser loads and useEffect mounts this component
  useEffect(() => {
    // onAuthStateChanged listener returns an unsubscribe function to stop listening to changes in auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if user is logged in:
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
      // Regardless of whether there is a user logged in or not, set loading to false to display either / or /sign-in
      setLoading(false);
    });

    // cleanup after user is determined
    return () => {
      unsubscribe(); // unsubscribe funtion is returned to unsubscribe listener when component unmounts
    };
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        Loading maps
      </div>
    );
  }

  // PASS LOGOUT FUNCTION FROM APPMAIN TO APP SO THAT YOU CAN USE NAVIGATE(/SIGN-IN)
  const handleLogoutAppMain = async () => {
    try {
      console.log('Logging out...');
      await signOut(auth);
      console.log('User signed out');
      setUser({});
      // navigate('/sign-in');
      setIsLoggedIn(false);
      console.log('Navigation complete');
    } catch (err) {
      console.error('Error signing out', err);
    }
  };

  console.log(isLoggedIn);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Router>
      {isLoggedIn && ( // Conditionally render the navigation if user is logged in
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              marginRight: '500px',
            }}
          ></div>
        </div>
      )}
      <Routes>
        {/* <Route
          path="/"
          element={<App handleLogoutAppMain={handleLogoutAppMain} />}
        /> */}
        <Route
          path="/"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <App handleLogoutAppMain={handleLogoutAppMain} />
            </Protected>
          }
        />
        <Route
          path="/quizzesAI"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <QuizAI user={user} />
            </Protected>
          }
        />
        <Route
          path="/quizzes"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Quiz user={user} />
            </Protected>
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/guide"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <GuidePage />
            </Protected>
          }
        />
        <Route
          path="/error"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ErrorOpenAI />
            </Protected>
          }
        />
        <Route path="/onboarding" element={<Onboarding />} />
        {isLoggedIn ? (
          <>
            {/* <Route path="/quizzes" element={<Quiz user={user} />} />
            <Route path="/map" element={<App />} /> */}
            {/* <Route path="/quizzesAI" element={<QuizAI user={user} />} /> */}
            {/* <Route path="/guide" element={<GuidePage />} /> */}
          </>
        ) : (
          <>
            {/* <Route path="/quizzes" element={<AuthFormTesting />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/map" element={<SignInPage />} /> */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export { AppMain, AppLinks };
