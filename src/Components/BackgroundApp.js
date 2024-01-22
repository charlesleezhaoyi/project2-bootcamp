// Use this file in index.js as the root only as backup!
import React from "react";
import RenderMap from "../Services/Maps/RenderMap";
import { useState, useEffect } from "react";
// import "./App.css";
import "../App.css";
import AuthFormTesting from "./AuthFormTesting";
import SignIn from "./SignIn";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { AppLinks } from "../AppMain";

// MUI
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

import TemporaryDrawer from "./TemporaryDrawer";

// Styling MUI function
const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
});

const StyledGridItem = styled(Grid)({
  width: "30%",
});

const StyledGridPills = styled("div")({
  width: "150px", // Define the width of your container
  height: "100px", // Define the height of your container
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  marginRight: "20px",
  marginLeft: "20px",
});

const linkStyle = {
  marginRight: "50px",
  marginLeft: "50px",
  marginTop: "10px",
  marginBottom: "10px",
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
  fontSize: "30px",
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
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
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
      const messageToSend = userMessage === "" ? targetMessage : userMessage;

      const response = await fetch("http://localhost:3002/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      setAiResponse(data.message);
      setUserMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error state here if needed
    }
  };

  const clearAIResponse = () => {
    setAiResponse("");
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
        {isLoggedIn ? (
          <Box>
            <TemporaryDrawer
              aiResponse={aiResponse}
              clearAIResponse={clearAIResponse}
              onDrawerOpen={(func) => setDrawerRef(func)}
              sendMessage={sendMessage}
              handleAuthStateChanged={handleAuthStateChanged}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
          </Box>
        ) : null}

        <StyledContainer>
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
        </StyledContainer>
      </Box>

      <StyledContainer>
        <StyledGridItem item sx={{ margin: "20px" }}></StyledGridItem>
        <StyledGridItem
          item
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            marginTop: "20px",
          }}
        >
          <RenderMap
            sendMessage={sendMessage}
            landmarks={selectedLandmarks}
            onDirectionsResult={handleDirectionsResult}
          />
        </StyledGridItem>
      </StyledContainer>
    </Box>
  );
};

export default AppBackground;
