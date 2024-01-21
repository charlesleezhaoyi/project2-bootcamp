// Use this file in index.js as the root only as backup!
import React from "react";
import RenderMap from "../src/Services/Maps/RenderMap";
import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AppBackground from "./Components/BackgroundApp";
import SignIn from "./Components/SignIn";

import { AppLinks } from "./AppMain";

// MUI
import {
  TextField,
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
// import { Typography } from "@mui/material/styles/createTypography";
import MenuItem from "@mui/material/MenuItem";
import TemporaryDrawer from "./Components/TemporaryDrawer";
import FetchingDataAnimation from "./Components/FetchingDataAnimation";
import { useNavigate } from "react-router-dom";
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
  marginBottom: "0px",
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

//Landmark coordinates
const historicalLandmarks = {
  RafflesHotel: { lat: 1.2949, lng: 103.8543 },
  OldHillStreetPoliceStation: { lat: 1.2908, lng: 103.8485 },
  FormerFordFactory: { lat: 1.3396, lng: 103.7742 },
  ChangiChapelAndMuseum: { lat: 1.3404, lng: 103.9822 },
  KranjiWarMemorial: { lat: 1.4197, lng: 103.7618 },
  ReflectionsAtBukitChandu: { lat: 1.28, lng: 103.802 },
  FortCanningHill: { lat: 1.2929, lng: 103.8469 },
  CivilianWarMemorial: { lat: 1.2934, lng: 103.8524 },
  OldParliamentHouse: { lat: 1.2899, lng: 103.8507 },
  TheFullertonBuilding: { lat: 1.2856, lng: 103.8535 },
  VictoriaTheatreAndConcertHall: { lat: 1.2888, lng: 103.8514 },
  CityHallAndOldSupremeCourtBuilding: { lat: 1.293, lng: 103.8537 },
  BattleboxAtFortCanning: { lat: 1.2942, lng: 103.8463 },
  AlkaffMansion: { lat: 1.2806, lng: 103.7982 },
  TiongBahruAirRaidShelter: { lat: 1.2867, lng: 103.8334 },
  LimBoSengMemorial: { lat: 1.2897, lng: 103.8525 },
  LabradorBattery: { lat: 1.2667, lng: 103.8025 },
  SingaporeConferenceHall: { lat: 1.2909, lng: 103.8527 },
  NationalMuseumOfSingapore: { lat: 1.2966, lng: 103.8485 },
  SungeiBulohWetlandReserve: { lat: 1.4467, lng: 103.7303 },
};

const natureParks = {
  BukitTimahNatureReserve: { lat: 1.3543, lng: 103.7764 },
  SingaporeBotanicGardens: { lat: 1.3138, lng: 103.8159 },
  PulauUbin: { lat: 1.4043, lng: 103.9578 },
  SungeiBulohWetlandReserve: { lat: 1.4467, lng: 103.7303 },
  MacRitchieReservoirPark: { lat: 1.3425, lng: 103.8346 },
  EastCoastPark: { lat: 1.3006, lng: 103.9125 },
  LabradorNatureReserve: { lat: 1.2667, lng: 103.8025 },
  FortCanningPark: { lat: 1.2942, lng: 103.8463 },
  GardensByTheBay: { lat: 1.2816, lng: 103.8636 },
  MountFaberPark: { lat: 1.2733, lng: 103.8185 },
  PasirRisPark: { lat: 1.3721, lng: 103.9495 },
  ChekJawaWetlands: { lat: 1.4099, lng: 103.9774 },
  ConeyIslandPark: { lat: 1.4098, lng: 103.9226 },
  SouthernRidges: { lat: 1.2806, lng: 103.8057 },
  JurongLakeGardens: { lat: 1.3358, lng: 103.7263 },
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
  ThePadang: { lat: 1.2867, lng: 103.8514 },
  FortCanningHill: { lat: 1.2929, lng: 103.8469 },
  TheFullertonBuilding: { lat: 1.2856, lng: 103.8535 },
  SingaporeConferenceHall: { lat: 1.2909, lng: 103.8527 },
  RafflesPlace: { lat: 1.283, lng: 103.851 },
};

function breakLines(response) {
  // Split the response into an array of strings
  const lines = response.split("TAG");
  // Join the array back into a string, with each element on a new line
  const formattedResponse = lines.join("\n");

  return formattedResponse;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isOnboarded, setIsOnboarded] = useState(false);

  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [selectedLandmarks, setSelectedLandmarks] =
    useState(historicalLandmarks);
  const [directionSteps, setDirectionSteps] = useState({
    id: null,
    instruction: null,
    distance: null,
    duration: null,
  });

  const [user, setUser] = useState({});
  const [drawerRef, setDrawerRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        return setUser(user);
      }
      // setIsLoggedIn(false);
      // return () => {
      //   console.log('Routing to different page');
      //   navigate('/sign-in');
      // };
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

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(auth);
      console.log("User signed out");
      setUser({});
      setIsLoggedIn(false);
      console.log("Navigation complete");
    } catch (err) {
      console.error("Error signing out", err);
    }
  };

  //Function to call OpenAI API
  const sendMessage = async (targetMessage) => {
    setLoading(true);

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
      const formattedResponse = await breakLines(data.message);
      console.log(formattedResponse);
      setAiResponse(formattedResponse);
      setUserMessage("");

      // console.log(data.message);

      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error sending message:", error);
      // Handle error state here if needed
    }
  };

  const clearAIResponse = () => {
    setAiResponse("");
  };

  const handleDirectionsResult = (steps) => {
    // Slice the array from index 0 to 5
    const slicedSteps = steps.slice(0, 5);
    // Map the sliced array into discrete steps
    const discreteSteps = slicedSteps.map((step, index) => ({
      id: index,
      instruction: step.instructions,
      distance: step.distance.text,
      duration: step.duration.text,
    }));

    for (let i = 0; i < discreteSteps.length; i++) {
      console.log(discreteSteps[i].instruction);
    }
    setDirectionSteps(discreteSteps);
  };

  return (
    <Box className="app-container">
      {/* <Box> */}
      <Box>
        {isLoggedIn ? (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
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
              loading={loading}
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
            <Typography
              variant="h5"
              style={{ whiteSpace: "nowrap", margin: "0" }}
            >
              Merlion Landmarks
            </Typography>
            <Box className="link-container">
              <AppLinks />
            </Box>
          </Box>
        ) : (
          <AppBackground />
        )}

        {isLoggedIn && (
          <StyledContainer>
            <StyledGridItem item>
              {/* <h2>Welcome back {user.email}</h2> */}
              {/* <AppLinks /> */}

              {/* <Button
                variant="outlined"
                onClick={(e) => {
                  setIsLoggedIn(false);
                  signOut(auth);
                  setUser({});
                }}
                sx={{ marginLeft: "20px" }}
              >
                Log out
              </Button> */}
            </StyledGridItem>
            <StyledGridItem item sx={{ margin: "20px" }}>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              ></Box>
            </StyledGridItem>
            <StyledGridItem
              item
              style={{
                width: "100%",
                height: "100%",
                position: "relative", // Make this a positioning context
                marginTop: "0px",
              }}
            >
              <RenderMap
                sendMessage={sendMessage}
                landmarks={selectedLandmarks}
                onDirectionsResult={handleDirectionsResult}
              />
              <StyledGridPills
                item
                style={{ position: "absolute", top: -40, left: 560 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedLandmarks(natureParks);
                    <RenderMap
                      sendMessage={sendMessage}
                      landmarks={natureParks}
                    />;
                  }}
                  sx={{ width: "150px", height: "50px", zIndex: "100" }}
                >
                  Nature Parks
                </Button>
              </StyledGridPills>
              <StyledGridPills
                item
                style={{ position: "absolute", top: -40, left: 380 }}
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
                  sx={{ width: "150px", height: "50px", zIndex: "100" }}
                >
                  Political Landmarks
                </Button>
              </StyledGridPills>
              <StyledGridPills
                item
                style={{ position: "absolute", top: -40, left: 200 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedLandmarks(historicalLandmarks);
                  }}
                  sx={{ width: "150px", height: "50px", zIndex: "100" }}
                >
                  Historical Landmarks
                </Button>
              </StyledGridPills>
            </StyledGridItem>
          </StyledContainer>
        )}
      </Box>

      {!isLoggedIn && (
        <Box className="overlay">
          <SignIn />
        </Box>
      )}
      {/* </Box> */}
    </Box>
  );
};

export default App;
