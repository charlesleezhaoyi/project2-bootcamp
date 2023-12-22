import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./App.css";
import AuthFormTesting from "./Components/AuthFormTesting";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// MUI
import { TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 1.35313, // default latitude
  lng: 103.81404, // default longitude
};

// Styling MUI function
const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
});

const StyledGridItem = styled(Grid)({
  width: "30%",
});

const App = () => {
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
    });
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

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

  console.log(aiResponse);

  return (
    <Box>
      <Box>
        {isLoggedIn && (
          <StyledContainer>
            <StyledGridItem item>
              <h2>Welcome back {user.email}</h2>
              <Button
                variant="outlined"
                onClick={(e) => {
                  setIsLoggedIn(false);
                  signOut(auth);
                  setUser({});
                }}
              >
                Log out
              </Button>
            </StyledGridItem>
            <StyledGridItem item>
              <Button
                variant="outlined"
                onClick={() => {
                  const message = "Singapore Flyer in 1 sentence";
                  sendMessage(message);
                }}
              >
                Singapore Flyer
              </Button>
            </StyledGridItem>
          </StyledContainer>
        )}
      </Box>

      {/* <Grid item className="LMFAO"> */}
      {isLoggedIn && (
        <StyledContainer>
          <StyledGridItem item>
            <TextField
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button variant="contained" onClick={sendMessage}>
              Send Message
            </Button>

            <Box marginTop={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  const message = "Singapore Flyer in 1 sentence";
                  sendMessage(message);
                }}
              >
                Singapore Flyer
              </Button>
            </Box>
            <Box marginTop={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  const message = "Singapore Esplanade in 1 sentence";
                  sendMessage(message);
                }}
              >
                Esplanade
              </Button>
            </Box>

            <Box className="ai-response">
              <p>AI Response:</p>
              <p>{aiResponse}</p>
            </Box>
          </StyledGridItem>
          <StyledGridItem item>
            <GoogleMap
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
            </GoogleMap>
          </StyledGridItem>
        </StyledContainer>
      )}
      {/* </Grid> */}

      <Box style={{ display: isLoggedIn ? "none" : "block" }}>
        {!isLoggedIn && <AuthFormTesting />}
      </Box>
    </Box>
  );
};

export default App;
