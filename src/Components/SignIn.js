import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [signInPreFillEmail, setSignInPreFillEmail] = useState();
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  // const [signInPreFillPassword, setSignInPreFillPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState(false);

  const signUp = async () => {
    if (password === secondPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential.user.uid);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          uid: userCredential.user.uid,
          name: fullName,
        });
        console.log("Document written with ID: ", userCredential.user.uid);
        console.log(userCredential.user);
        setEmail("");
        setPassword("");
        setNewUser(false);
        console.log("setDoc");
        // navigate("/");
        // navigate("/sign-up");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email is already in use.");
        } else if (error.code === "auth/weak-password") {
          setErrorMessage("Password is too weak.");
        } else {
          setErrorMessage("Error signing up.");
        }
        console.error("Error signing up", error);
      }
    } else {
      setPasswordMatch(false);
      setErrorMessage("Your passwords do not match");
      console.log("Incorrect password");
    }
  };

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setEmail(email);
        setPassword(password);
        setNewUser(true);
        // navigate("/sign-up", {
        //   state: {
        //     email: email,
        //     password: password,
        //   },
        // });
      }
    }
  };

  const forgotPassword = async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            width: 500,
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            {!newUser ? (
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            )}
            <Box>
              {newUser && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="user name"
                  label="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  id="username"
                  placeholder="Full Name"
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {newUser && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={secondPassword}
                  onChange={(e) => setSecondPassword(e.target.value)}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              )}
              {!passwordMatch && <p style={{ color: "red" }}>{errorMessage}</p>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <FormControlLabel
                control={
                  <Button
                    value="forgot"
                    color="secondary"
                    onClick={forgotPassword}
                  />
                }
                label="Forgot Password"
              ></FormControlLabel>
              {!newUser ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={signIn}
                >
                  Sign In
                </Button>
              ) : (
                <> </>
              )}
              {newUser && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 1 }}
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              )}
              <Grid container></Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
