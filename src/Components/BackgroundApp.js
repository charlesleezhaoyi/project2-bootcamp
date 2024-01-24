// Use this file in index.js as the root only as backup!
import React from 'react';
import RenderMap from '../Services/Maps/RenderMap';
import { useState, useEffect } from 'react';
// import "./App.css";
import '../App.css';
import AuthFormTesting from './AuthFormTesting';
import SignIn from './SignIn';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { AppLinks } from '../AppMain';

// MUI
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

import TemporaryDrawer from './TemporaryDrawer';

// Styling MUI function
const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
});

const StyledGridItem = styled(Grid)({
  width: '30%',
});

const StyledGridPills = styled('div')({
  width: '150px', // Define the width of your container
  height: '100px', // Define the height of your container
  marginBottom: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  marginRight: '20px',
  marginLeft: '20px',
});

const linkStyle = {
  marginRight: '50px',
  marginLeft: '50px',
  marginTop: '10px',
  marginBottom: '10px',
  textDecoration: 'none',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '30px',
};

const historicalLandmarks = {
  Merlion: { lat: 1.2868, lng: 103.8545 },
  MarinaBaySands: { lat: 1.2836, lng: 103.8585 },
  GardensByTheBay: { lat: 1.2816, lng: 103.8636 },
  SentosaIsland: { lat: 1.2494, lng: 103.8303 },
  UniversalStudios: { lat: 1.254, lng: 103.8238 },
  OrchardRoad: { lat: 1.3048, lng: 103.8318 },
  RafflesHotel: { lat: 1.2946, lng: 103.8534 },
  Chinatown: { lat: 1.2839, lng: 103.8436 },
  LittleIndia: { lat: 1.3064, lng: 103.8495 },
  ClarkeQuay: { lat: 1.2905, lng: 103.8466 },
};

const natureParks = {
  BukitTimahNatureReserve: { lat: 1.3547, lng: 103.7764 },
  MacRitchieReservoir: { lat: 1.344, lng: 103.8206 },
  SungeiBulohWetlandReserve: { lat: 1.4467, lng: 103.7306 },
  LabradorNatureReserve: { lat: 1.2672, lng: 103.8021 },
  PulauUbin: { lat: 1.412, lng: 103.9572 },
  ConeyIslandPark: { lat: 1.3986, lng: 103.921 },
  PasirRisPark: { lat: 1.3752, lng: 103.9544 },
  EastCoastPark: { lat: 1.304, lng: 103.922 },
  KentRidgePark: { lat: 1.2897, lng: 103.7847 },
  FortCanningPark: { lat: 1.2921, lng: 103.8469 },
};

const politicalLandmarks = {
  ParliamentHouse: { lat: 1.2895, lng: 103.851 },
  Istana: { lat: 1.2967, lng: 103.8486 },
  SupremeCourt: { lat: 1.2896, lng: 103.8504 },
  CityHall: { lat: 1.293, lng: 103.8537 },
  NationalGallerySingapore: { lat: 1.2903, lng: 103.8519 },
  CivilianWarMemorial: { lat: 1.2934, lng: 103.8524 },
  OldParliamentHouse: { lat: 1.2899, lng: 103.8507 },
  VictoriaTheatreConcertHall: { lat: 1.2888, lng: 103.8514 },
  AsianCivilisationsMuseum: { lat: 1.2875, lng: 103.8519 },
  NationalMuseumofSingapore: { lat: 1.2966, lng: 103.8485 },
};

const AppBackground = () => {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLandmarks, setSelectedLandmarks] =
    useState(historicalLandmarks);

  const [user, setUser] = useState({});

  const [drawerRef, setDrawerRef] = useState(null);
  const [directionSteps, setDirectionSteps] = useState({
    id: null,
    instruction: null,
    distance: null,
    duration: null,
  });

  // Handling the drawer opening
  useEffect(() => {
    if (drawerRef) {
      drawerRef();
    }
  }, [drawerRef]);

  //Authentication Handling
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
    });
  }, []);

  // onAuthStateChanged function to be passed down into the App child component
  const handleAuthStateChanged = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
    });
  };

  //Function to call OpenAI API
  const sendMessage = async (targetMessage) => {
    try {
      const messageToSend = userMessage === '' ? targetMessage : userMessage;

      const response = await fetch('http://localhost:3002/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      setAiResponse(data.message);
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error state here if needed
    }
  };

  const clearAIResponse = () => {
    setAiResponse('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    signOut(auth);
    setUser({});
  };

  const handleDirectionsResult = (steps) => {
    // Slice the array from index 0 to 5
    const slicedSteps = steps.slice(0, 5);
    // Map the sliced array into discrete steps
    const discreteSteps = slicedSteps.map((steps, index) => {
      setDirectionSteps({
        id: index,
        instruction: steps.instructions,
        distance: steps.distance.text,
        duration: steps.duration.text,
      });
    });
    console.log(`This is the ${discreteSteps}`);
  };

  return (
    <Box className="App">
      <Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <TemporaryDrawer
            aiResponse={aiResponse}
            clearAIResponse={clearAIResponse}
            onDrawerOpen={(func) => setDrawerRef(func)}
            sendMessage={sendMessage}
            handleAuthStateChanged={handleAuthStateChanged}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            // loading={loading}
            historicalLandmarks={historicalLandmarks}
            natureParks={natureParks}
            politicalLandmarks={politicalLandmarks}
            setSelectedLandmarks={setSelectedLandmarks}
            renderMapComponent={
              <RenderMap
                sendMessage={sendMessage}
                landmarks={historicalLandmarks}
                onDirectionsResult={handleDirectionsResult}
              />
            }
          />
          <img
            style={{ marginRight: '20px', marginTop: '5px' }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHe0lEQVR4nNVbCWwVVRQ93aggLUsJoILUJWqhCoIQREBbFZBFQBGbCBhtDK5J44ZxK66oLahRFpcoLohGlFgUjIko7soSA6JFUQtKXEBQa2lB6Dc3OS+5GebNvP9nan9PMkl5c9/982buet4DSD8cB6ACwAoAmwDsBHAQwG4A6wE8CWAcgBy0cZwF4GMACcerDsAMABloY+gO4E21EPmSiwCUATgBQEcA2QB6ADgDwO0Atij5VwHko43gGH4ps9DrALRX92UhPX3mZfHr7uHcbwEcjTRHewAb+cDrfBbWG8CPABoBXGjRcSz9OkFdaf2lF/BBvwaQx7GZAJ4BMMZjtv8AKLToyVMv7nWkKUYCaAbQBKC/Gv/cE5jWcxHy9+wAfYXKvM9GmiEfQC0f7g7PPTHragB/AdgAoBuAKyn7dIjee9PxK2cBWMkHkxzbziKXTVm5VlP+xhDdPSn3R7qkqnYAXuBD/QmgyGHOVLWIzg7yP1D+RLQyCgF8xIeppw8b857LvDvIZ15/+noDgC4Ov/N2OvjxRPqkPMhPAE5V90apALXQMn8V70sED4Nxl1K0EoYD+FdVRF099zMBTAFwGQOUH67i/Bcdfs/4+5loJXzIB3gogo6R1PF+Ej4sBcn/jsPZ5ex39D8bTuciPguRO4zW1MToHglPAPgOwDlJzOmhglQUlFHPcgf3MSVmZDxHZfLFqlQpGATxz984b1iE336cOu4KkZtFOfk4kZEFYA4XbPKilHpHhsyrpPwvAC5gQQFGamnyOzk0GLuoY0CIbA3lLkGMGEJfMqmkmSY0j62dRNzBSj7X0+vuZdFh/n1FyO/dTLm1IXIZ6sVIlxU7RjHNNFnYiPFKdhDHDqj7vwN4NKSd68suKcHuKQhFlJMo3SLI41fdpxZxgM38Kk8zPoL3P6EJu0RsYTk2OzYNUA2GxJrY0ZcMgzHpZQAmeZgKjW6Ua7SwF34v0xQQsugODnNeonw5YsYA5SsbPf4ahGWcsyYkRw4lIWDKUNcC4mfOcWlInHEEgB1UvIJm54reaq6upU3AEdr1HVqCeZlC17qgl+LEYm0La6j4A1Y1qXRM0u55qVnjq3L9DeD+APfww1jOldgRG8ZS6S7Sqga3shBJBeNZdproepNjz+vFLdQhLyoWZKsgJV2NQRFNsD4FU+qlOKjqiLsIsQes8xX3qwPOfI4/m4LO+Y71sQu+iLslXE6F0pca5KhoLXk2WapnN+cWx/B8JkLHQsR3p5/JVaDGx/BHtqRgzqdxrjxoHNhLffr5UsZUKpOUoTHPsYPJ8umsJnDukjgeUDU0Lh1cKB6hsjs94xtC/CafHFUD5bYBuJbWkMPgF9ZpuSBD5W5pVGILCKPVWA5r6IOWsi+TdIzOrQlV6wa5QA7LygUefZuZ//1QT90uJWggMtgNNXsKftOZCAPiB2OyEtQGcmyKWni5A7shL9pgsNqD8sN23rftPTmjgIokX2qMtvi1wW0W4m6aSm9j6P83AOij6uidlFnEF57HLxtEBBprKkEMXVGCkVhjOseft8y7nPelIPAWMCYd6auB26Um+CQUS2KsYruFHRGdb1FGCIhIKKUioVr9ek8bcV7M+7K368UWlZLuIYlgFijN/gMMaCa3yvWusgLQOmYxoG5TcpdGXfA41RlpXM1xqZb8kKl2Grz971MAvvLQMGsp69307uMTybNV/W2ureTLImO0pQsp57hsXNvwXhJbHi8n+YWms/6uIDUbW0tYqkxKY7JDHbzEkUHsp9KK/N2qGGHx4aFqdz6sYLnecv94AA+qxS6N8Jx3U1dkFCteSaOrKihs5nQfZYRm9fr3PLXBlqBJRykaGlkrGM47ZXRU0TPDp7SsC1hwtWXXvorjjdwhsO1IDGdDL8zKUaR0bfyWoYptpwmSgikENMthSsAODv3uNWqskBF2n8PWy1LOX6d2BCUV+aGR91OhnQ7BOiqTHQcv8gK+8Cucd7Eam2EpSMBeW0d0CWC/KrP/MoDP3hvngh/jFznJh6KRCmmxZd4an6MHFZaC5WS1KO8LncRdDhsF1JlzJe/HgkyfXXvQxJsCCnpTUekzWMNUbS4kgC5GUt01GGIJrC2CIQGnZUylJQFH4zWOH2TgM+TgftVZJYNpMaS1QyDl4bmIpynPZcoyxECCe8i20nAyfb4r/brGQ+QvDsn3kWhQ193/HLW5Ji7hh1z2uaeEpJPFqlsynZbEAnDenpY4l1UZ0iz4wTyc7WSOK3rxxJ6xhpUqGk+J84iDH8v4DdzxqaUD8kM/FioF6qCaPqSWSTOWw+LaimpbascwA8DDSfqJSUGrHbqZOZStVceAFzrqr0uX//tQoIh6TeDbdiVNtDaLkJPyNpSwNpDAeB7SCNNVyrkoRDaXG3YTQkrWoSo+SH2ddqhSEbsyovnNVI3C0ji6o5bCbJWXN5GKTWbhJSoIGqYl8km7loYULt+rh97BwyplPEbRiabcheTARBJ6W9WcnXSTNoNctosmnbheO2glYYfY0hoDSdi/wQZEApHU11JyCr0rJL/QNtIyxuqr/wFYMn3GEzL8ZwAAAABJRU5ErkJggg=="
            alt="Merlion"
          />
          <Typography
            variant="h5"
            style={{
              whiteSpace: 'nowrap',
              margin: '0',
              color: 'maroon',
              fontWeight: 'bold',
              fontSize: '25px',
            }}
          >
            Merlion Landmarks
          </Typography>
          <Box className="link-container" style={{ marginLeft: 'auto' }}>
            <AppLinks />
          </Box>
        </Box>

        {/* <StyledContainer>
          <StyledGridItem item>
            <h2>Welcome back {user.email}</h2>
            <AppLinks />

            <Button
              variant="outlined"
              onClick={(e) => {
                setIsLoggedIn(false);
                signOut(auth);
                setUser({});
              }}
              sx={{ marginLeft: "20px" }}
            >
              Log out
            </Button>
          </StyledGridItem>
          <StyledGridPills item>
            <Button
              variant="outlined"
              onClick={() => {
                // const message = "Singapore Flyer in 1 sentence";
                setSelectedLandmarks(natureParks);
                <RenderMap
                  sendMessage={sendMessage}
                  landmarks={natureParks}
                  onDirectionsResult={handleDirectionsResult}
                />;
                // sendMessage(message);
              }}
              sx={{ width: "150px", height: "50px" }}
            >
              Nature Parks
            </Button>
          </StyledGridPills>
          <StyledGridPills item>
            <Button
              variant="outlined"
              onClick={() => {
                // const message = "Sentosa Island in 1 sentence";
                setSelectedLandmarks(politicalLandmarks);
                <RenderMap
                  sendMessage={sendMessage}
                  landmarks={politicalLandmarks}
                  onDirectionsResult={handleDirectionsResult}
                />;
                // sendMessage(message);
              }}
              sx={{ width: "150px", height: "50px" }}
            >
              Political Landmarks
            </Button>
          </StyledGridPills>
          <StyledGridPills item>
            <Button
              variant="outlined"
              onClick={() => {
                // const message = "Chinatown Singapore in 1 sentence";
                setSelectedLandmarks(historicalLandmarks);
                <RenderMap
                  sendMessage={sendMessage}
                  landmarks={historicalLandmarks}
                  onDirectionsResult={handleDirectionsResult}
                />;
                // sendMessage(message);
              }}
              sx={{ width: "150px", height: "50px" }}
            >
              Historical Landmarks
            </Button>
          </StyledGridPills>
        </StyledContainer> */}
      </Box>

      {/* <StyledContainer>
        <StyledGridItem item sx={{ margin: '20px' }}></StyledGridItem>
        <StyledGridItem
          item
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            marginTop: '20px',
          }}
        >
          <RenderMap
            sendMessage={sendMessage}
            landmarks={selectedLandmarks}
            onDirectionsResult={handleDirectionsResult}
          />
        </StyledGridItem>
      </StyledContainer> */}
      <StyledContainer>
        <StyledGridItem item sx={{ margin: '20px' }}>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          ></Box>
        </StyledGridItem>
        <StyledGridItem
          item
          style={{
            width: '100%',
            height: '100%',
            position: 'relative', // Make this a positioning context
            marginTop: '0px',
          }}
        >
          <RenderMap
            sendMessage={sendMessage}
            landmarks={selectedLandmarks}
            onDirectionsResult={handleDirectionsResult}
          />
          <StyledGridPills
            item
            style={{ position: 'absolute', top: -40, left: 560 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedLandmarks(natureParks);
                <RenderMap sendMessage={sendMessage} landmarks={natureParks} />;
              }}
              sx={{ width: '150px', height: '50px', zIndex: '100' }}
            >
              Nature Parks
            </Button>
          </StyledGridPills>
          <StyledGridPills
            item
            style={{ position: 'absolute', top: -40, left: 380 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedLandmarks(politicalLandmarks);
                <RenderMap
                  sendMessage={sendMessage}
                  landmarks={politicalLandmarks}
                />;
              }}
              sx={{ width: '150px', height: '50px', zIndex: '100' }}
            >
              Political Landmarks
            </Button>
          </StyledGridPills>
          <StyledGridPills
            item
            style={{ position: 'absolute', top: -40, left: 200 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedLandmarks(historicalLandmarks);
              }}
              sx={{ width: '150px', height: '50px', zIndex: '100' }}
            >
              Historical Landmarks
            </Button>
          </StyledGridPills>
        </StyledGridItem>
      </StyledContainer>
    </Box>
  );
};

export default AppBackground;
