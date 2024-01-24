import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttractionsIcon from '@mui/icons-material/Attractions';
import SailingIcon from '@mui/icons-material/Sailing';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { IconButton } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { treadmill } from 'ldrs';
import { dotWave } from 'ldrs';

dotWave.register();

treadmill.register();

const linksData = ['', 'quizzes', 'quizzesAI', 'onboarding', 'guide'];

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
  const [userMessage, setUserMessage] = React.useState('');
  const [landmarksChange, setLandmarksChange] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    // toggleDrawer is a higher order function that accepts the left and true/false arguments and returns an event object (e.g., can be a keydown or tab/shift)
    setLandmarksChange(null);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
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
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 800 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <List className="drawer-links">
          <IconButton
            onClick={toggleDrawer(anchor, false)}
            sx={{ marginLeft: '300px' }}
          >
            <CloseIcon />
          </IconButton>

          {linksData.map((text, index) => (
            <ListItemButton key={text}>
              <ListItemIcon>
                <Link to={`/${text}`}>
                  {text === '' ? (
                    <IconButton onClick={toggleDrawer(anchor, false)}>
                      <HomeIcon sx={{ margin: '10px' }} />
                      Home
                    </IconButton>
                  ) : text === 'quizzesAI' ? (
                    <IconButton>
                      <QuizIcon sx={{ margin: '10px' }} /> Quiz
                    </IconButton>
                  ) : text === 'guide' ? (
                    <IconButton>
                      <MenuBookIcon sx={{ margin: '10px' }} /> Guide
                    </IconButton>
                  ) : null}
                </Link>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItemIcon>
            <IconButton
              onClick={() => {
                setSelectedLandmarks(historicalLandmarks);
                setLandmarksChange(true);
                console.log(landmarksChange);
              }}
            >
              <AttractionsIcon sx={{ margin: '20px' }} />
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
              <SailingIcon sx={{ margin: '20px' }} />
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
              <TakeoutDiningIcon sx={{ margin: '20px' }} />
              Political Landmarks
            </IconButton>
          </ListItemIcon>
        </List>
      </List>
      <Divider sx={{ marginBottom: '20px' }} />
      <Box sx={{ marginLeft: '10px' }}>
        <TextField
          type="text"
          value={userMessage}
          sx={{ width: '230px' }}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Talk to our GPT 3.5 AI here!"
        />
        <Button
          variant="contained"
          color="error"
          // onClick={sendMessage}
          onClick={() => {
            sendMessage(userMessage);
          }}
          sx={{ mt: '10px', mb: '10px', marginLeft: '20px' }}
        >
          Send Message
        </Button>
      </Box>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
      <Box sx={{ marginLeft: '10px' }}>
        <Box className="ai-response">
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Roboto',
              color: 'maroon',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            GPT Response:
          </Typography>
          {loading ? ( // Default values shown
            // Default values shown
            <l-dot-wave
              sx={{ marginLeft: '20px' }}
              size="47"
              speed="1"
              color="maroon"
            ></l-dot-wave>
          ) : (
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto', color: 'primary' }}
            >
              {aiResponse.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          )}
        </Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={clearAIResponse}
            sx={{ mt: '20px', mb: '20px' }}
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
          sx={{ marginLeft: '10px' }}
          starticon={<ExitToApp />}
        >
          <ExitToApp style={{ fontSize: '2.25rem' }} />
        </IconButton>
      </Box>
    </Box>
  );

  console.log(loading);

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer('left', true)}>
          <MenuIcon style={{ color: 'maroon' }} />
        </Button>
        <Drawer
          color="error"
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
