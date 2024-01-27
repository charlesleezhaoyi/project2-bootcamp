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
import { Select, FormControl, MenuItem } from '@mui/base';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

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
import { Timeline, TimelineOldHill } from './Timelines/TimelineHistorical';

import AppBackground from './BackgroundApp';

dotWave.register();

treadmill.register();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const historicalLandmarksTimeline = [
  'Raffles Hotel',
  'Old Hill Street Police Station',
  'Former Ford Factory',
  'Changi Chapel And Museum',
  'Kranji War Memorial',
  'Reflections At Bukit Chandu',
  'Fort Canning Hill',
  'Civilian War Memorial',
  'Old Parliament House',
  'The Fullerton Building',
  'Victoria Theatre And Concert Hall',
  'City Hall And Old Supreme Court Building',
  'Battlebox At Fort Canning',
  'Alkaff Mansion',
  'Tiong Bahru Air Raid Shelter',
  'Lim Bo Seng Memorial',
  'Labrador Battery',
  'Singapore Conference Hall',
  'National Museum Of Singapore',
];

const nameToFunctionMap = {
  'Raffles Hotel': () => {
    console.log('Raffles hotel was called');

    return <Timeline />;
  },
};

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
    'Uncover the world with our interactive maps feature!  Each landmark category is marked with informative pills. Click on them to unveil AI-generated responses.',
  );
  const [timelineClicked, setTimelineClicked] = React.useState(false);

  // const theme = useTheme();
  const [landmarkName, setLandmarkName] = React.useState('');

  const handleChange = (event) => {
    const selectedOptionValue = event.target.value;

    if (selectedOptionValue === '10') {
      console.log('Clicked Ten!');
    }

    setLandmarkName(selectedOptionValue);
  };

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
      <List>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Roboto',
              color: 'maroon',
              margin: '20px',
              fontWeight: 'bold',
            }}
          >
            {drawerDefaultText}
          </Typography>
        </Box>
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
      <Box sx={{ marginLeft: '20px' }}>
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
      <Box sx={{ minWidth: 120, margin: '10px', marginLeft: '20px' }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Historical Landmark
          </InputLabel>
          <NativeSelect
            value={landmarkName}
            onChange={handleChange}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value={''}> Select landmark!</option>
            <option value={'Raffles Hotel'}>Raffles Hotel</option>
            <option value={'Old Hill Street Police Station'}>
              Old Hill Street Police Station
            </option>
          </NativeSelect>
        </FormControl>
      </Box>
      <Divider />
      <Box sx={{ marginLeft: '10px' }}>
        <Box sx={{ margin: '10px' }}>
          {landmarkName !== '' ? (
            <Button
              variant="outlined"
              sx={{ color: 'maroon' }}
              onClick={() => {
                setTimelineClicked(true);
              }}
            >
              Click here for a timeline of the history!
            </Button>
          ) : null}
        </Box>
        <Box className="ai-response" sx={{ marginLeft: '10px' }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Roboto',
              color: 'maroon',
              mt: '40px',
              fontWeight: 'bold',
            }}
          >
            AI Response:
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
        <Box>{landmarkName === '10' ? <Timeline /> : null}</Box>
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

  console.log(landmarkName);

  return (
    <div>
      <React.Fragment>
        {!timelineClicked ? (
          <Box>
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
          </Box>
        ) : (
          <AppBackground />
        )}

        {landmarkName === 'Raffles Hotel' && timelineClicked && (
          <Box className="overlay">
            <Timeline
              timelineClicked={timelineClicked}
              setTimelineClicked={setTimelineClicked}
            />
          </Box>
        )}
        {landmarkName === 'Old Hill Street Police Station' &&
          timelineClicked && (
            <Box className="overlay">
              <TimelineOldHill
                timelineClicked={timelineClicked}
                setTimelineClicked={setTimelineClicked}
              />
            </Box>
          )}
      </React.Fragment>
    </div>
  );
}
