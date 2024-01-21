import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttractionsIcon from "@mui/icons-material/Attractions";
import SailingIcon from "@mui/icons-material/Sailing";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import { IconButton } from "@mui/material";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const linksData = ["", "quizzes", "quizzesAI", "onboarding", "guide"];

export default function TemporaryDrawer({
  logoutButton,
  aiResponse,
  clearAIResponse,
  onDrawerOpen,
  sendMessage,
  handleAuthStateChanged,
  handleLogout,
  isLoggedIn,
  loading,
  historicalLandmarks,
  natureParks,
  politicalLandmarks,
  setSelectedLandmarks,
  renderMapComponent,
}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [userMessage, setUserMessage] = React.useState("");
  const [landmarksChange, setLandmarksChange] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    // toggleDrawer is a higher order function that accepts the left and true/false arguments and returns an event object (e.g., can be a keydown or tab/shift)
    setLandmarksChange(null);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    if (aiResponse) {
      // set the state of left to be true so that the drawer can be opened
      setState({ ...state, left: true });
    }
  }, [aiResponse]);

  React.useEffect(() => {
    if (landmarksChange === true) {
      setState({ ...state, left: false });
    }

    if (landmarksChange === false) {
      // set the state of left to be true so that the drawer can be opened
      setState({ ...state, left: true });
    }
  }, [landmarksChange]);

  React.useEffect(() => {
    handleAuthStateChanged();
  }, [handleAuthStateChanged]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 800 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <List className="drawer-links">
          <IconButton
            onClick={toggleDrawer(anchor, false)}
            sx={{ marginLeft: "300px" }}
          >
            <CloseIcon />
          </IconButton>

          {linksData.map((text, index) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                <Link to={`/${text}`}>
                  {text === "" ? (
                    <IconButton onClick={toggleDrawer(anchor, false)}>
                      <HomeIcon sx={{ margin: "10px" }} />
                      Home
                    </IconButton>
                  ) : text === "quizzesAI" ? (
                    <IconButton>
                      <QuizIcon sx={{ margin: "10px" }} /> Quiz
                    </IconButton>
                  ) : text === "guide" ? (
                    <IconButton>
                      <MenuBookIcon sx={{ margin: "10px" }} /> Guide
                    </IconButton>
                  ) : null}
                </Link>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        <List>
          <ListItemIcon>
            <IconButton
              onClick={() => {
                setSelectedLandmarks(historicalLandmarks);
                setLandmarksChange(true);
                console.log(landmarksChange);
              }}
            >
              <AttractionsIcon sx={{ margin: "20px" }} />
              Historical Landmarks
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton
              onClick={() => {
                setSelectedLandmarks(natureParks);
                setLandmarksChange(true);
                console.log(landmarksChange);
              }}
            >
              <SailingIcon sx={{ margin: "20px" }} />
              Nature Parks
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton
              onClick={() => {
                setSelectedLandmarks(politicalLandmarks);
                setLandmarksChange(true);
                console.log(landmarksChange);
              }}
            >
              <TakeoutDiningIcon sx={{ margin: "20px" }} />
              Political Landmarks
            </IconButton>
          </ListItemIcon>
        </List>
        {/* <List>
          {['Singapore Flyer', 'Sentosa Island', 'Chinatown Singapore'].map(
            (text, index) => (
              <ListItemButton key={text}>
                <ListItemIcon>
                  {text === 'Singapore Flyer' ? (
                    <IconButton
                      variant="contained"
                      onClick={() => {
                        const message =
                          "Singapore Flyer's history in 1 sentence";
                        sendMessage(message);
                      }}
                      sx={{ width: '50%', marginBottom: '20px' }}
                    >
                      <AttractionsIcon />
                    </IconButton>
                  ) : text === 'Sentosa Island' ? (
                    <IconButton
                      variant="contained"
                      onClick={() => {
                        const message =
                          "Sentosa Island's history in 1 sentence";
                        sendMessage(message);
                      }}
                      sx={{ width: '50%', marginBottom: '20px' }}
                    >
                      <SailingIcon />
                    </IconButton>
                  ) : text === 'Chinatown Singapore' ? (
                    <IconButton
                      variant="contained"
                      onClick={() => {
                        const message =
                          "Chinatown Singapore's history in 1 sentence";
                        sendMessage(message);
                      }}
                      sx={{ width: '50%', marginBottom: '20px' }}
                    >
                      <TakeoutDiningIcon />
                    </IconButton>
                  ) : null}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  onClick={() => {
                    const message = `${text}'s history in 1 sentence`;
                    sendMessage(message);
                  }}
                />
              </ListItemButton>
            ),
          )}
        </List> */}
      </List>
      <Divider />
      <Box sx={{ marginLeft: "10px" }}>
        <TextField
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="error"
          // onClick={sendMessage}
          onClick={() => {
            sendMessage(userMessage);
          }}
          sx={{ mt: "20px", mb: "20px" }}
        >
          Send Message
        </Button>
      </Box>
      <Divider />
      <Box sx={{ marginLeft: "10px" }}>
        <Box className="ai-response">
          <Typography
            variant="h4"
            sx={{ fontFamily: "Roboto", color: "primary" }}
          >
            AI Response:
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Roboto", color: "primary" }}
          >
            {aiResponse.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={clearAIResponse}
            sx={{ mt: "20px", mb: "20px" }}
          >
            Clear
          </Button>
        </Box>
        <IconButton
          variant="outlined"
          onClick={(e) => {
            handleLogout();
            signOut(auth);
          }}
          sx={{ marginLeft: "10px" }}
          starticon={<ExitToApp />}
        >
          <ExitToApp style={{ fontSize: "2.25rem" }} />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon style={{ color: "maroon" }} />
        </Button>
        <Drawer
          color="error"
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
