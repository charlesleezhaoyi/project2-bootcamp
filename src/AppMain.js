import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./App.css";
import AuthFormTesting from "./Components/AuthFormTesting";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Quiz from "./Components/Quizzes";
import App from "./AppTest";

import { Typography, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";

const libraries = ["places"];

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

const AppMain = () => {
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

  return (
    <Router>
      {isLoggedIn && ( // Conditionally render the navigation if user is logged in
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Comic Sans MS",
              color: "primary.main",
              marginRight: "auto", // Pushes the header to the left
            }}
          >
            Merlion Landmarks
          </Typography>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              marginRight: "500px",
            }}
          >
            <Link to="/" style={linkStyle}>
              Map
            </Link>
            <Link to="/quizzes" style={linkStyle}>
              Quizzes
            </Link>
            <IconButton
              variant="outlined"
              onClick={(e) => {
                setIsLoggedIn(false);
                signOut(auth);
                setUser({});
              }}
              starticon={<ExitToAppIcon />}
              sx={{ marginLeft: "20px" }}
            >
              <ExitToAppIcon style={{ fontSize: "2.25rem" }} />
            </IconButton>
          </div>
        </div>
      )}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/quizzes" element={<Quiz />} />
            <Route path="/" element={<App />} />
          </>
        ) : (
          <>
            <Route path="/quizzes" element={<AuthFormTesting />} />
            <Route path="/" element={<AuthFormTesting />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppMain;