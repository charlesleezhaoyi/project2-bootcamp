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
  const [drawerDefaultText, setDrawerDefaultText] = React.useState(
    'Uncover the world with our interactive maps feature! Navigate through nature parks, historical landmarks, and political landmarks. Each landmark is marked with informative pills. Click on them to unveil AI-generated responses.',
  );

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
      setDrawerDefaultText('Did you know?');
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
      <Divider />
      <Divider />
      <Box sx={{ marginLeft: '10px' }}>
        <Box className="ai-response">
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Roboto', color: 'primary', mt: '40px' }}
          >
            {drawerDefaultText}
          </Typography>
          <Typography
            variant="h"
            sx={{ fontFamily: 'Roboto', color: 'primary' }}
          >
            {aiResponse.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <p></p>
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              handleLogout();
              signOut(auth);
            }}
            sx={{ mt: '20px', mb: '20px' }}
          >
            Logout
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
