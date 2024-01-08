// Use this file in index.js as the root only as backup!
import React from "react";
import RenderMap from "../src/Services/Maps/RenderMap";
import { useState, useEffect } from "react";
import "./App.css";
import AuthFormTesting from "./Components/AuthFormTesting";
import SignIn from "./Components/AuthFormDiffVersion";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PersistentDrawerLeft from "./Components/Drawer";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Quiz from "./Components/Quizzes";
import { AppLinks } from "./AppMain";

// MUI
import { TextField, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
// import { Typography } from "@mui/material/styles/createTypography";
import MenuItem from "@mui/material/MenuItem";
import TemporaryDrawer from "./Components/TemporaryDrawer";
// import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";
// import { assertExpressionStatement } from "@babel/types";

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

// Commented out because we will remove this feature + it is confusing React from parsing the landmarks props to RenderMap.js
// SelectTextFields MUI
// const landmarks = [
//   {
//     value: "Historical Landmarks",
//     label: "Historical Landmarks",
//   },
//   {
//     value: "Nature Parks",
//     label: "Nature Parks",
//   },
//   {
//     value: "Political Landmarks",
//     label: "Political Landmarks",
//   },
// ];

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

  // Handling the drawer opening
  useEffect(() => {
    if (drawerRef) {
      drawerRef();
    }
  }, [drawerRef]);

  //Authentication Handling
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);

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
      console.log(data.message);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error state here if needed
    }
  };

  const clearAIResponse = () => {
    setAiResponse("");
  };

  console.log(aiResponse);
  console.log(user);

  const handleLogout = () => {
    setIsLoggedIn(false);
    signOut(auth);
    setUser({});
  };

  return (
    <Box className='App'>
      <Box>
        {isLoggedIn ? (
          <Box>
            {/* <PersistentDrawerLeft
              aiResponse={aiResponse}
              clearAIResponse={clearAIResponse}
              // onDrawerOpen: the function to set drawerRef state is passed as argument to onDrawerOpen
              onDrawerOpen={(func) => setDrawerRef(func)}
              sendMessage={sendMessage}
            /> */}

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
        ) : (
          null
        )}

       
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
          <StyledGridItem item sx={{ margin: "20px" }}>
          </StyledGridItem>
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
            />
            {/*<GoogleMap
                mapContainerStyle={mapContainerStyle}
                mapId="6da2495ffc989dca"
                zoom={12}
                center={center}
              >
                <Marker position={center} />
                <Marker
                  position={{ lat: 1.40058, lng: 103.90899 }}
                  onClick={() => {
                    const lat = 1.40058;
                    const lng = 103.90899;
                    console.log("Marker clicked!");
                    console.log(lat);
                    console.log(lng);
                    const message = `What is the name of this location with the following address: 100 Punggol Central, Singapore 828839. Share with me its history, and what developments occured in the last 20 years in Singapore. Word limit is 30 words.`;
                    sendMessage(message);
                  }}
                />
              </GoogleMap>*/}
          </StyledGridItem>
        </StyledContainer>
      
      {/* 
      <Box style={{ display: isLoggedIn ? "none" : "block" }}>
        {!isLoggedIn && <AuthFormTesting />}
      </Box> */}

      {/* {!isLoggedIn && (
        <Box className='overlay'>
          <SignIn />
        </Box>
      )} */}
    </Box>
  );
};

export default AppBackground;